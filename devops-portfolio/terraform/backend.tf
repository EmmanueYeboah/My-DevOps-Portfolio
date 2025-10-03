terraform {
  backend "s3" {
    bucket = "devops-portfolio-terraform-state"
    key    = "terraform.tfstate"
    region = "us-east-2"
  }
}