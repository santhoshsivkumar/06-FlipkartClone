import { MdDone } from "react-icons/md";

const Heading = (props: { serialNo: number; title: string }) => {
  return (
    <div className=" flex items-center font-semibold pb-2">
      <span className="theme_color p-[2px] theme px-2 rounded-sm text-xs">
        {props.serialNo}
      </span>
      <span className="pl-4 text-md text-gray-500">{props.title}</span>
      <span className="pl-2 theme_color">
        <MdDone />
      </span>
    </div>
  );
};

export default Heading;
