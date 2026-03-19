pipeline {
    agent any

    environment {
        API_GATEWAY_IMAGE   = "arvind090/api-gateway:latest"
        USER_SERVICE_IMAGE  = "arvind090/user-service:latest"
        ORDER_SERVICE_IMAGE = "arvind090/order-service:latest"
        NETWORK_NAME        = "microservices-net"
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
                sh 'docker build -t $API_GATEWAY_IMAGE   ./api-gateway'
                sh 'docker build -t $USER_SERVICE_IMAGE  ./user-service'
                sh 'docker build -t $ORDER_SERVICE_IMAGE ./order-service'
            }
        }

        stage('Login DockerHub') {
            steps {
                echo "Login to DockerHub"
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
                echo "Pushing images to DockerHub"
                sh 'docker push $API_GATEWAY_IMAGE'
                sh 'docker push $USER_SERVICE_IMAGE'
                sh 'docker push $ORDER_SERVICE_IMAGE'
            }
        }

        stage('Deploy Containers') {
            steps {
                echo "Deploying containers"
                sh '''
                    # ── 1. Remove old containers ──────────────────────────
                    docker rm -f api-gateway   || true
                    docker rm -f user-service  || true
                    docker rm -f order-service || true

                    # ── 2. Create shared network (if not exists) ──────────
                    docker network create $NETWORK_NAME || true

                    # ── 3. Start services FIRST (no ports needed internally)
                    docker run -d \
                        --name user-service \
                        --network $NETWORK_NAME \
                        -p 8001:8001 \
                        $USER_SERVICE_IMAGE

                    docker run -d \
                        --name order-service \
                        --network $NETWORK_NAME \
                        -p 8002:8002 \
                        $ORDER_SERVICE_IMAGE

                    # ── 4. Start gateway LAST with env vars pointing to services
                    docker run -d \
                        --name api-gateway \
                        --network $NETWORK_NAME \
                        -p 8000:8000 \
                        -e USER_SERVICE_URL=http://user-service:8001 \
                        -e ORDER_SERVICE_URL=http://order-service:8002 \
                        $API_GATEWAY_IMAGE
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo '   API Gateway   → http://localhost:8000'
            echo '   User Service  → http://localhost:8001'
            echo '   Order Service → http://localhost:8002'
        }
        failure {
            echo '❌ Pipeline failed! Check the logs above.'
        }
    }
}