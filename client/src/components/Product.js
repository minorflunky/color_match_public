import React from "react";
import { Card } from "antd";
import "./product.css";

export default function Product({ name, brand, image }) {
  return (
    <div className="container">
      <>
        <Card title={name} bordered className="card">
          <img src={image} alt="swatch" style={{ width: 200, height: 200 }} />

          <p>{brand}</p>
        </Card>
      </>
    </div>
  );
}
