import { Stat } from "../types/stat";
import { BytesBox, PercentBox } from "./Box";

type Props = {
  stat: Stat | undefined;
};

export const Memory = ({ stat }: Props) => {
  const ramPercent = stat
    ? (stat.memory.used / stat.memory.total) * 100
    : undefined;

  const buffersAndCached = stat
    ? stat.memory.buffers + stat.memory.cached
    : undefined;

  return (
    <div>
      <h2 className="text-2xl font-bold text-center pb-8">Memory</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="col-span-1 row-span-2">
          <PercentBox value={ramPercent} />
        </div>
        <div className="col-span-1">
          <BytesBox title="Total" value={stat?.memory.total} />
        </div>
        <div className="col-span-1">
          <BytesBox title="Used" value={stat?.memory.used} />
        </div>
        <div className="col-span-1">
          <BytesBox title="Free" value={stat?.memory.free} />
        </div>
        <div className="col-span-1">
          <BytesBox title="Buffres / Cached" value={buffersAndCached} />
        </div>
      </div>
    </div>
  );
};
