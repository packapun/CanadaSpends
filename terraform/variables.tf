variable "aws_region" {
  description = "AWS region for resources"
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t3.medium"
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
}

variable "root_volume_size" {
  description = "Size of root volume in GB"
  default     = 20
}

variable "data_volume_size" {
  description = "Size of data volume in GB"
  default     = 50
}

variable "ssh_allowed_ips" {
  description = "List of IP addresses allowed to SSH to the instance"
  type        = list(string)
  default     = ["0.0.0.0/0"]  # Change this to your IP for better security
}

variable "api_allowed_ips" {
  description = "List of IP addresses allowed to access the API directly"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "slackbot_allowed_ips" {
  description = "List of IP addresses allowed to access the Slackbot directly"
  type        = list(string)
  default     = ["0.0.0.0/0"]
} 