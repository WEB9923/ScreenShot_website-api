import {JSX} from "react";
import {PuffLoader} from "react-spinners";

export default function Loader({loadingText}: {loadingText?: string}): JSX.Element {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center">
      <PuffLoader
        color="rgb(17,24,39,1)"
        loading
        size={65}
        speedMultiplier={1.5}
      />
      {loadingText ? <h2 className={"text-gray-500 font-bold text-center text-2xl"}>{loadingText}</h2> : null}
    </div>
  );
}
