package routes

import (
	"main/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	// authController.go
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)

	// postController.go
	app.Post("/api/createpost", controllers.CreatePost)
	app.Get("/api/findposts", controllers.FindPosts)
	app.Get("/api/findposts/:id", controllers.FindSinglePost)
}
