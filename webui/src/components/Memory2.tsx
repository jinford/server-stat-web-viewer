import { Stat } from "../types/stat";
import { formatBytes } from "../utils/formatBytes";

type Props = {
  stat: Stat | undefined;
};

export const Memory = ({ stat }: Props) => {
  const ramPercent = stat
    ? ((stat.memory.used / stat.memory.total) * 100).toPrecision(2)
    : 0;

  return (
    <>
      <h2 className="text-2xl font-bold pb-8">Memory</h2>
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        <div className="col-span-1 row-span-2">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body flex justify-center items-center">
              <div
                className="radial-progress shadow-primary-500/50 text-primary text-center"
                style={{ "--value": ramPercent, "--size": "14rem" }}
                role="progressbar"
              >
                <p className="text-base-content text-4xl">{ramPercent}%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <p className="text-base">Total</p>
              <p className="text-4xl">{formatBytes(stat?.memory.total)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <p className="text-base">Used</p>
              <p className="text-4xl">{formatBytes(stat?.memory.used)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <p className="text-base">Free</p>
              <p className="text-4xl">{formatBytes(stat?.memory.free)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <p className="text-base">Buffres</p>
              <p className="text-4xl">{formatBytes(stat?.memory.buffers)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <p className="text-base">Cached</p>
              <p className="text-4xl">{formatBytes(stat?.memory.cached)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
