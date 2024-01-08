import { useCallback, useRef } from "react";

export function useEventSource() {
  const eventSourceRef = useRef<EventSource | null>(null);

  const connectToEventSource = useCallback(
    (eventSourceUrl: string, onMessage: (data: any) => void) => {
      if (eventSourceRef.current === null) {
        const eventSource = new EventSource(eventSourceUrl);

        eventSource.onmessage = function (msg) {
          onMessage(msg.data);
        };

        eventSourceRef.current = eventSource;
        return;
      }
    },
    []
  );

  const closeEventSource = useCallback(() => {
    if (eventSourceRef.current !== null) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  return {
    connectToEventSource,
    closeEventSource,
  };
}
