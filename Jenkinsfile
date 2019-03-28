pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Running build : ${env.BUILD_ID}"
                sh "docker build -t parking-lot:B_${env.BUILD_ID} ."
            }
        }
        stage('Test') {
            steps {
                sh "docker run --entrypoint npm parking-lot:B_${env.BUILD_ID} test"
            }
        }
        stage('Coverage') {
            steps {
                echo "Publishing Coverage Reports"
            }
        }
    }
}