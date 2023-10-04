import {JSX} from "react";

export default function ImageWithLoader({source}:
{
  source: string | undefined;
}): JSX.Element {
  return (
    <img
      src={source}
      alt="screenshoted url ERROR!"
      loading={"eager"}
      className={"rounded-md pointer-events-none mx-auto"}
    />
  );
}
