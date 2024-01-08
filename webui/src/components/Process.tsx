import { Stat } from "../types/stat";

type Props = {
  stat: Stat | undefined;
};

export const Process = ({ stat }: Props) => {
  const tableData = stat
    ? stat.processes
        .sort((a, b) => b.cpuPercent - a.cpuPercent)
        .map((value, index) => {
          return (
            <tr>
              <th>{index + 1}</th>
              <td>{value.pid}</td>
              <td>{value.username}</td>
              <td>{value.cpuPercent.toPrecision(2)}</td>
              <td>{value.memoryPercent.toPrecision(2)}</td>
              <td>{value.cmdline}</td>
            </tr>
          );
        })
    : [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-center pb-8">Process</h2>
      <div className="">
        <div className="card card-side bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>PID</th>
                    <th>USER</th>
                    <th>%CPU</th>
                    <th>%MEM</th>
                    <th>COMMAND</th>
                  </tr>
                </thead>
                <tbody>{tableData}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
