import { Product } from "./interface";

export const ConvertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const formatPrice = (
  price: number,
  locale = "en-IN",
  currency = "INR"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
};

export function groupProducts(products: Product[], field: string) {
  const groupedProducts: any = {};

  products.forEach((product: any) => {
    const key = product[field] || "Other"; // Default category for undefined fields
    if (!groupedProducts[key]) {
      groupedProducts[key] = [];
    }
    groupedProducts[key].push(product);
  });

  return groupedProducts;
}
