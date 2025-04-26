import { useState, useEffect } from "react";

interface Product {
  company: string;
  productPrice: number;
}

interface Filters {
  priceRange: [number, number];
  brands: string[];
}

interface FilterSectionProps {
  productCollection: Product[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  productCollection,
  filters,
  setFilters,
}) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [brands, setBrands] = useState<string[]>([]);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    // Extract unique brands from productCollection
    const uniqueBrands = [...new Set(productCollection.map((p) => p.company))];
    setBrands(uniqueBrands);

    // Set initial price range based on productCollection
    if (productCollection.length > 0) {
      const prices = productCollection.map((p) => p.productPrice);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [productCollection]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleLocalBrandChange = (brand: string) => {
    setLocalFilters((prev) => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return {
        ...prev,
        brands: newBrands,
        priceRange: prev.priceRange as [number, number],
      };
    });
  };

  let activePointer: "min" | "max" | null = null; // Track the active pointer

  const handleMouseMove = (event: MouseEvent) => {
    if (!activePointer) return; // Only update if a pointer is active

    const bar = document.querySelector(".relative.w-full.mt-4");
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const dragPosition = Math.max(
      0,
      Math.min(event.clientX - rect.left, rect.width)
    );
    const barWidth = rect.width;
    const value = Math.round(
      priceRange[0] +
        (dragPosition / barWidth) * (priceRange[1] - priceRange[0])
    );

    setLocalFilters((prev) => {
      if (activePointer === "min") {
        // Ensure the min pointer does not exceed max pointer minus 14
        return {
          ...prev,
          priceRange: [
            Math.min(value, prev.priceRange[1] - 14),
            prev.priceRange[1],
          ],
        };
      } else {
        // Ensure the max pointer does not go below min pointer plus 14
        return {
          ...prev,
          priceRange: [
            prev.priceRange[0],
            Math.max(value, prev.priceRange[0] + 14),
          ],
        };
      }
    });
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const barWidth = rect.width;
    const value = Math.round(
      priceRange[0] +
        (clickPosition / barWidth) * (priceRange[1] - priceRange[0])
    );

    const midValue =
      (localFilters.priceRange[0] + localFilters.priceRange[1]) / 2;
    activePointer = value <= midValue ? "min" : "max"; // Determine the active pointer

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    activePointer = null; // Reset the active pointer
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="p-4 theme_text select-none">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 theme_color">Price</h3>
        <div className="relative w-full mt-4" onMouseDown={handleMouseDown}>
          <div className="relative h-2 bg-gray-300 rounded">
            <div
              className="absolute h-2 bg-blue-500 rounded"
              style={{
                left: `${
                  ((localFilters.priceRange[0] - priceRange[0]) /
                    (priceRange[1] - priceRange[0])) *
                  100
                }%`,
                right: `${
                  100 -
                  ((localFilters.priceRange[1] - priceRange[0]) /
                    (priceRange[1] - priceRange[0])) *
                    100
                }%`,
              }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-pointer shadow-md"
              style={{
                left: `calc(${
                  ((localFilters.priceRange[0] - priceRange[0]) /
                    (priceRange[1] - priceRange[0])) *
                  100
                }% - 8px)`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-pointer shadow-md"
              style={{
                left: `calc(${
                  ((localFilters.priceRange[1] - priceRange[0]) /
                    (priceRange[1] - priceRange[0])) *
                  100
                }% - 8px)`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>Min: {localFilters.priceRange[0]}</span>
          <span>Max: {localFilters.priceRange[1]}</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 theme_color">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={localFilters.brands.includes(brand)}
              onChange={() => handleLocalBrandChange(brand)}
            />
            {brand}
          </label>
        ))}
      </div>
      <button
        className="theme_bg text-white px-4 py-2 rounded"
        onClick={() => setFilters(localFilters)}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSection;
