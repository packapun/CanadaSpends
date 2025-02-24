# CanadaSpends Infrastructure Setup

This directory contains the Terraform configuration needed to set up the EC2 server infrastructure for CanadaSpends.

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/downloads) installed
- AWS CLI configured with appropriate credentials
- An SSH key pair for EC2 access

## Infrastructure Overview

The setup includes:
- EC2 instance for hosting the application
- Custom VPC and security groups
- Persistent EBS volume for data storage
- Elastic IP for stable addressing

## Getting Started

1. Update the variables in `terraform.tfvars`:

```hcl
aws_region       = "us-east-1"
key_name         = "your-keypair-name"
ssh_allowed_ips  = ["your.ip.address/32"]
```

2. Initialize the Terraform configuration:

```bash
terraform init
```

3. Plan the deployment:

```bash
terraform plan -out=tfplan
```

4. Apply the configuration:

```bash
terraform apply tfplan
```

5. After deployment, Terraform will output:
   - The instance's public IP address
   - An SSH connection string

## CI/CD Workflow Setup

For the GitHub Actions workflow to function properly, you need to set up the following secrets in your GitHub repository:

- `DEVELOPMENT_SERVER`: Public IP or DNS of the server
- `SSH_PRIVATE_KEY`: The private SSH key for connecting to the server
- `SSH_KNOWN_HOSTS`: SSH known hosts for the server
- `OPENAI_API_KEY`: Your OpenAI API key
- `COHERE_API_KEY`: Your Cohere API key
- `SLACK_BOT_TOKEN`: Your Slack Bot token (if using Slack integration)
- `SLACK_SIGNING_SECRET`: Your Slack signing secret (if using Slack integration)
- `SLACK_WEBHOOK`: A Slack webhook URL for deployment notifications (optional)

## Deployment Process

The CI/CD workflow is configured to deploy from the main branch. Whenever changes are pushed to the main branch, the workflow will automatically deploy the latest code to the server.

You can also manually trigger a deployment using the GitHub Actions workflow dispatch.

## Persistent Data Storage

To avoid re-indexing the vector store unnecessarily, the setup includes:
- Persistent EBS volume for Docker data
- Logic in the deployment script to detect changes in the data directory
- Modified docker-compose configuration to use persistent volumes
- Environment variable support to skip re-indexing when data hasn't changed

## SSL/TLS Setup

For HTTPS support:
1. Obtain SSL certificates for your domain
2. Place them in `/opt/canadaspends/query-engine/nginx/ssl/` as:
   - `fullchain.pem` - Full certificate chain
   - `privkey.pem` - Private key

## Troubleshooting

- **Connection issues**: Ensure security groups allow traffic on the required ports
- **Deployment failures**: Check GitHub Actions logs and EC2 instance logs
- **Data persistence issues**: Verify volume mounts and permissions 