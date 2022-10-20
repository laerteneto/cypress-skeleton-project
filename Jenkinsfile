
pipeline {
    agent {
        dockerfile true
    }

    stages {
        stage("Build") {
            steps {
                sh 'make build'
            }
        }

        stage('Tests') {
            steps {
                sh 'make test'                          
            }
        }
    }
}