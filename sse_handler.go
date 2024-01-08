package main

import (
	"fmt"
	"net/http"
)

type SSEHandler struct {
	hub *SSEHub
}

var _ http.Handler = (*SSEHandler)(nil)

func NewSSEHandler(hub *SSEHub) *SSEHandler {
	return &SSEHandler{
		hub: hub,
	}
}

// ServeHTTP implements http.Handler.
func (h *SSEHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "SSE not supported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")

	client := NewSSEClient()
	h.hub.Register(client)
	defer h.hub.Unregiter(client)

	for {
		select {
		case <-r.Context().Done():
			return
		case <-h.hub.Close():
			return
		case eventData := <-client.ReceiveQueuedEventData():
			fmt.Fprintf(w, "data: %s\n\n", string(eventData))
			flusher.Flush()
		}
	}
}
