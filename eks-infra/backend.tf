terraform {
  backend "s3" {
    bucket = "terraform-tf-state-bucket-s3"
    key    = "eks/terraform.tfstate"
    region = "eu-north-1"
  }
}
