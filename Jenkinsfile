pipeline {
    agent any

    tools {
        // This must match the name of the NodeJS installation in Jenkins Global Tool Configuration
        nodejs 'node' 
    }

    environment {
        APP_NAME = "digital-factory-frontend"
        USER_EMAIL = "ceducation700@gmail.com"
    }

    stages {
        stage('1. Checkout') {
            steps {
                git branch: 'main', 
                    credentialsId: 'github-creds', 
                    url: 'https://github.com/Mohith4648/digital-factory-frontend.git'
            }
        }

        stage('2. Install Dependencies') {
            steps {
                echo 'Running Clean Install (npm ci)...'
                sh 'npm ci'
            }
        }

        stage('3. Code Quality') {
            steps {
                echo 'Checking Lint and TypeScript Compilation...'
                // sh 'npm run lint' // Uncomment if you have linting setup
                sh 'npx tsc --noEmit' 
            }
        }

        stage('4. Run Unit Tests') {
            steps {
                echo 'Running Karma/Jasmine Tests...'
                // --watch=false is critical for Jenkins so it doesn't hang
                sh 'npm test -- --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('5. Build Production') {
            steps {
                echo 'Compiling Angular for Production...'
                sh 'npm run build -- --configuration=production'
            }
        }

        stage('6. Build Docker Image') {
            steps {
                echo 'Packaging Angular with Nginx...'
                sh "podman build -t ${APP_NAME} ."
            }
        }

        stage('7. Push & Deploy') {
            steps {
                echo 'Deploying Frontend to Port 80...'
                sh "podman stop ${APP_NAME} || true"
                sh "podman rm ${APP_NAME} || true"
                sh "podman run -d --name ${APP_NAME} -p 80:80 ${APP_NAME}"
            }
        }
    }

    post {
        success {
            emailext body: "Dashboard is LIVE! Build #${env.BUILD_NUMBER} passed.",
                     subject: "Frontend Deployed: ${env.JOB_NAME}",
                     to: "${env.USER_EMAIL}"
        }
        failure {
            emailext body: "Frontend Build FAILED. Check Karma or Build logs.",
                     subject: "ALERT: Frontend Failure",
                     to: "${env.USER_EMAIL}"
        }
    }
}
