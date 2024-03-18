package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

var database *sql.DB

func init() {
	//defer database.Close()
	var err error
	database, err = sql.Open("sqlite3", "./database.sqlite3")
	if err != nil {
		log.Fatalln(err)
	}
}

type Message struct {
	Username string `json:"username"`
	RegNum   string `json:"regnum"`
	Password string `json:"password"`
}

func main() {
	http.HandleFunc("/signin", handleMessage)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleMessage(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var msg Message
	if err := json.NewDecoder(r.Body).Decode(&msg); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	log.Println("Received message:", msg)

	var exists bool
	err := database.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username=?)", msg.Username).Scan(&exists)
	if err != nil {
		log.Fatalln(err)
	}
	response := struct {
		Successful bool `json:"successful"`
	}{Successful: false}
	if exists {
		response.Successful = true
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)

}
