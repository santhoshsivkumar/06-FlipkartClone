interface Section {
  title: string;
  items: string[];
  active: string;
  setActive: any;
}

const UtilityComponent = ({ title, items, active, setActive }: Section) => {
  return (
    <div className="flex flex-col theme_border border-b-[1px]">
      <a className="flex flex-row gap-4 p-4 w-full items-center theme_hover cursor-pointer">
        <i className="fa fa-user theme_color" aria-hidden="true"></i>
        <h2 className="font-semibold">{title}</h2>
      </a>
      <div className="flex flex-col justify-center">
        {items.map((item, index) => (
          <a
            href="#"
            key={index}
            className={`${
              active === item ? "profile_item_bg" : ""
            } theme_hover_bg px-[2.9rem] py-3 text-sm`}
            onClick={() => setActive(item)}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default UtilityComponent;
