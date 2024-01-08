// Code generated by tygo. DO NOT EDIT.

//////////
// source: stat.go

export interface Stat {
  memory: MemoryStat;
  swap: SwapStat;
  cpu: CPUStat;
  loadAvg: LoadAvgStat;
  processes: Process[];
}
export interface MemoryStat {
  total: number /* uint64 */;
  used: number /* uint64 */;
  free: number /* uint64 */;
  shared: number /* uint64 */;
  buffers: number /* uint64 */;
  cached: number /* uint64 */;
  available: number /* uint64 */;
}
export interface SwapStat {
  total: number /* uint64 */;
  used: number /* uint64 */;
  free: number /* uint64 */;
}
export interface CPUStat {
  cpu: string;
  percent: number /* float64 */;
  user: number /* float64 */;
  system: number /* float64 */;
  idle: number /* float64 */;
  nice: number /* float64 */;
  iowait: number /* float64 */;
}
export interface LoadAvgStat {
  load1: number /* float64 */;
  load5: number /* float64 */;
  load15: number /* float64 */;
}
export interface Process {
  pid: number /* int32 */;
  username: string;
  cmdline: string;
  cpuPercent: number /* float64 */;
  memoryPercent: number /* float32 */;
  status: string;
  createTime: any /* time.Time */;
}
