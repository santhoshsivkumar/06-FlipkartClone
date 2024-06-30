import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface Product {
  productName: string;
  productPrice: number;
  productDescription: string;
}
const ProductDetails = () => {
  const [product, setProduct] = useState<Product>({
    productName: "",
    productPrice: 0,
    productDescription: "",
  });
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://mern-app-xi-five.vercel.app/products/details/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className=" flex flex-col justify-center items-center mt-6 p-4 gap-2">
      <div className="text-2xl">ProductDetails</div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className=" shadow-md border-2 border-purple-600 rounded-md w-2/5 p-4">
          <div className="text-2xl"> Product Name: {product.productName}</div>
          <div className="text-md"> Price: {product.productPrice}</div>
          <div className="text-sm text-gray-700">
            Description: {product.productDescription}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
