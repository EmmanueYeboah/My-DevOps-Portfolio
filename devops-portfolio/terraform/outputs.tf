output "s3_data_bucket_name" {
  description = "Name of the S3 bucket for data storage"
  value       = aws_s3_bucket.data_bucket.bucket
}

output "s3_frontend_bucket_name" {
  description = "Name of the S3 bucket for frontend hosting"
  value       = aws_s3_bucket.frontend_bucket.bucket
}

output "frontend_website_url" {
  description = "URL of the frontend website"
  value       = "http://${aws_s3_bucket_website_configuration.frontend_website.website_endpoint}"
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = aws_ecr_repository.backend.repository_url
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.main.name
}

output "github_actions_role_arn" {
  description = "ARN of the GitHub Actions IAM role"
  value       = aws_iam_role.github_actions.arn
}