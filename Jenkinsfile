pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Running build : ${env.BUILD_ID}"
                bash "docker build -t parking-lot:B_${env.BUILD_ID} ."
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
    }
}