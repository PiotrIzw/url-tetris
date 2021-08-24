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
                    
            }
        }
        stage('Test') {
             steps {
                when ( env.FAILED ) {
                    expression {
                        currentBuild.result = 'ABORTED'
                        error('Build failed! Stopping…')
                    }
                }
                sh 'yarn test > log.txt'
            }
            post {
                failure {
                    emailext attachLog: true,
                        attachmentsPattern: 'log.txt',
                        to:'piotrekizworski@gmail.com',
                        subject: "Failed Test stage in Pipeline: ${currentBuild.fullDisplayName}",
                        body: "Something is wrong with ${env.BUILD_URL}"        
                }
                success {
                    mail to: 'piotrekizworski@gmail.com',
                        subject: "Success Pipeline: ${currentBuild.fullDisplayName}",
                        body: "Success testing ${env.BUILD_URL} "                        
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
