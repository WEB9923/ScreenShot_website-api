import {ChangeEvent, Fragment, JSX, SyntheticEvent} from "react";
import {RiScreenshot2Line} from "react-icons/ri";
import {FiLink2} from "react-icons/fi";
import Button from "./Button.tsx";
import {IState} from "../App.tsx";
import Toggler from "./Toggler.tsx";

export default function Form({handleChangeInput, handleChangeToggleMobile, handleChangeToggleFulWebsiteHeight, state, fetchData}:
{
  handleChangeInput: ({target}: ChangeEvent<HTMLInputElement>) => void;
  handleChangeToggleMobile: () => void;
  handleChangeToggleFulWebsiteHeight: () => void;
  state: IState;
  fetchData: (e: SyntheticEvent<HTMLFormElement>) => Promise<void | boolean>;
}): JSX.Element {
  return (
    <Fragment>
      <form
        onSubmit={fetchData}
        className={"w-full bg-gray-800 py-5 rounded-md flex flex-col justify-center px-4 border-2 border-gray-900 border-l-4 border-b-4"}
      >
        <div className="w-full relative h-14">
          <FiLink2
            size={24}
            className={"absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"}
          />
          <input
            value={state.inputValue}
            onChange={handleChangeInput}
            type="text"
            placeholder={"https://example.com?..."}
            className={"w-full h-full bg-gray-700 px-9 pr-[70px] text-[18px] caret-gray-500 rounded-md text-gray-500 placeholder:text-gray-500 border-2 border-transparent focus:border-gray-900 border-l-4 border-b-4 outline-none transition duration-300"}
          />
          <Button
            content={<RiScreenshot2Line size={24}/>}
            y={"-50%"}
            clickEvent={() => {}}
            classname={"absolute right-2 top-1/2 transform-none -translate-y-1/2 flex items-center justify-center h-[calc(48px-8px)] w-14 bg-gray-800 rounded-md text-gray-500"}
          />
        </div>
        <div className="pt-3 w-full">
          <Toggler
            isCheked={state.isMobile}
            change={handleChangeToggleMobile}
            title={"screenshot mobile version (iPhone 12 Pro)"}
          />
          <Toggler
            isCheked={state.isFullHeight}
            change={handleChangeToggleFulWebsiteHeight}
            title={"take screenshot full website height. (This may take longer)"}
          />
        </div>
      </form>
    </Fragment>
  );
}
