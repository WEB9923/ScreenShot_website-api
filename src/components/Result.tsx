import {AnimatePresence, motion} from "framer-motion";
import {Fragment, JSX} from "react";
import {IState} from "../App.tsx";

export default function Result({state}:
{
  state: IState | object;
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
          <div className="pt-4">
            <button>download</button>
          </div>
        </motion.div>
       </div>
     </AnimatePresence>
    </Fragment>
  );
}
