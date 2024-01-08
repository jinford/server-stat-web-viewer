package main

import (
	"context"
	"time"
)

type Broadcaster interface {
	Broadcast(data []byte)
}

type StatCollectWorker struct {
	broadcaster Broadcaster
	intervel    time.Duration
}

func NewStatCollectWorker(broadcaster Broadcaster, intervel time.Duration) *StatCollectWorker {
	return &StatCollectWorker{
		broadcaster: broadcaster,
		intervel:    intervel,
	}
}

func (w *StatCollectWorker) Run(ctx context.Context) error {
	t := time.NewTicker(w.intervel)
	defer t.Stop()

	for {
		select {
		case <-ctx.Done():
			return nil
		case <-t.C:
			stat := CollectStat()
			w.broadcaster.Broadcast(stat.ToJSON())
		}
	}
}
