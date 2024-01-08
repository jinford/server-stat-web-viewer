package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func NewRouter(hub *SSEHub) http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
	}))

	r.Get("/api/sse", NewSSEHandler(hub).ServeHTTP)
	r.NotFound(NewWebUIHandler().ServeHTTP)

	return r
}
