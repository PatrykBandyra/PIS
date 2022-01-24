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
                    echo "Starting clean install"
                    sh './mvnw clean install -DskipTests=true'
                    echo "Done clean install"
                    sh "./mvnw package -DskipTests=true"
                    echo "Done packaging BE"
                }
            }
        }

        stage('Frontend') {
            steps {
                dir('frontend') {
                    echo "Starting yarn install"
                    sh 'yarn install'
                    echo "Done installing"
                    sh 'yarn start'
                    echo "FE started"
                    sh 'yarn pack --filename fe_package'
                    echo "Done packaging FE"
                }
            }
        }

        stage("Publish BE to Nexus Repository Manager") {
            steps {
                script {
                    pom = readMavenPom file: "backend/pom.xml";
                    filesByGlob = findFiles(glob: "backend/target/*.${pom.packaging}");
                    echo "${filesByGlob[0].name} ${filesByGlob[0].path} ${filesByGlob[0].directory} ${filesByGlob[0].length} ${filesByGlob[0].lastModified}"
                    artifactPath = filesByGlob[0].path;
                    artifactExists = fileExists artifactPath;
                    if(artifactExists) {
                        echo "*** File: ${artifactPath}, group: ${pom.groupId}, packaging: ${pom.packaging}, version ${pom.version}";
                        nexusArtifactUploader(
                            nexusVersion: NEXUS_VERSION,
                            protocol: NEXUS_PROTOCOL,
                            nexusUrl: NEXUS_URL,
                            groupId: pom.groupId,
                            version: pom.version,
                            repository: NEXUS_REPOSITORY,
                            credentialsId: NEXUS_CREDENTIAL_ID,
                            artifacts: [
                                [artifactId: pom.artifactId,
                                classifier: '',
                                file: artifactPath,
                                type: pom.packaging],
                                [artifactId: pom.artifactId,
                                classifier: '',
                                file: "pom.xml",
                                type: "pom"]
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