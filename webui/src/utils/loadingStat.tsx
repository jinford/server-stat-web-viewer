import { Stat } from "../types/stat";

export const loadingStat = (
  stat: Stat | undefined,
  child: JSX.Element
): JSX.Element => {
  return (
    <>
      {stat ? (
        child
      ) : (
        <div>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
    </>
  );
};
