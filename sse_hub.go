package main

import (
	"context"
)

type SSEHub struct {
	eventBufferSize int

	clients    map[*SSEClient]struct{}
	broadcast  chan []byte
	register   chan *SSEClient
	unregister chan *SSEClient
	close      chan struct{}
}

func NewSSEHub(eventBufferSize int) *SSEHub {
	return &SSEHub{
		eventBufferSize: eventBufferSize,
		clients:         map[*SSEClient]struct{}{},
		broadcast:       make(chan []byte),
		register:        make(chan *SSEClient),
		unregister:      make(chan *SSEClient),
		close:           make(chan struct{}),
	}
}

func (h *SSEHub) Register(client *SSEClient) {
	select {
	case h.register <- client:
	default:
	}
}

func (h *SSEHub) Unregiter(client *SSEClient) {
	select {
	case h.unregister <- client:
	default:
	}
}

func (h *SSEHub) Broadcast(eventData []byte) {
	select {
	case h.broadcast <- eventData:
	default:
	}
}

func (h *SSEHub) Close() <-chan struct{} {
	return h.close
}

func (h *SSEHub) Run(ctx context.Context) error {
	defer func() {
		close(h.close)

		for {
			select {
			case client := <-h.unregister:
				client.Close()
				delete(h.clients, client)
			default:
				return
			}
		}
	}()

	for {
		select {
		case <-ctx.Done():
			return nil
		case client := <-h.register:
			h.clients[client] = struct{}{}
		case client := <-h.unregister:
			client.Close()
			delete(h.clients, client)
		case eventData := <-h.broadcast:
			for client := range h.clients {
				client.TryQueueEventData(eventData)
			}
		}
	}
}
