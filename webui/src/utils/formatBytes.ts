import prettyBytes from "pretty-bytes";

export const formatBytes = (value: number | undefined): string => {
  return prettyBytes(value ?? 0, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};