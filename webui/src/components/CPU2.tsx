import { Stat } from "../types/stat";

type Props = {
  stat: Stat | undefined;
};

export const CPU = ({ stat }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-bold pb-8">CPU</h2>
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        <div className="col-span-1 row-span-2">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body flex justify-center items-center">
              <div
                className="radial-progress shadow-primary-500/50 text-primary text-center"
                style={{
                  "--value": stat?.cpu.percent,
                  "--size": "14rem",
                }}
                role="progressbar"
              >
                <p className="text-base-content text-4xl">
                  {stat?.cpu.percent.toPrecision(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body">
              <p className="text-base">System</p>
              <p className="text-4xl">{stat?.cpu.system}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body">
              <p className="text-base">User</p>
              <p className="text-4xl">{stat?.cpu.user}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body">
              <p className="text-base">Idle</p>
              <p className="text-4xl">{stat?.cpu.idle}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="card card-side bg-base-200 shadow-xl">
            <div className="card-body">
              <p className="text-base">IOWait</p>
              <p className="text-4xl">{stat?.cpu.iowait}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
