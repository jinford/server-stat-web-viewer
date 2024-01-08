import { Stat } from "../types/stat";
import { formatBytes } from "../utils/formatBytes";

type Props = {
  stat: Stat | undefined;
};

export const Swap = ({ stat }: Props) => {
  const swapPercent = stat
    ? ((stat.swap.used / stat.swap.total) * 100).toPrecision(2)
    : 0;

  return (
    <>
      <h2 className="text-2xl font-bold pb-8">Swap</h2>
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        <div className="col-span-1 row-span-2">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body flex justify-center items-center">
              <div
                className="radial-progress text-primary"
                style={{ "--value": swapPercent, "--size": "14rem" }}
                role="progressbar"
              >
                <p className="text-base-content text-4xl">{swapPercent}%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <p className="text-base">Total</p>
              <p className="text-4xl">{formatBytes(stat?.swap.total)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <p className="text-base">Used</p>
              <p className="text-4xl">{formatBytes(stat?.swap.used)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <p className="text-base">Free</p>
              <p className="text-4xl">{formatBytes(stat?.swap.free)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
