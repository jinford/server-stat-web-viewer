package main

import (
	"encoding/json"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/load"
	"github.com/shirou/gopsutil/v3/mem"
	"github.com/shirou/gopsutil/v3/process"
)

//go:generate go run github.com/gzuidhof/tygo@latest generate --config=stat_tygo.yaml

type Stat struct {
	Memory    MemoryStat  `json:"memory"`
	Swap      SwapStat    `json:"swap"`
	CPU       CPUStat     `json:"cpu"`
	LoadAvg   LoadAvgStat `json:"loadAvg"`
	Processes []Process   `json:"processes"`
}

type MemoryStat struct {
	Total     uint64 `json:"total"`
	Used      uint64 `json:"used"`
	Free      uint64 `json:"free"`
	Shared    uint64 `json:"shared"`
	Buffers   uint64 `json:"buffers"`
	Cached    uint64 `json:"cached"`
	Available uint64 `json:"available"`
}

type SwapStat struct {
	Total uint64 `json:"total"`
	Used  uint64 `json:"used"`
	Free  uint64 `json:"free"`
}

type CPUStat struct {
	CPU     string  `json:"cpu"`
	Percent float64 `json:"percent"`
	User    float64 `json:"user"`
	System  float64 `json:"system"`
	Idle    float64 `json:"idle"`
	Nice    float64 `json:"nice"`
	Iowait  float64 `json:"iowait"`
}

type LoadAvgStat struct {
	Load1  float64 `json:"load1"`
	Load5  float64 `json:"load5"`
	Load15 float64 `json:"load15"`
}

type Process struct {
	Pid           int32     `json:"pid"`
	Username      string    `json:"username"`
	Cmdline       string    `json:"cmdline"`
	CPUPercent    float64   `json:"cpuPercent"`
	MemoryPercent float32   `json:"memoryPercent"`
	Status        string    `json:"status"`
	CreateTime    time.Time `json:"createTime"`
}

func CollectStat() *Stat {
	memoryStat := must(mem.VirtualMemory())
	swapStat := must(mem.SwapMemory())
	cpuStat := must(cpu.Times(false))[0]
	loadAvgStat := must(load.Avg())

	processes := []Process{}
	for _, p := range must(process.Processes()) {
		username, err := p.Username()
		if err != nil {
			continue
		}

		cmdline, err := p.Cmdline()
		if err != nil {
			continue
		}

		cpuPercent, err := p.CPUPercent()
		if err != nil {
			continue
		}

		memoryPercent, err := p.MemoryPercent()
		if err != nil {
			continue
		}

		statuses, err := p.Status()
		if err != nil {
			continue
		}

		createTime, err := p.CreateTime()
		if err != nil {
			continue
		}

		processes = append(processes, Process{
			Pid:           p.Pid,
			Username:      username,
			Cmdline:       cmdline,
			CPUPercent:    cpuPercent,
			MemoryPercent: memoryPercent,
			Status:        statuses[0],
			CreateTime:    time.UnixMilli(createTime),
		})
	}

	return &Stat{
		Memory: MemoryStat{
			Total:     memoryStat.Total,
			Used:      memoryStat.Used,
			Free:      memoryStat.Free,
			Shared:    memoryStat.Shared,
			Buffers:   memoryStat.Buffers,
			Cached:    memoryStat.Cached,
			Available: memoryStat.Available,
		},
		Swap: SwapStat{
			Total: swapStat.Total,
			Used:  swapStat.Used,
			Free:  swapStat.Free,
		},
		CPU: CPUStat{
			CPU:     cpuStat.CPU,
			Percent: must(cpu.Percent(1*time.Second, false))[0],
			User:    cpuStat.User,
			System:  cpuStat.System,
			Idle:    cpuStat.Idle,
			Nice:    cpuStat.Nice,
			Iowait:  cpuStat.Iowait,
		},
		LoadAvg: LoadAvgStat{
			Load1:  loadAvgStat.Load1,
			Load5:  loadAvgStat.Load5,
			Load15: loadAvgStat.Load15,
		},
		Processes: processes,
	}
}

func (stat *Stat) ToJSON() []byte {
	b, err := json.Marshal(stat)
	if err != nil {
		panic(err)
	}
	return b
}

func must[T any](v T, err error) T {
	if err != nil {
		panic(err)
	}
	return v
}
