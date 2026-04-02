import React from "react";
import YemCard from "../components/YemCard";
import MoliyaCard from "../components/MoliyaCard";
import "../assets/Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="home-page">
        <div className="welcome-banner">
          <h1>Loyihaga xush kelibsiz! 👋</h1>
          <p>
            Bu yerda yem-xashak va moliya hisoblarini tezkor kiritishingiz
            mumkin.
          </p>
        </div>

        <div className="cards-grid">
          <YemCard />
          <MoliyaCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
