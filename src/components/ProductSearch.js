import React, { useState, useContext, useEffect } from "react";
import { LanguageContext, ThemeContext } from "../App";
import { useDebounce } from "../hooks/useProductSearch";

const ProductSearch = ({ setSearchProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkTheme } = useContext(ThemeContext);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearchProduct(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setSearchProduct(searchTerm);
  //   }, 500);
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [searchTerm]);

  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const { langue } = useContext(LanguageContext);

  // TODO: Exercice 1.2 - Utiliser le hook useDebounce

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={
          langue === "FR" ? "Rechercher un produit..." : "Search product..."
        }
        className={`form-control ${isDarkTheme ? "bg-dark text-light" : ""}`}
      />
    </div>
  );
};

export default ProductSearch;
