pipeline {
    agent any

    environment {
        APP_NAME = 'EmployeeManagement'
        DOCKER_USER = 'meghanas12345'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing backend dependencies'
                bat 'cd backend && npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated application test'
                bat 'cd backend && node --check server.js'
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging application for Docker deployment'
                bat 'if exist backend\\package.json (echo Backend package verified) else (echo package.json missing && exit /b 1)'
                bat 'if exist frontend\\index.html (echo Frontend package verified) else (echo index.html missing && exit /b 1)'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images'

                bat 'docker build -t %DOCKER_USER%/employee-management-backend:%IMAGE_TAG% ./backend'

                bat 'docker build -t %DOCKER_USER%/employee-management-frontend:%IMAGE_TAG% ./frontend'
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker images to Docker Hub'

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {

                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'

                    bat 'docker push %DOCKER_USER%/employee-management-backend:%IMAGE_TAG%'

                    bat 'docker push %DOCKER_USER%/employee-management-frontend:%IMAGE_TAG%'
                }
            }
        }
    }

    post {
        success {
            echo 'Week 9 CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
