import {JSX} from "react";

export default function Toggler({isChecked, change, title}:
{
  isChecked: boolean;
  change: () => void;
  title: string;
}): JSX.Element {
  return (
    <div className="py-2 flex items-center md:w-fit w-full gap-3">
      <p className={"text-gray-500 text-[17px] flex-1"}>{title}</p>
      <input
        checked={isChecked}
        onChange={change}
        type="checkbox"
        className={"w-[50px] h-7 rounded-full border-none outline-none bg-gray-700 appearance-none relative before:absolute before:w-6 before:h-6 before:rounded-full before:bg-gray-800 before:top-1/2 before:transform before:-translate-y-1/2 before:left-1 checked:before:bg-green-900 checked:bg-gray-900 checked:before:left-[calc(50px-24px-4px)] before:transition-all before:duration-300 transition-all duration-500"}
      />
    </div>
  );
}
