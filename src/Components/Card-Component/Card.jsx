import React from "react";
import { BsFillArchiveFill } from "react-icons/bs";
import "./card.css";

function Card() {
  return (
    <div className="card-container">
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
      </div>
    </div>
  );
}
export default Card;
