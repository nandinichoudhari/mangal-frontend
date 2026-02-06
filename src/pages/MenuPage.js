import { useLocation } from "react-router-dom";
import Menu from "../components/Menu"; // Adjust path
import { useState } from "react";

function MenuPage({ addToCart }) {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";

  return (
    <div className="page-content">
      <Menu addToCart={addToCart} searchTerm={searchTerm} />
    </div>
  );
}

export default MenuPage;
