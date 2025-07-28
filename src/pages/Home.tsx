import React from "react";
import { PageProps } from "../types";

const Home: React.FC<PageProps> = ({
  title = "Добро пожаловать в Moscow2030",
}) => {
  return (
    <div className="home-page">
      <h1>{title}</h1>
      <p>Это главная страница вашего приложения</p>
    </div>
  );
};

export default Home;
