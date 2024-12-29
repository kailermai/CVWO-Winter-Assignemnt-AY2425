package main

import (
	"log"

	"main/database"
	"main/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Connect()
	app := fiber.New()
	routes.Setup(app)
	log.Fatal(app.Listen(":8000"))
}
