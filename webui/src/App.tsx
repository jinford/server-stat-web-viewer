import { useEffect, useState } from "react";

import { Stat } from "./types/stat";
import { useEventSource } from "./useEventSource";
import { Memory } from "./components/Memory2";
import { Swap } from "./components/Swap2";
import { CPU } from "./components/CPU2";
import { Process } from "./components/Process";

import "./App.css";

function App() {
  const [stat, setStat] = useState<Stat>();
  const { connectToEventSource, closeEventSource } = useEventSource();

  useEffect(() => {
    const sseAPIURL = `http://localhost:8080/api/sse`;
    const onMessage = (data: any) => {
      setStat(JSON.parse(data) as Stat);
    };

    connectToEventSource(sseAPIURL, onMessage);
    return () => {
      closeEventSource();
    };
  }, [connectToEventSource, closeEventSource]);

  return (
    <>
      <div className="container mx-auto py-12">
        <div className="mb-24">
          <CPU stat={stat} />
        </div>
        <div className="mb-24">
          <Memory stat={stat} />
        </div>
        <div className="mb-24">
          <Swap stat={stat} />
        </div>
        <div className="mb-24">
          <Process stat={stat} />
        </div>
      </div>
    </>
  );
}

export default App;
