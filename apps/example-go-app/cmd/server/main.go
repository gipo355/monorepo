package main

import (
	"log"

	"github.com/gipo355/monorepo/apps/example-go-app/internal/hello"
)

func main() {
	log.Println(hello.SayHello())
}
