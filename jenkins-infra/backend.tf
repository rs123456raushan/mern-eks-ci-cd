terraform {
  backend "s3" {
    bucket = "terraform-tf-jenkins-eks-bucket"
    key    = "jenkins/terraform.tfstate"
    region = "us-east-1"
  }
}
