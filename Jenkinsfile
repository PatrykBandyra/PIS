pipeline {
    agent {
        label "master"
    }

    tools {
            maven "Maven 3.6.3"
    }
    environment {
        NEXUS_VERSION = "nexus3"
        NEXUS_PROTOCOL = "http"
        NEXUS_URL = "localhost:8081"
        NEXUS_REPOSITORY = "pis10_repo"
        NEXUS_CREDENTIAL_ID = "nexus_admin"
    }

    stages {
        stage('Backend') {
            steps {
                dir('backend') {
                    echo "Starting Installation of BE"
                    updateGitlabCommitStatus name: 'Build BE', state: 'pending'
                    script {
                        result = sh returnStatus: true ,script: "./mvnw clean install -DskipTests=true"
                    }
                    echo result
                    updateGitlabCommitStatus name: 'Build BE', state: 'success'

                    updateGitlabCommitStatus name: 'Test BE', state: 'pending'
                    echo "Testin BE"    // ADD TEST STEP sh './mvnw test'
                    updateGitlabCommitStatus name: 'Test BE', state: 'success'

                    updateGitlabCommitStatus name: 'Start and Pack BE', state: 'pending'
                    echo "Done installing and testing, now starting"

                    echo "Backend has been started!"

                    sh "./mvnw package -DskipTests=true"
                    echo "Done packaging BE"

                    updateGitlabCommitStatus name: 'Start and Pack BE', state: 'success'
                    sh './mvnw spring-boot:run -DskipTests=true'
                }
            }
        }

        stage('Frontend') {
            steps {
                dir('frontend') {
                    echo "Starting Installation of FE"
                    updateGitlabCommitStatus name: 'Install FE', state: 'pending'
                    sh 'yarn install'
                    echo "Done installing"
                    updateGitlabCommitStatus name: 'Install FE', state: 'success'

                    updateGitlabCommitStatus name: 'Start and Pack FE', state: 'pending'
                    sh 'yarn pack --filename fe_package'
                    echo "Done packaging FE"

                    updateGitlabCommitStatus name: 'Start and Pack FE', state: 'success'
                    sh 'yarn start'
                }
            }
        }

        stage("Publish packages to Nexus Repository Manager") {
            steps {
                echo "Uploading BE and FE packages"
                script {
                    pom = readMavenPom file: "backend/pom.xml";
                    filesByGlob = findFiles(glob: "backend/target/*.${pom.packaging}");
                    artifactPath = filesByGlob[0].path;
                    artifactExists = fileExists artifactPath;
                    if(artifactExists) {
                        echo "*** File: ${artifactPath}, group: ${pom.groupId}, packaging: ${pom.packaging}, version ${pom.version}";
                        nexusArtifactUploader(
                            nexusVersion: NEXUS_VERSION,
                            protocol: NEXUS_PROTOCOL,
                            nexusUrl: NEXUS_URL,
                            groupId: 'PIS-Project',
                            version: 'MAIN-deploy',
                            repository: NEXUS_REPOSITORY,
                            credentialsId: NEXUS_CREDENTIAL_ID,
                            artifacts: [
                                [artifactId: pom.artifactId,
                                classifier: '',
                                file: artifactPath,
                                type: pom.packaging],
                                [artifactId: pom.artifactId,
                                classifier: '',
                                file: "frontend/fe_package"]
                            ]
                        );
                    } else {
                        error "*** File: ${artifactPath}, could not be found";
                    }
                }
            }
        }
    }
}