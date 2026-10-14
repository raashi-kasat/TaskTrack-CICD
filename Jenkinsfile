pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        IMAGE_NAME = 'raashikasat04/tasktrack'
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t "$IMAGE_NAME:$BUILD_NUMBER" .
                    docker tag "$IMAGE_NAME:$BUILD_NUMBER" "$IMAGE_NAME:latest"
                '''
            }
        }

      
stage('Push Docker Image') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKERHUB_USERNAME',
            passwordVariable: 'DOCKERHUB_TOKEN'
        )]) {
            sh '''
                set +x
                echo "$DOCKERHUB_TOKEN" | docker login \
                    --username "$DOCKERHUB_USERNAME" \
                    --password-stdin
                docker push "$IMAGE_NAME:$BUILD_NUMBER"
                docker push "$IMAGE_NAME:latest"
                docker logout
            '''
        }
    }
}


        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml

                    kubectl set image deployment/tasktrack \
                        tasktrack="$IMAGE_NAME:$BUILD_NUMBER"

                    kubectl rollout status deployment/tasktrack \
                        --timeout=180s
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    kubectl get deployments
                    kubectl get pods
                    kubectl get services
                    kubectl rollout status deployment/tasktrack \
                        --timeout=180s
                '''
            }
        }
    }

    post {
        success {
            echo 'TaskTrack CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output for details.'
        }

        always {
            sh 'docker logout || true'
        }
    }
}