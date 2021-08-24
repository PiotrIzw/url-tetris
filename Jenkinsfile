pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git branch: 'master', url: 'https://github.com/PiotrIzw/url-tetris'
                sh 'npm install'
                sh 'git pull origin master'
                sh 'yarn build > log_build.txt'
            }
            
            post {
                failure {
                    script {
                        env.FAILED = true
                    }  
                    
                    emailext attachLog: true,
                        attachmentsPattern: 'log_build.txt',
                        to:'piotrekizworski@gmail.com',
                        subject: "Failed Build stage in Pipeline: ${currentBuild.fullDisplayName}",
                        body: "Something is wrong with ${env.BUILD_URL}"     
                      
                }
                success {
                    mail to: 'piotrekizworski@gmail.com',
                        subject: "Success Pipeline: ${currentBuild.fullDisplayName}",
                        body: "Success building ${env.BUILD_URL} "
                }
            }
            
            
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'yarn test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
