package database

import (
	"main/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(mysql.Open("root:rootroot@/cvwo"), &gorm.Config{})

	if err != nil {
		panic("could not connect to the db")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}
