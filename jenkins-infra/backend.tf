terraform {
  backend "s3" {
    bucket = "terraform-tf-state-backend-s3"
    key    = "jenkins/terraform.tfstate"
    region = "eu-north-1"
  }
}
