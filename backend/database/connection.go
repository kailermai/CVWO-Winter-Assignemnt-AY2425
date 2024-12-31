package database

import (
	"main/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// Important to parseTime=true else will have error accessing posts
	connection, err := gorm.Open(mysql.Open("root:rootroot@/cvwo?parseTime=true"), &gorm.Config{})

	if err != nil {
		panic("could not connect to the db")
	}

	DB = connection

	// user
	connection.AutoMigrate(&models.User{})

	// threads
	connection.AutoMigrate(&models.Post{})
}
