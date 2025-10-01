terraform {
  backend "s3" {
    bucket = "terraform-tf-jenkins-eks-bucket"
    key    = "eks/terraform.tfstate"
    region = "us-east-1"
  }
}
