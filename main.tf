terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = ">= 2.0.0"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

resource "docker_network" "rabbitmq_go_net" {
  name   = "rabbitmq_go_net"
  driver = "bridge"
}

resource "docker_volume" "dbdata6" {
  name = "dbdata6"
}

resource "docker_volume" "rabbitmq_data" {
  name = "rabbitmq_data"
}

resource "docker_volume" "rabbitmq_log" {
  name = "rabbitmq_log"
}
