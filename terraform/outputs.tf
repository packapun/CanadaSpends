output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.canadaspends_server.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_eip.canadaspends_eip.public_ip
}

output "instance_public_dns" {
  description = "Public DNS of the EC2 instance"
  value       = aws_instance.canadaspends_server.public_dns
}

output "ssh_connection" {
  description = "SSH connection string"
  value       = "ssh -i <path_to_key_file> ec2-user@${aws_eip.canadaspends_eip.public_ip}"
} 