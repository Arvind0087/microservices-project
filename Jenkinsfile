pipeline {
    agent any

    environment {
        API_GATEWAY_IMAGE = "arvind090/api-gateway:latest"
        USER_SERVICE_IMAGE = "arvind090/user-service:latest"
        ORDER_SERVICE_IMAGE = "arvind090/order-service:latest"
    }

    stages {
        stage('Clone Code') {
            steps {
                echo "Cloning the code"
                git branch: 'main', url: 'https://github.com/Arvind0087/microservices-project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images"

                sh 'docker build -t $API_GATEWAY_IMAGE ./api-gateway'
                sh 'docker build -t $USER_SERVICE_IMAGE ./user-service'
                sh 'docker build -t $ORDER_SERVICE_IMAGE ./order-service'
            }
        }

        stage('Login DockerHub') {
            steps {
                echo "Login to dockerhub"
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Pushing the image to dockerhub"

                sh 'docker push $API_GATEWAY_IMAGE'
                sh 'docker push $USER_SERVICE_IMAGE'
                sh 'docker push $ORDER_SERVICE_IMAGE'
            }
        }

        stage('Deploy Containers') {
            steps {
                echo "Deploying the containers"

                sh '''
                # Stop containers using ports
                docker ps -q --filter "publish=8000" | xargs -r docker rm -f
                docker ps -q --filter "publish=8001" | xargs -r docker rm -f
                docker ps -q --filter "publish=8002" | xargs -r docker rm -f

                # Remove containers if they exist
                docker rm -f api-gateway || true
                docker rm -f user-service || true
                docker rm -f order-service || true

                # Run new containers
                docker run -d -p 8000:8000 --name api-gateway $API_GATEWAY_IMAGE
                docker run -d -p 8001:8001 --name user-service $USER_SERVICE_IMAGE
                docker run -d -p 8002:8002 --name order-service $ORDER_SERVICE_IMAGE
                '''
            }
        }
    }
}