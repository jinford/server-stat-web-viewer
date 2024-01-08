import { Stat } from "../types/stat";

type Props = {
  stat: Stat | undefined;
};

export const CPU = ({ stat }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-bold pb-8">CPU</h2>
      <div className="grid grid-cols-5 gap-8">
        <div className="card card-side bg-base-200 shadow-xl">
          <div className="card-body">
            <p className="text-base">System</p>
            <p className="text-4xl">{stat?.cpu.system}</p>
          </div>
        </div>
        <div className="card card-side bg-base-200 shadow-xl">
          <div className="card-body">
            <p className="text-base">User</p>
            <p className="text-4xl">{stat?.cpu.user}</p>
          </div>
        </div>
        <div className="card card-side bg-base-200 shadow-xl">
          <div className="card-body">
            <p className="text-base">Idle</p>
            <p className="text-4xl">{stat?.cpu.idle}</p>
          </div>
        </div>
        <div className="card card-side bg-base-200 shadow-xl">
          <div className="card-body">
            <p className="text-base">IOWait</p>
            <p className="text-4xl">{stat?.cpu.iowait}</p>
          </div>
        </div>
      </div>
    </>
  );
};
