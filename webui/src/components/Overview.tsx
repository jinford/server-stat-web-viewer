import ReactApexChart from "react-apexcharts";

import { Stat } from "../types/stat";
import { formatBytes } from "../utils/formatBytes";

type Props = {
  stat: Stat | undefined;
};

export const Overview = ({ stat }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-bold pb-8">Overview</h2>
      <div className="grid grid-cols-3 gap-8">
        <RAMCard stat={stat} />
        <CPUCard stat={stat} />
        <DISKCard stat={stat} />
      </div>
    </>
  );
};

const RAMCard = ({ stat }: Props) => {
  const ramPercent = stat
    ? ((stat.memory.used / stat.memory.total) * 100).toPrecision(2)
    : 0;

  return (
    <>
      <div className="card card-side bg-base-200 shadow-xl">
        <div className="card-body">
          <p className="text-base">RAM</p>
          <p className="text-5xl">{formatBytes(stat?.memory.used)}</p>
          <p className="text-sm  text-primary">
            / {formatBytes(stat?.memory.total)}
          </p>
        </div>
        <div className="card-body flex justify-center items-center">
          <div
            className="radial-progress text-info text-xl"
            style={{ "--value": ramPercent, "--size": "10rem" }}
            role="progressbar"
          >
            {ramPercent}%
          </div>
        </div>
      </div>
    </>
  );
};

const CPUCard = ({ stat }: Props) => {
  return (
    <>
      <div className="card card-side bg-base-200 shadow-xl">
        <div className="card-body">
          <p className="text-base">CPU</p>
          <p className="text-5xl">{stat?.cpu.user}</p>
          <p className="text-sm  text-primary">
            / {formatBytes(stat?.memory.total)}
          </p>
        </div>
        <div className="card-body flex justify-center items-center">
          <div
            className="radial-progress text-info text-xl"
            style={{
              "--value": stat?.cpu.percent.toPrecision(2),
              "--size": "10rem",
            }}
            role="progressbar"
          >
            {stat?.cpu.percent.toPrecision(2)}%
          </div>
        </div>
      </div>
    </>
  );
};

const DISKCard = ({ stat }: Props) => {
  const state = {
    series: [
      {
        data: [
          stat ? stat.loadAvg.load1 : 0,
          stat ? stat.loadAvg.load5 : 0,
          stat ? stat.loadAvg.load15 : 0,
        ],
      },
    ],
    options: {
      chart: {
        id: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          barHeight: "50%",
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ["load1", "load5", "load15"],
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <p className="text-base">Load Average</p>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
          />
        </div>
      </div>
    </>
  );
};
