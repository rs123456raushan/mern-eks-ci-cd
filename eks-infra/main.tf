# -------------------------------
# VPC Module
# -------------------------------
# This module creates a VPC with public and private subnets, NAT gateway, and appropriate tags
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "jenkins-vpc" # Name of the VPC
  cidr = var.vpc_cidr  # CIDR block for the VPC (defined in variables)

  # Availability zones to use
  azs             = data.aws_availability_zones.azs.names
  private_subnets = var.private_subnets # Private subnet CIDRs
  public_subnets  = var.public_subnets  # Public subnet CIDRs

  enable_dns_hostnames = true # Required for EKS
  enable_nat_gateway   = true # Enable NAT Gateway for private subnets
  single_nat_gateway   = true # Only one NAT Gateway for cost-saving

  # Tags for the VPC
  tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
  }

  # Tags for public subnets (used by ELB for public access)
  public_subnet_tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
    "kubernetes.io/role/elb"               = 1
  }

  # Tags for private subnets (used by internal ELB)
  private_subnet_tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
    "kubernetes.io/role/internal-elb"      = 1
  }
}

# -------------------------------
# EKS Module
# -------------------------------
# This module creates an EKS cluster, managed node groups, and common add-ons
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = "my-eks-cluster" # Cluster name
  kubernetes_version = "1.33"           # Kubernetes version

  endpoint_public_access                   = true # API accessible from internet
  enable_cluster_creator_admin_permissions = true # Allow admin permissions for creator

  # -------------------------------
  # Compute Config (Auto Mode)
  # -------------------------------
  # This is a simplified way to create node groups managed by AWS
  compute_config = {
    enabled    = true
    node_pools = ["general-purpose"] # Name of the node pool (auto-generated default)
  }

  # -------------------------------
  # Subnets
  # -------------------------------
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets # Nodes will be launched in private subnets

  # -------------------------------
  # Managed Node Groups
  # -------------------------------
  # Define node group(s) with specific instance types and scaling
  eks_managed_node_groups = {
    default = {
      instance_types = ["t3.medium"] # EC2 instance type for worker nodes
      min_size       = 1             # Minimum number of nodes
      max_size       = 3             # Maximum number of nodes
      desired_size   = 2             # Desired initial nodes
    }
  }

  # -------------------------------
  # Addons
  # -------------------------------
  # Install common EKS add-ons like CoreDNS, kube-proxy, VPC CNI plugin
  addons = {
    coredns = {} # CoreDNS for cluster DNS
    eks-pod-identity-agent = {
      before_compute = true # Install before node group creation
    }
    kube-proxy = {} # kube-proxy for networking
    vpc-cni = {
      before_compute = true # Install VPC CNI plugin before nodes
    }
  }

  # -------------------------------
  # Tags
  # -------------------------------
  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}
