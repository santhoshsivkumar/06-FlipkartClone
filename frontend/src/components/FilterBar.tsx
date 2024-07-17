const FilterBarItems = [
  "Electronics",
  "TVs & Appliances",
  "Men",
  "Women",
  "Baby & Kids",
  "Home & Furniture",
  "Sports, Books & More",
  "Flights",
  "Offer Zone",
];

const FilterBar = () => {
  return (
    <div className="px-4 h-10 text-xs overflow-y-scroll hidden lg:flex lg:text-sm theme_container gap-12  items-center justify-center theme_border shadow-md ">
      {FilterBarItems.map((item, index) => {
        return (
          <div className=" flex items-center justify-center gap-1 " key={index}>
            <span className="theme_text font-semibold " key={index}>
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
