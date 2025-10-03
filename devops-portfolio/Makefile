.PHONY: help build up down logs clean deploy

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build all Docker images
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## Show logs from all services
	docker-compose logs -f

clean: ## Clean up Docker resources
	docker-compose down -v
	docker system prune -f

deploy: ## Deploy to AWS
	cd terraform && terraform init && terraform apply -auto-approve

init-aws: ## Initialize AWS infrastructure
	cd terraform && terraform init

plan-aws: ## Plan AWS infrastructure changes
	cd terraform && terraform plan

destroy-aws: ## Destroy AWS infrastructure
	cd terraform && terraform destroy

install-backend: ## Install backend dependencies
	cd backend && npm install

install-frontend: ## Install frontend dependencies
	cd frontend && npm install

install: install-backend install-frontend ## Install all dependencies

dev-backend: ## Run backend in development mode
	cd backend && npm run dev

dev-frontend: ## Run frontend in development mode
	cd frontend && npm start