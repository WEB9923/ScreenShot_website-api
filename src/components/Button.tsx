import {motion} from "framer-motion";
import {JSX, ReactNode} from "react";
export default function Button({content, clickEvent, classname, y}:
{
  content: ReactNode;
  clickEvent: () => void;
  classname: string;
  y?: string;
}): JSX.Element {
  return (
    <motion.button
      initial={{y: y, scale: 1}}
      whileTap={{y: y, scale: 0.9}}
      transition={{duration: 0.08, type: "spring", stiffness: 350}}
      onClick={clickEvent}
      className={classname}
    >
      {content}
    </motion.button>
  );
}
