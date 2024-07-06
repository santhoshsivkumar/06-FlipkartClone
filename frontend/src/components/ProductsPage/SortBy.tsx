import { useState } from "react";
import { SortByItems } from "../../static/Data";

const SortBy = ({ collection }: any) => {
  const [active, setActive] = useState<string>("Relevance");

  return (
    <div className="border-b-[0.5px] theme_text theme_border">
      <div className="pl-4 font-md font-semibold">
        Showing 1 – 24 of 7,030 results for {collection}
      </div>
      <div className="flex gap-4 pt-4 pl-4 ">
        {SortByItems.map((item, index) => {
          return (
            <span
              key={index}
              onClick={() => {
                if (index != 0) setActive(item);
              }}
              className={`${
                index !== 0
                  ? active === item
                    ? "theme_color cursor-pointer "
                    : " cursor-pointer "
                  : "font-semibold"
              }  text-sm`}
            >
              <span>{item}</span>
              <span
                className={`mt-2 h-[2px] flex ${
                  active === item && index !== 0 && "theme_bg "
                } text-sm`}
              ></span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SortBy;
