import { useState, useEffect } from "react";
import p1 from "../../assets/p1.webp";
import p2 from "../../assets/p2.webp";
import p3 from "../../assets/p3.webp";
import p4 from "../../assets/p4.webp";
import p6 from "../../assets/p6.webp";
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [p1, p2, p3, p4, p6];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`theme_container  hover:scale-[1.009] h-64 p-4 shadow-sm rounded-sm justify-center flex items-center relative`}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover rounded-sm "
          />
        </div>
      ))}
      <button
        title="Left"
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 theme_text theme_container px-3 rounded-r-lg py-8 hover:bg-opacity-75"
      >
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button
        title="Right"
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 theme_text theme_container px-3 rounded-l-lg py-8  hover:bg-opacity-75"
      >
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </button>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mb-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
