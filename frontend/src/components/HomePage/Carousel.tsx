import { useState, useEffect } from "react";
const carouselSlides = [
  "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2Fp1.webp?alt=media&token=9d20b154-4db0-4b76-a660-8eef616673be",
  "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2Fp2.webp?alt=media&token=a41fb09b-c278-46ea-897e-185066564ae4",
  "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2Fp3.webp?alt=media&token=145679f2-fdda-45b1-b9c1-ab5531e2f1fd",
  "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2Fp4.webp?alt=media&token=3433170f-219b-4c8d-a1ce-399d67f162cc",
  "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2Fp6.webp?alt=media&token=761871ad-adce-4e0a-96e4-42d97bf23b1e",
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselSlides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`theme_container h-64 p-4 shadow-sm rounded-sm justify-center flex items-center relative`}
    >
      {carouselSlides.map((slide, index) => (
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
        {carouselSlides.map((_, index) => (
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
