import React, { useState } from "react";
import "./menu.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

function Menu() {
  const [category, setCategory] = useState("All");

  return (
    <>
      <div className="menu-page">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} showAll={true} />
      </div>
    </>
  );
}

export default Menu;
