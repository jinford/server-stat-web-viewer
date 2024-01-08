package main

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

type Server struct {
	port            int
	shutdownTimeout time.Duration
	router          http.Handler
}

func NewServer(
	port int,
	shutdownTimeout time.Duration,
	router http.Handler,
) *Server {
	return &Server{
		port:            port,
		shutdownTimeout: shutdownTimeout,
		router:          router,
	}
}

func (s *Server) Run(mainCtx context.Context) error {
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", s.port),
		Handler: s.router,
	}

	errStream := make(chan error)
	go func() {
		if err := srv.ListenAndServe(); err != nil {
			if err != http.ErrServerClosed {
				errStream <- fmt.Errorf("srv.ListenAndServe: %w", err)
			}
		}
	}()

	select {
	case <-mainCtx.Done():
		shutdownCtx, cancel := context.WithTimeout(context.Background(), s.shutdownTimeout)
		defer cancel()

		if err := srv.Shutdown(shutdownCtx); err != nil {
			return fmt.Errorf("srv.Shutdown: %w", err)
		}

	case err := <-errStream:
		return err
	}

	return nil
}
