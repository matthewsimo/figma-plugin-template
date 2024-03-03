import { PropsWithChildren, useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LogData = ({ data }: { data: any }) => (
  <pre>{JSON.stringify(data, undefined, 2)}</pre>
);

export const LogElement = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => console.log(ref?.current), []);
  return <div ref={ref}>{children}</div>;
};
