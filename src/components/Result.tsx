import {AnimatePresence, motion} from "framer-motion";
import {ChangeEvent, Fragment, JSX} from "react";
import {IState} from "../App.tsx";
import Button from "./Button.tsx";
import {AiOutlineCloudDownload} from "react-icons/ai";
import {RiScreenshot2Line} from "react-icons/ri";
import * as React from "react";

export default function Result({state, reset, fileNameValue, handleChangeFileNameInput, showFileNameInput, setShowFileNameInput, downloadIMG}:
{
  state: IState | object;
  reset: () => void;
  fileNameValue: string;
  handleChangeFileNameInput: ({target}: ChangeEvent<HTMLInputElement>) => void;
  showFileNameInput: boolean;
  setShowFileNameInput: React.Dispatch<React.SetStateAction<boolean>>;
  downloadIMG: () => boolean | void
}): JSX.Element {
  return (
    <Fragment>
     <AnimatePresence>
       <div
         className="w-fit min-h-[350px] mx-auto bg-gray-800 rounded-md py-5 px-4 mb-5 select-none border-2 border-gray-900 border-b-4 border-l-4"
       >
        <motion.div
          initial={{y: 70}}
          animate={{y: 0}}
          transition={{duration: 0.3, type: "spring", stiffness: 130}}
          className="rounded-md h-auto w-full"
        >
          <img
            src={state?.data?.screenshot_url}
            alt="screenshoted url ERROR!"
            loading={"lazy"}
            className={"rounded-md pointer-events-none mx-auto"}
          />
          <div className="pt-6 flex flex-col gap-3">
            <Button
              content={
                <>
                  <AiOutlineCloudDownload size={25}/>
                  download
                </>
              }
              clickEvent={() => setShowFileNameInput(true)}
              classname={"w-full h-12 rounded-md bg-green-800 font-bold text-gray-400 text-[20px] flex items-center justify-center gap-2"}
            />
            <AnimatePresence>
              {showFileNameInput ?
                <motion.div
                  initial={{scaleY: 0}}
                  animate={{scaleY: 1}} exit={{scaleY: 0}}
                  transition={{duration: 0.3, type: "spring", stiffness: 120}}
                  className="py-5 bg-gray-700 px-4 rounded-md origin-top"
                >
                  <input
                    value={fileNameValue}
                    onChange={handleChangeFileNameInput}
                    type="text"
                    placeholder={"enter file name as you want to save..."}
                    className={"w-full h-10 rounded-md bg-gray-800 border-2 border-gray-900 border-l-4 border-b-4 outline-none px-2 caret-gray-500 text-gray-500 font-medium text-[16px]"}
                  />
                  <Button
                    content={"save"}
                    clickEvent={downloadIMG}
                    classname={"w-full h-10 mt-2 rounded-md bg-green-800 text-gray-400 font-bold flex items-center justify-center"}
                  />
                </motion.div> : null
              }
            </AnimatePresence>
            <Button
              content={
                <>
                  <RiScreenshot2Line size={25}/>
                  new screenshot
                </>
              }
              clickEvent={reset}
              classname={"w-full h-12 rounded-md bg-gray-900 text-gray-400 text-[20px] font-bold flex items-center justify-center gap-2"}
            />
          </div>
        </motion.div>
       </div>
     </AnimatePresence>
    </Fragment>
  );
}
