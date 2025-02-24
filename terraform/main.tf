provider "aws" {
  region = var.aws_region
}

# Get the latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Create a VPC
resource "aws_vpc" "canadaspends_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "canadaspends-vpc"
  }
}

# Create a public subnet
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.canadaspends_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}a"

  tags = {
    Name = "canadaspends-public-subnet"
  }
}

# Create an internet gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.canadaspends_vpc.id

  tags = {
    Name = "canadaspends-igw"
  }
}

# Create a route table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.canadaspends_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "canadaspends-public-rt"
  }
}

# Associate the route table with the subnet
resource "aws_route_table_association" "public_rta" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# Create an EC2 instance
resource "aws_instance" "canadaspends_server" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.canadaspends_sg.id]
  subnet_id              = aws_subnet.public_subnet.id
  
  root_block_device {
    volume_size = var.root_volume_size
    volume_type = "gp3"
  }

  # Add an EBS volume for Docker data (including Weaviate storage)
  ebs_block_device {
    device_name = "/dev/sdf"
    volume_size = var.data_volume_size
    volume_type = "gp3"
    delete_on_termination = false
  }

  user_data = <<-EOF
    #!/bin/bash
    # Update system packages
    yum update -y
    
    # Install Docker
    amazon-linux-extras install docker -y
    service docker start
    usermod -a -G docker ec2-user
    systemctl enable docker
    
    # Install Docker Compose
    curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    # Setup the EBS volume for Docker data
    mkfs -t xfs /dev/xvdf
    mkdir -p /data
    echo "/dev/xvdf /data xfs defaults 0 0" >> /etc/fstab
    mount -a
    mkdir -p /data/docker
    ln -s /data/docker /var/lib/docker
    
    # Create app directory
    mkdir -p /opt/canadaspends
    chown -R ec2-user:ec2-user /opt/canadaspends
  EOF

  tags = {
    Name = "canadaspends-development"
  }
}

# Create an Elastic IP
resource "aws_eip" "canadaspends_eip" {
  domain   = "vpc"
  instance = aws_instance.canadaspends_server.id

  tags = {
    Name = "canadaspends-eip-development"
  }
} 