pipeline {
    agent any

stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Build') {
        steps {
            echo 'Building Employee Management Application'
            bat '''
                cd backend
                npm install
            '''
        }
    }

    stage('Test') {
        steps {
            echo 'Running application test'
            bat '''
                cd backend
                node --check server.js
            '''
        }
    }

    stage('Validation') {
        steps {
            echo 'Running validation'
            bat '''
                cd backend
                if exist package.json (
                    echo package.json found
                ) else (
                    echo package.json missing
                    exit /b 1
                )
            '''
        }
    }
}
```

}
