variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "devops-portfolio"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

variable "github_repo" {
  description = "GitHub repository in format: owner/repo-name"
  type        = string
  # Example: "your-username/My-DevOps-Portfolio"
}