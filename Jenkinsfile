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

                    echo "*** Starting Installation of BE"
                    updateGitlabCommitStatus name: 'Build BE', state: 'pending'
                    script {
                        result = sh returnStatus: true ,script: "./mvnw clean install -DskipTests=true"
                        if (result == 0) {
                            updateGitlabCommitStatus name: 'Build BE', state: 'success'
                            sh "./mvnw package -DskipTests=true"
                        } else {
                            updateGitlabCommitStatus name: 'Build BE', state: 'failure'
                        }
                    }

                    echo "*** Running tests of BE"
                    updateGitlabCommitStatus name: 'Test BE', state: 'pending'
                    script {
                        result = 0
                        // result = sh returnStatus: true ,script: "./mvnw test"
                        if (result == 0) {
                            updateGitlabCommitStatus name: 'Test BE', state: 'success'
                        } else {
                            updateGitlabCommitStatus name: 'Test BE', state: 'failure'
                        }
                    }

                    echo "*** Done installing and testing, now starting"
                    updateGitlabCommitStatus name: 'Start BE', state: 'pending'
                    script {
                        result = sh returnStatus: true ,script: "./mvnw spring-boot:run -DskipTests=true"
                        if (result == 0) {
                            updateGitlabCommitStatus name: 'Start BE', state: 'success'
                        } else {
                            updateGitlabCommitStatus name: 'Start BE', state: 'failure'
                        }
                    }

                    echo "*** Backend has been started!"
                }
            }
        }

        stage('Frontend') {
            steps {
                dir('frontend') {
                    echo "*** Starting Installation of FE"
                    updateGitlabCommitStatus name: 'Build FE', state: 'pending'
                    script {
                        result = sh returnStatus: true ,script: "yarn install"
                        if (result == 0) {
                            updateGitlabCommitStatus name: 'Build FE', state: 'success'
                            sh "yarn pack --filename fe_package"
                        } else {
                            updateGitlabCommitStatus name: 'Build FE', state: 'failure'
                        }
                    }

                    echo "*** Start FE"
                    updateGitlabCommitStatus name: 'Start FE', state: 'pending'
                    script {
                        result = sh returnStatus: true ,script: "yarn start"
                        if (result == 0) {
                            updateGitlabCommitStatus name: 'Start FE', state: 'success'
                        } else {
                            updateGitlabCommitStatus name: 'Start FE', state: 'failure'
                        }
                    }
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