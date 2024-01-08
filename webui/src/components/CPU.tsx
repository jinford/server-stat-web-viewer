import { Stat } from "../types/stat";
import { NumberBox, PercentBox } from "./Box";

type Props = {
  stat: Stat | undefined;
};

export const CPU = ({ stat }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center pb-8">CPU</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="col-span-1 row-span-2">
          <PercentBox value={stat?.cpu.percent} />
        </div>
        <div className="col-span-1">
          <NumberBox title="System" value={stat?.cpu.system} />
        </div>
        <div className="col-span-1">
          <NumberBox title="User" value={stat?.cpu.user} />
        </div>
        <div className="col-span-1">
          <NumberBox title="Idle" value={stat?.cpu.idle} />
        </div>
        <div className="col-span-1">
          <NumberBox title="IOWait" value={stat?.cpu.iowait} />
        </div>
      </div>
    </div>
  );
};
