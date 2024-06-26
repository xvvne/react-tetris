pipeline {
    agent any

    stages {
        stage('Preparation') {
            steps {
                // Checkout SCM
                checkout scm
                // Install specific version of Docker Compose if needed
                sh "curl -L \"https://github.com/docker/compose/releases/download/\${DOCKER_COMPOSE_VERSION}/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose"
                sh "chmod +x /usr/local/bin/docker-compose"
            }
        }
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker-compose down'
            }
        }
    }
}