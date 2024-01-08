package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"time"

	"golang.org/x/sync/errgroup"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	hub := NewSSEHub(1024)
	worker := NewStatCollectWorker(hub, 1*time.Second)
	router := NewRouter(hub)
	s := NewServer(8080, 10*time.Second, router)

	eg, ctx := errgroup.WithContext(ctx)

	eg.Go(func() error {
		return hub.Run(ctx)
	})

	eg.Go(func() error {
		return worker.Run(ctx)
	})

	eg.Go(func() error {
		return s.Run(ctx)
	})

	if err := eg.Wait(); err != nil {
		log.Fatal(err)
	}
}
