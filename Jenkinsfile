@Library('retort-lib') _
def label = "jenkins-${UUID.randomUUID().toString()}"

def ZCP_USERID='dochoman'
def DOCKER_IMAGE='skhappycampus/skhappycampus-frontend'
def K8S_NAMESPACE='skhappycampus'

podTemplate(label:label,
    serviceAccount: "zcp-system-sa-${ZCP_USERID}",
    containers: [
		containerTemplate(name: 'jnlp', image:'skcc-happycam-registry.cloudzcp.io/cloudzcp/jnlp-slave:alpine', args: '${computer.jnlpmac} ${computer.name}'),
        containerTemplate(name: 'npm', image:'skcc-happycam-registry.cloudzcp.io/cloudzcp/node:10.15.3', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'docker', image: 'skcc-happycam-registry.cloudzcp.io/cloudzcp/docker:17-dind', ttyEnabled: true, command: 'dockerd-entrypoint.sh', privileged: true),
        containerTemplate(name: 'kubectl', image: 'skcc-happycam-registry.cloudzcp.io/cloudzcp/k8s-kubectl:v1.13.6', ttyEnabled: true, command: 'cat')
    ],
    volumes: [
        persistentVolumeClaim(mountPath: '/root/.m2', claimName: 'zcp-jenkins-mvn-repo')
    ]) {

    node(label) {
        stage('SOURCE CHECKOUT') {
            def repo = checkout scm
            env.SCM_INFO = repo.inspect()
        }
        
        stage('BUILD') {
            container('npm') {
                sh 'npm install'
                sh 'node -v'
                sh 'npm -v'
                sh 'npm run build'
            }
        }
        
        stage('BUILD DOCKER IMAGE') {
            container('docker') {
                dockerCmd.build tag: "${HARBOR_REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}"
                dockerCmd.push registry: HARBOR_REGISTRY, imageName: DOCKER_IMAGE, imageVersion: BUILD_NUMBER, credentialsId: "HARBOR_CREDENTIALS"
            }
        }

        stage('DEPLOY') {
            container('kubectl') {
                kubeCmd.apply file: 'k8s/skhappycampus-frontend-ingress.yaml', namespace: K8S_NAMESPACE
                kubeCmd.apply file: 'k8s/skhappycampus-frontend-service.yaml', namespace: K8S_NAMESPACE
                yaml.update file: 'k8s/skhappycampus-frontend-deployment.yaml', update: ['.spec.template.spec.containers[0].image': "${HARBOR_REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}"]
                kubeCmd.apply file: 'k8s/skhappycampus-frontend-deployment.yaml', wait: 1000, recoverOnFail: false, namespace: K8S_NAMESPACE
            }
        }
    }
}