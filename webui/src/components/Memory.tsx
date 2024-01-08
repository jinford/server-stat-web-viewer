import { Stat } from "../types/stat";
import { formatBytes } from "../utils/formatBytes";

type Props = {
  stat: Stat | undefined;
};

export const Memory = ({ stat }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-bold pb-8">Memory</h2>
      <div className="grid grid-cols-5 gap-8">
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-base">Total</p>
            <p className="text-4xl">{formatBytes(stat?.memory.total)}</p>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-base">Used</p>
            <p className="text-4xl">{formatBytes(stat?.memory.used)}</p>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-base">Free</p>
            <p className="text-4xl">{formatBytes(stat?.memory.free)}</p>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-base">Buffres</p>
            <p className="text-4xl">{formatBytes(stat?.memory.buffers)}</p>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-base">Cached</p>
            <p className="text-4xl">{formatBytes(stat?.memory.cached)}</p>
          </div>
        </div>
      </div>
    </>
  );
};
