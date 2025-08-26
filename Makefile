.PHONY: install build start dev docker-build docker-run docker-run-detached docker-stop clean help

install:
	npm install

build:
	npm run build

start:
	npm start

dev:
	npm run dev

docker-build:
	docker build -t school-management-api .

docker-run:
	docker run --rm -it -p 3000:3000 --name school-management-api school-management-api

docker-run-detached:
	docker run -d -p 3000:3000 --name school-management-api school-management-api

docker-stop:
	docker stop school-management-api || true

clean:
	rm -rf dist

help:
	@echo "Available commands:"
	@echo "  make install            Install npm dependencies"
	@echo "  make build              Build TypeScript project"
	@echo "  make start              Start production server"
	@echo "  make dev                Start dev server"
	@echo "  make docker-build       Build Docker image"
	@echo "  make docker-run         Run container (interactive)"
	@echo "  make docker-run-detached Run container (detached)"
	@echo "  make docker-stop        Stop container"
	@echo "  make clean              Remove build artifacts"
