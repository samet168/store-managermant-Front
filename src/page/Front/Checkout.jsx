import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Checkout() {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("product");
  const qty = searchParams.get("qty");

  return (
    <div>
      <h2>Checkout Page</h2>
      <p>Product ID: {productId}</p>
      <p>Quantity: {qty}</p>
    </div>
  );
}