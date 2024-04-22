import logo from "./logo.jpeg";
import "./App.css";
import { Space, Typography } from "antd";
import Search from "./components/search";
//import Result from './components/result';
import { useState } from "react";
import Product from "./components/Product";

const { Title } = Typography;

export default function App() {
  const [response, setResponse] = useState(null);

  const handleResponse = (childdata) => {
    console.log(childdata.name);
    setResponse(
      <Product
        name={childdata.name}
        image={childdata.image}
        brand={childdata.brand}
      />
    );
    //return (response)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Match-Maker</h1>
      </header>
      <div className="content">
        <h3> Welcome to Match-Maker! </h3>
        <p>
          {" "}
          Match-Maker is a platform that helps you find the perfect makeup
          product for your needs.{" "}
        </p>
        <Space />
        <p>
          {" "}
          To get started, select the type of makeup product you are looking for
          and the color you prefer.{" "}
        </p>
      </div>
      <Search handleResponse={handleResponse} />
      {response}
      <footer>
        <p>Made By Nikita Semenov and Lucas Koumasonas</p>
      </footer>
    </div>
  );
}
