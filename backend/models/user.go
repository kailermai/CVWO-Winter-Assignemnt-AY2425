package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id   uint   `json:"id" gorm:"primaryKey"`
	Name string `json:"name" gorm:"unique"`
}
