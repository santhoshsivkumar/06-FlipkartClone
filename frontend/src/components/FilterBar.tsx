import { FilterBarItems } from "../static/Data";
const FilterBar = () => {
  return (
    <div className="px-4 h-10 theme_container gap-12 flex items-center justify-center theme_border shadow-md border-b">
      {FilterBarItems.map((item, index) => {
        return (
          <div className=" flex items-center justify-center gap-1" key={index}>
            <span className="theme_text text-sm font-semibold" key={index}>
              {item}
            </span>
            <i
              className="fa fa-angle-down mt-1 text-gray-400"
              aria-hidden="true"
            ></i>
          </div>
        );
      })}
    </div>
  );
};

export default FilterBar;
