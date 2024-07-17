import { useState } from "react";

const SortByItems = [
  "Sort By",
  "Relevance",
  "Popularity",
  "Price -- Low to High",
  "Price -- High to Low",
  "Newest First",
];
interface SortByProps {
  setSortOption: (option: string) => void;
}

const SortBy = ({ setSortOption }: SortByProps) => {
  const [active, setActive] = useState<string>("Relevance");

  return (
    <div className="border-b-[1px] theme_text theme_border hidden lg:block ">
      <div className="flex gap-4 pt-4 pl-4 overflow-x-auto">
        {SortByItems.map((item, index) => {
          return (
            <span
              key={index}
              onClick={() => {
                if (index !== 0) {
                  setActive(item);
                  setSortOption(item);
                }
              }}
              className={`${
                active === item
                  ? "theme_color cursor-pointer"
                  : "cursor-pointer"
              } ${index === 0 && "font-bold cursor-default"} text-sm`}
            >
              <span>{item}</span>
              <span
                className={`mt-2 h-[2px] flex ${
                  active === item ? "theme_bg" : ""
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
