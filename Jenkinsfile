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
                sh "docker-compose -f docker-compose.test.yml -d up"
                sh "docker run --entrypoint npm --network parking-lot_testing parking-lot:B_${env.BUILD_ID} test"
                sh "docker-compose down"
            }
        }
        stage('Coverage') {
            steps {
                echo "Publishing Coverage Reports"
            }
        }
    }
}