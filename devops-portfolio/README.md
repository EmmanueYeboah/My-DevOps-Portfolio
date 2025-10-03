# DevOps Portfolio Project

A full-stack web application demonstrating modern DevOps practices with containerization, infrastructure as code, and comprehensive monitoring.

## Architecture

- **Frontend**: React.js application
- **Backend**: Node.js REST API
- **Database**: PostgreSQL
- **Infrastructure**: AWS (ECS, RDS, ALB, VPC)
- **IaC**: Terraform
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Containerization**: Docker + Docker Compose

## Services

1. **Frontend** (`/frontend`) - React app with Nginx
2. **Backend** (`/backend`) - Node.js Express API
3. **Database** - PostgreSQL (AWS RDS)
4. **Monitoring** (`/monitoring`) - Prometheus & Grafana stack

## Quick Start

### Local Development
```bash
make install && make up
# Visit: http://localhost:3000
```

### Deploy to AWS via GitHub Actions

1. **Setup AWS Resources**:
   ```bash
   ./setup.sh
   ```

2. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   ```

3. **Add GitHub Secrets**:
   - Go to GitHub repo → Settings → Secrets
   - Add: `AWS_ACCESS_KEY_ID`
   - Add: `AWS_SECRET_ACCESS_KEY`

4. **Deploy**:
   ```bash
   git push -u origin main
   ```
   
   The GitHub Actions workflow will automatically:
   - Run tests
   - Build Docker images
   - Deploy infrastructure with Terraform
   - Push images to ECR
   - Deploy to ECS
   - Upload frontend to S3

## Features Demonstrated

- Multi-service containerized application
- Infrastructure as Code with Terraform
- Automated CI/CD pipeline
- Container orchestration with ECS
- Database management with RDS
- Load balancing and auto-scaling
- Comprehensive monitoring and alerting
- Security best practices