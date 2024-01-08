import { Loader } from "./Loader";
import { formatBytes } from "../utils/formatBytes";

type Props = {
  children: React.ReactNode;
};

const Box = ({ children }: Props) => {
  return (
    <>
      <div className="card card-side bg-base-200 shadow-xl">
        <div className="card-body text-center">{children}</div>
      </div>
    </>
  );
};

type PercentBoxProps = {
  value: number | undefined;
};

export const PercentBox = ({ value }: PercentBoxProps) => {
  return (
    <>
      <Box>
        <div className="flex justify-center items-center">
          <div
            className="radial-progress shadow-primary-500/50 text-primary text-center"
            style={
              {
                "--value": value,
                "--size": "14rem",
              } as React.CSSProperties
            }
            role="progressbar"
          >
            {value !== undefined ? (
              <p className="text-base-content text-4xl">
                {value.toPrecision(2)}%
              </p>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

type NumberBoxProps = {
  title: string;
  value: number | undefined;
};

export const NumberBox = ({ title, value }: NumberBoxProps) => {
  return (
    <>
      <Box>
        <p className="text-base">{title}</p>
        {value !== undefined ? <p className="text-4xl">{value}</p> : <Loader />}
      </Box>
    </>
  );
};

type BytesBoxProps = {
  title: string;
  value: number | undefined;
};

export const BytesBox = ({ title, value }: BytesBoxProps) => {
  return (
    <>
      <Box>
        <p className="text-base">{title}</p>
        {value !== undefined ? (
          <p className="text-4xl">{formatBytes(value)}</p>
        ) : (
          <Loader />
        )}
      </Box>
    </>
  );
};
