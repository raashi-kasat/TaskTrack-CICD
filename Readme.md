# TaskTrack – CI/CD Pipeline Implementation and Deployment

## 1. Project Overview

TaskTrack is a simple task management web application built using Node.js and Express.js. It provides a web interface for viewing and managing tasks and exposes API endpoints for application functionality and health monitoring.

This project demonstrates the implementation of a Continuous Integration and Continuous Deployment (CI/CD) pipeline using Jenkins, Docker, and Kubernetes.

## 2. Objectives

- Automate source code checkout from GitHub.
- Install project dependencies and execute automated tests.
- Build a Docker image of the application.
- Push the Docker image to Docker Hub.
- Deploy the application to Kubernetes using Deployment and Service manifests.
- Verify the deployment and application health.
- Demonstrate the pipeline by making a source code change and running it again.

## 3. Technology Stack

- **Application:** Node.js and Express.js
- **Testing:** Node.js test runner and Supertest
- **Version Control:** Git and GitHub
- **CI/CD Automation:** Jenkins
- **Containerization:** Docker
- **Container Registry:** Docker Hub
- **Container Orchestration:** Kubernetes using Minikube

## 4. Project Structure

```text
TaskTrack/
├── src/
│   └── server.js
├── test/
│   └── server.test.js
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── Dockerfile
├── .dockerignore
├── .gitignore
├── Jenkinsfile
├── package.json
├── package-lock.json
└── README.md
```

## 5. Application Features

- Web interface for the TaskTrack application.
- REST API endpoint for task data.
- Health-check endpoint at `/health`.
- Automated tests for application endpoints.

## 6. CI/CD Pipeline

The Jenkins pipeline is designed to execute the following stages:

1. **Checkout:** Retrieve the source code from the GitHub repository.
2. **Install Dependencies:** Install Node.js dependencies using `npm ci`.
3. **Run Tests:** Execute automated tests using `npm test`.
4. **Build Docker Image:** Build a container image for the application.
5. **Push Docker Image:** Authenticate with Docker Hub and publish the image.
6. **Deploy to Kubernetes:** Apply the Kubernetes manifests and update the application image.
7. **Verify Deployment:** Check the Kubernetes Deployment, Pods, Service, and rollout status.

## 7. Docker Configuration

The Dockerfile uses a Node.js Alpine base image, installs production dependencies, copies the application source code, and starts the application on port `3000`.

Docker Hub image:

`raashikasat04/tasktrack`

## 8. Kubernetes Deployment

The application is deployed using Kubernetes manifests stored in the `k8s/` directory.

- **Deployment:** Manages the TaskTrack application pod.
- **Service:** Exposes the application using a NodePort service.
- **Application Port:** `3000`
- **NodePort:** `30080`
- **Health Checks:** Kubernetes probes use the `/health` endpoint.

## 9. Repository

GitHub: https://github.com/raashi-kasat/TaskTrack

Docker Hub: https://hub.docker.com/r/raashikasat04/tasktrack

## 10. Verification and Results

The following evidence will be recorded after the pipeline is executed:

- Jenkins pipeline execution and console output.
- Successful automated test results.
- Docker image publication to Docker Hub.
- Kubernetes Deployment and Pod status.
- Kubernetes Service details.
- Application accessibility through the configured service.
- Successful pipeline execution after a source code change.

## 11. Conclusion

This project demonstrates how Jenkins can automate application testing, Docker image creation, image publication, and Kubernetes deployment. The pipeline helps make application delivery repeatable and provides a foundation for continuous integration and deployment practices.
