import AppliancesImg from "../assets/Appliances.png";
import BeautyImg from "../assets/BeautyAndMore.webp";
import ElectronicsImg from "../assets/Electronics.webp";
import FashionImg from "../assets/Fashion.webp";
import GroceryImg from "../assets/Grocery.webp";
import HomeAndFurnitures from "../assets/HomeAndFurnitures.png";
import MobilesImg from "../assets/Mobiles.webp";
import TravelImg from "../assets/Travel.webp";
import TwoWheelersImg from "../assets/TwoWheelers.webp";

//export const siteURL = "https://mern-app-api-rust.vercel.app";
export const siteURL = "http://localhost:5555";

export const HomePageImages = [
  { img: GroceryImg, title: "Grocery" },
  { img: MobilesImg, title: "Mobiles" },
  { img: FashionImg, title: "Fashion" },
  { img: ElectronicsImg, title: "Electronics" },
  { img: HomeAndFurnitures, title: "Home & Furnitures" },
  { img: AppliancesImg, title: "Appliances" },
  { img: TravelImg, title: "Travel" },
  { img: BeautyImg, title: "Beauty, Toys & More" },
  { img: TwoWheelersImg, title: "Two Wheelers" },
];
export const FilterBarItems = [
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

export const SortByItems = [
  "Sort By",
  "Relevance",
  "Popularity",
  "Price -- Low to High",
  "Price -- High to Low",
  "Newest First",
];
