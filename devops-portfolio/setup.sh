#!/bin/bash

echo "🚀 Setting up DevOps Portfolio Project"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    exit 1
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform not found. Please install it first."
    exit 1
fi

# Create S3 bucket for Terraform state
echo "📦 Creating S3 bucket for Terraform state..."
aws s3 mb s3://devops-portfolio-terraform-state --region us-east-2 2>/dev/null || echo "Bucket already exists"

# Enable versioning on the state bucket
aws s3api put-bucket-versioning \
    --bucket devops-portfolio-terraform-state \
    --versioning-configuration Status=Enabled

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up GitHub repository secrets:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo ""
echo "2. Push to GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git remote add origin YOUR_REPO_URL"
echo "   git push -u origin main"