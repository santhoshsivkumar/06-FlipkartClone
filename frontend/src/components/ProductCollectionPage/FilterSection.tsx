const FilterSection = () => {
  return (
    <div className="p-4 theme_text ">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 theme_color">Price</h3>
        <input type="range" min="0" max="100" className="w-full" />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 theme_color">Brand</h3>
        <label className="block">
          <input type="checkbox" className="mr-2" /> Redmi
        </label>
        <label className="block">
          <input type="checkbox" className="mr-2" /> Realme
        </label>
        <label className="block">
          <input type="checkbox" className="mr-2" /> Poco
        </label>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 theme_color">Customer Rating</h3>
        <label className="block">
          <input type="radio" name="rating" className="mr-2" /> 4★ & above
        </label>
        <label className="block">
          <input type="radio" name="rating" className="mr-2" /> 3★ & above
        </label>
        <label className="block">
          <input type="radio" name="rating" className="mr-2" /> 2★ & above
        </label>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 theme_color">Availability</h3>
        <label className="block">
          <input type="checkbox" className="mr-2" /> In Stock
        </label>
      </div>
      <button className="theme_bg text-white px-4 py-2 rounded">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSection;
