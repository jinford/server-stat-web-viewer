package main

import (
	"sync"

	"github.com/google/uuid"
)

type SSEClient struct {
	id              string
	eventDataStream chan []byte

	once *sync.Once
}

func NewSSEClient() *SSEClient {
	return &SSEClient{
		id:              uuid.NewString(),
		eventDataStream: make(chan []byte),
		once:            &sync.Once{},
	}
}

func (c *SSEClient) ReceiveQueuedEventData() <-chan []byte {
	return c.eventDataStream
}

func (c *SSEClient) TryQueueEventData(eventData []byte) bool {
	select {
	case c.eventDataStream <- eventData:
		return true
	default:
		return false
	}
}

func (c *SSEClient) Close() {
	c.once.Do(func() {
		close(c.eventDataStream)
	})
}
