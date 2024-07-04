import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { domainURL } from "../static";
import defaultImg from "../../public/Default_Img.jpg";
import { GetImageURL } from "../GetImageURL";
import Loading from "../components/Loading";
import "../styles/styles.css";
interface Product {
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: "";
}
const ProductDetails = () => {
  const [product, setProduct] = useState<Product>({
    productName: "",
    productPrice: 0,
    productDescription: "",
    productImage: "",
  });
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${domainURL}/products/details/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [id]);
  return (
    <div className="theme min-h-[100vh]">
      <div className="px-4 h-10 theme_container theme_text flex items-center justify-center theme_border shadow-md border-b">
        header
      </div>

      {!loading ? (
        <div className="lg:mx-6 p-4 theme_container">
          <div className={`flex lg:flex-row flex-col `}>
            {/* left */}
            <div
              className={`lg:w-[37.3%] h-[65vh] w-full contents lg:flex flex-col  lg:sticky top-[4.5rem]`}
            >
              <div
                className={`theme_border border-[1px] flex flex-col-reverse lg:flex-row h-[100%]`}
              >
                <div
                  className={` lg:w-[15%] lg:border-r-[1px] theme_border lg:border-t-0 border-t-[1px]`}
                >
                  <div className={`h-full p-6`}></div>
                </div>
                <div className=" lg:w-[85%] h-full p-4 justify-center items-center flex">
                  <img
                    src={
                      product.productImage
                        ? GetImageURL(product.productImage)
                        : defaultImg
                    }
                    alt=""
                    className="lg:size-full md:max-h-96 md:max-w-96 hover:shadow-rounded-sm border hover:scale-[1.008]"
                  />
                </div>
              </div>
              <div className={`lg:ml-[4.7rem] flex gap-2 p-4`}>
                <button className=" w-3/6 py-2 px-4 text-sm text-white theme_btn font-semibold">
                  ADD TO CART
                </button>
                <button className="w-3/6 py-2 px-4 text-white text-sm theme_btn font-semibold">
                  BUY NOW
                </button>
              </div>
            </div>

            {/* right */}
            <div
              className={`theme_container theme_text w-full lg:w-[62.3%] px-8`}
            >
              <div className="text-lg w-full"> {product.productName}</div>
              <div className="text-[12px] flex gap-4 py-2 text-gray-400 font-semibold">
                <p className="bg-green-600 text-white w-[3rem] rounded-sm px-4  flex gap-2 justify-center items-center">
                  4.2
                  <i className="fa fa-star " aria-hidden="true"></i>
                </p>
                <p className="text-sm">37,446 Ratings & 1,758 Reviews</p>
              </div>
              <div className="text-sm font-semibold text-green-700">
                Extra ₹{(5 / 100) * product.productPrice} off
              </div>
              <div className=" flex gap-4 items-center">
                <span className="text-3xl font-bold ">
                  ₹{product.productPrice}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  ₹{(30 / 100) * product.productPrice}
                </span>
                <span className="text-xl font-semibold text-green-600">
                  30% off
                </span>
              </div>
              <div className="mt-4 gap-2 flex-col flex">
                <span className="text-md font-bold ">Available offers</span>
                <div className="text-sm">
                  <i
                    className="fa fa-tag text-green-600 mr-2"
                    aria-hidden="true"
                  ></i>
                  <span className="font-semibold">Bank Offer</span> Get ₹50
                  Instant Discount on first Flipkart UPI transaction on order of
                  ₹200 and above{" "}
                  <span className="theme_color font-semibold">T&C</span>
                </div>
                <div className="text-sm">
                  <i
                    className="fa fa-tag text-green-600 mr-2"
                    aria-hidden="true"
                  ></i>
                  <span className="font-semibold">Bank Offer</span> 5% Cashback
                  on Flipkart Axis Bank Card
                  <span className="theme_color font-semibold"> T&C</span>
                </div>
                <div className="text-sm">
                  <i
                    className="fa fa-tag text-green-600 mr-2"
                    aria-hidden="true"
                  ></i>
                  <span className="font-semibold">Special Price</span> Get extra
                  ₹5500 off (price inclusive of cashback/coupon)
                  <span className="theme_color font-semibold"> T&C</span>
                </div>
                <div className="text-sm">
                  <i
                    className="fa fa-tag text-green-600 mr-2"
                    aria-hidden="true"
                  ></i>
                  <span className="font-semibold">Partner Offer</span> Sign-up
                  for Flipkart Pay Later & get free Times Prime Benefits worth
                  ₹20,000*
                  <span className="theme_color font-semibold"> T&C</span>
                </div>
              </div>
              <div className="w-full mt-4 flex flex-col">
                <span className="font-bold text-md">Description</span>
                {product.productDescription}
              </div>
              <div className="w-full mt-4 flex flex-col">
                <span className="font-bold text-md">Specification</span>
                Flipkart Explore Plus Search for products, brands and more
                Become a Seller Cart Electronics TVs & Appliances Men Women Baby
                & Kids Home & Furniture Sports, Books & More Flights Offer Zone
                REDMI 12 5G (Pastel Blue, 128 GB) ADD TO CART BUY NOW
                HomeMobiles & AccessoriesMobilesREDMI Mobiles REDMI 12 5G
                (Pastel Blue, 128 GB) (6 GB RAM) Compare Share REDMI 12 5G
                (Pastel Blue, 128 GB) (6 GB RAM) 4.237,446 Ratings & 1,758
                Reviews Extra ₹5500 off ₹12,499₹17,99930% off i Available offers
                Bank OfferGet ₹50 Instant Discount on first Flipkart UPI
                transaction on order of ₹200 and aboveT&C Bank Offer5% Cashback
                on Flipkart Axis Bank CardT&C Special PriceGet extra ₹5500 off
                (price inclusive of cashback/coupon)T&C Partner OfferSign-up for
                Flipkart Pay Later & get free Times Prime Benefits worth
                ₹20,000*Know More View 7 more offers Buy without Exchange
                ₹12,499 Buy with Exchange up to ₹8,850 off Enter pincode to
                check if exchange is available 1 Year Manufacturer Warranty for
                Phone and 6 Months Warranty for In the Box AccessoriesKnow More
                Color Storage 128 GB 256 GB RAM 4 GB 6 GB 8 GB Delivery Enter
                Delivery Pincode CheckEnter pincode Delivery by7 Jul,
                Sunday|Free₹40? if ordered before 9:55 PM View Details
                Highlights 6 GB RAM | 128 GB ROM | Expandable Upto 1 TB 17.25 cm
                (6.79 inch) Full HD+ Display 50MP + 2MP | 8MP Front Camera 5000
                mAh Battery Snapdragon 4 Gen 2 Processor Easy Payment Options No
                cost EMI starting from ₹2,084/month Cash on Delivery Net banking
                & Credit/ Debit/ ATM card View Details Seller MTAILMODEECOM4.2 7
                Days Service Center Replacement/Repair? GST invoice available?
                See other sellers Description Redmi 12 5G mobile comes with a 90
                Hz refresh rate 6.79-inch touchscreen display offering a
                resolution of 2460x1080 pixels (FHD+). The display sports
                Gorilla Glass for protection. Redmi 12 5G is powered by an
                octa-core Qualcomm Snapdragon 4 Gen 2 processor. It comes with
                8GB RAM. The Redmi 12 5G runs Android 13 and is powered by a
                5000mAh non-removable battery. The Redmi 12 5G supports
                proprietary fast charging. Specifications General In The Box
                Handset, 22.5W Charger, USB Type-C Cable, Sim Eject Tool,
                Protective Case, Quick Start Guide, Warranty Card Model Number
                MZB0EQGIN Model Name 12 5G Color Pastel Blue Browse Type
                Smartphones SIM Type Dual Sim Hybrid Sim Slot Yes Touchscreen
                Yes OTG Compatible Yes Quick Charging Yes SAR Value SAR Limit:
                1.6 W/kg, Head SAR: 0.867 W/kg, Body SAR: 0.867 W/kg Display
                Features Display Size 17.25 cm (6.79 inch) Resolution 2460 x
                1080 Pixels Resolution Type Full HD+ GPU Adreno Other Display
                Features 90Hz Refresh Rate, 240Hz Touch Sampling Rate, 550nits
                Peak Brightness Os & Processor Features Operating System Android
                13 Processor Brand Snapdragon Processor Type Snapdragon 4 Gen 2
                Processor Core Octa Core Primary Clock Speed 2.2 GHz Secondary
                Clock Speed 2 GHz Operating Frequency 2G GSM: B2/B3/B5/B8, 3G
                WCDMA: B1/B5/B8, 4G LTE TDD: B40/B41, 4G LTE FDD: B1/B3/B5/B8,
                5G SA: N1/N3/N5/N8/N28/N40/N78, 5G NSA: N1/N3/N8/N40/N78 Memory
                & Storage Features Internal Storage 128 GB RAM 6 GB Expandable
                Storage 1 TB Memory Card Slot Type Hybrid Slot Call Log Memory
                Yes Camera Features Primary Camera Available Yes Primary Camera
                50MP + 2MP Primary Camera Features Dual Camera Setup: 50MP Main
                Camera (f/1.8 Aperture, 1.28um(4-in-1 Super Pixel)) + 2MP
                Portrait Camera, Camera Features: Portrait, Night, Video, 50MP
                Mode, Google Lens, HDR, Voice Shutter, Tilt-Shift, Timed Burst,
                Timelapse, Timer, Video Features: FHD Video Recording, Timelapse
                Secondary Camera Available Yes Secondary Camera 8MP Front Camera
                Secondary Camera Features Front Camera: 8MP Camera (f/2.0
                Aperture), Features: Portrait Mode, Front Video Recording, Palm
                Shutter, Voice Shutter, Movie Frame, Timelapse, Beautify Flash
                Rear Flash HD Recording Yes Full HD Recording Yes Video
                Recording Yes Video Recording Resolution Rear Camera: 1080p (at
                30fps), 720p (at 30fps)|Front Camera: 1080p (at 30fps), 720p (at
                30fps) Digital Zoom Upto 10X Frame Rate 90 Hz fps Image Editor
                Yes Dual Camera Lens Primary Camera Call Features Call Wait/Hold
                Yes Conference Call Yes Hands Free Yes Call Divert Yes Phone
                Book Yes Call Timer Yes Speaker Phone Yes Call Records Yes
                Connectivity Features Network Type 5G, 4G VOLTE, 4G, 3G, 2G
                Supported Networks 5G, 4G VoLTE, 4G LTE, WCDMA, GSM Internet
                Connectivity 5G, 4G, 3G, Wi-Fi, EDGE, GPRS 3G Yes GPRS Yes Micro
                USB Port Yes Micro USB Version USB Type C Bluetooth Support Yes
                Bluetooth Version v5.0 Wi-Fi Yes Wi-Fi Version Supports 2.4 GHz
                and 5 GHz Dual Band Wi-Fi Hotspot Yes Mini HDMI Port No NFC No
                USB Tethering Yes Infrared Yes USB Connectivity Yes Audio Jack
                3.5mm Map Support Google Maps GPS Support Yes Other Details
                Smartphone Yes Touchscreen Type Capacitive SIM Size Nano Sim
                User Interface MIUI 14 (Based on Android 13) Instant Message Yes
                Removable Battery No MMS Yes SMS Yes Voice Input Yes Predictive
                Text Input Yes Sensors Ambient Light Sensor, E-Compass,
                Accelerometer, IR Blaster, Side Fingerprint Sensor Browser
                Google Chrome Other Features UFS 2.2 ROM, Bottom Firing
                Loudspeaker, IP53 Protection GPS Type GPS, AGPS, GLONASS,
                GALILEO, QZSS Multimedia Features FM Radio Yes FM Radio
                Recording Yes Music Player Yes Battery & Power Features Battery
                Capacity 5000 mAh Battery Type Lithium Polymer Dimensions Width
                76.28 mm Height 168.6 mm Depth 8.17 mm Weight 199 g Warranty
                Warranty Summary 1 Year Manufacturer Warranty for Phone and 6
                Months Warranty for In the Box Accessories Warranty Service Type
                NA Domestic Warranty 1 Year Read More Frequently bought together
                REDMI 12 5G (Pastel Blue, 128 GB) 4.2(37,446) ₹12,499₹17,99930%
                off KWINE CASE Back Cover for Redmi 12 5G 4.1(953) ₹295 KWINE
                CASE Tempered Glass Guard for Redmi 12 5G 3.8(46) ₹295 1 Item
                ₹12,499 2 Add-ons ₹590 Total ₹13,089 ADD 3 ITEMS TO CART Ratings
                & Reviews Rate Product 4.2★ 37,446 Ratings & 1,758 Reviews 5★ 4★
                3★ 2★ 1★ 22,202 8,291 3,051 1,230 2,672 3.7 Camera 4.0 Battery
                4.1 Display 4.2 Design + 237 5 Must buy! Very nice Dhanlaxmi
                Kirana Certified Buyer, Chakan 3 months ago 21557 4 Nice product
                Nice phone for normal uses fancy design . Front cemra is only 8
                megapixel, plz MIRZA KAZIM Ali BAIG Certified Buyer, Kalaburgi 8
                months ago 941356 4 Good choice Really Awesome handset according
                to prise. Buy it now ADIL FRAJ Certified Buyer, Ranchi District
                6 months ago 22677 + All 1758 reviews Questions and Answers Q:It
                is only 5g A:3g/4g/5g Infinite Retail Flipkart Seller 1223350
                Q:This mobile processor type ? A:SNAPDRAGON4 GEN2 OSELLERSpvtLtd
                Flipkart Seller 1035351 Q:5g saport India A:YES Authorised
                Seller. Flipkart Seller 773354 All questions + Safe and Secure
                Payments.Easy returns.100% Authentic products. You might be
                interested in Power Banks Min. 50% Off Shop Now Mobile Skin
                Stickers Min. 50% Off Shop Now Wearable Smart Devices Min. 40%
                Off Shop Now Selfie Sticks Min. 50% Off Shop Now Similar
                products realme 12x 5G (Woodland Green, 128 GB) 4.4(29,264)
                ₹12,999₹17,99927% off OnePlus N20 SE (BLUE OASIS, 64 GB)
                4.1(767) ₹11,990₹17,99933% off REDMI 12 5G (Pastel Blue, 128 GB)
                4.3(9,446) ₹11,999₹15,99925% off REDMI 13c 5G (Startrail Silver,
                128 GB) 4.3(8,308) ₹10,685₹13,99923% off REDMI 12 (Pastel Blue,
                128 GB) 4.2(48,166) ₹9,999₹15,99937% off REDMI 12 5G (Moonstone
                Silver, 128 GB) 4.3(9,446) ₹11,999₹15,99925% off REDMI 12 5G
                (Jade Black, 256 GB) 4.2(19,788) ₹13,999₹19,99930% off vivo T3x
                5G (Crimson Bliss, 128 GB) 4.5(8,323) ₹13,499₹17,49922% off
                Bought together Selfie Sticks All Categories Screen Guards
                Mobile Skin Stickers Plain Cases & Covers Designer Cases &
                Covers Power Banks Hold up Wireless R1 Bluetooth Selfie Stick
                4(59,922) ₹199₹99980% off Recently ViewedVIEW ALL REDMI 12 5G
                (Pastel Blue, 128 GB) 4.2(37,446) ₹12,499₹17,99930% off POCO M6
                Pro 5G (Power Black, 128 GB) 4.2(1,05,403) ₹9,999₹16,99941% off
                Crompton ACGM-DS500W3J BLK 500 W Mixer Grinder (3 Jars, Black &
                G... 4.2(2,836) ₹1,799₹3,50048% off Top Stories:Brand Directory
                MOST SEARCHED IN MOBILES & ACCESSORIES:HTC DESIRE 616
                REVIEWCANVAS PLAYAMAZON MOBILE COVERSPOWER BANKSLAVA
                MOBILESLENOVO MOBILE WITH PRICEMI SMART PHONENOKIA MOBSAMSUNG
                ANDROID MOBILE PRICE IN INDIASMARTPHONE PRICEASHA 501PANASONIC
                ELUGA I PRICESAMSUNG GALAXY A3 PRICE IN INDIASAMSUNG NEO PLUSJ2
                SAMSUNG PRICESAMSUNG S DUOS 3 PRICE IN INDIASAMSUNG GALAXY S4
                PRICESAMSUNG GALAXY S5 PRICEGALAXY S6 PRICE IN INDIASAMSUNG
                E1282SONY XPERIA Z1 COMPACT PRICEVIDEOCONMI MOBILE PRICEMOTO X
                PLAY 32GBOPPO F3+ PRICEXIAOMI REDMI NOTESAMSUNG GALAXY JBUY
                SWIPE ELITE MAX ABOUT Contact Us About Us Careers Flipkart
                Stories Press Corporate Information GROUP COMPANIES Myntra
                Cleartrip Shopsy HELP Payments Shipping Cancellation & Returns
                FAQ Report Infringement CONSUMER POLICY Cancellation & Returns
                Terms Of Use Security Privacy Sitemap Grievance Redressal EPR
                Compliance Mail Us: Flipkart Internet Private Limited, Buildings
                Alyssa, Begonia & Clove Embassy Tech Village, Outer Ring Road,
                Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India
                Social Registered Office Address: Flipkart Internet Private
                Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village,
                Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103,
                Karnataka, India CIN : U51109KA2012PTC066107 Telephone:
                044-45614700 / 044-67415800 Become a Seller Advertise Gift Cards
                Help Center © 2007-2024 Flipkart.com Price details Maximum
                Retail Price (incl. of all taxes) ₹ 17999.00 Selling Price ₹
                17999.00 Special Price ₹ 12499.00
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
