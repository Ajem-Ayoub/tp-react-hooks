import React, { createContext, useState } from "react";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";
import LangueSelector from "./components/LangueSelector";
import { useLocalStorage } from "./hooks/useProductSearch";

// TODO: Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext();

export const ThemeContext = createContext();

const Langues = ["FR", "EN"];
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  // TODO: Exercice 2.2 - Ajouter l'état pour la langue
  // const [langue, setLangue] = useState("FR");
  const [langue, setLangue] = useLocalStorage("langue", "FR");

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
      <LanguageContext.Provider value={{ Langues, langue, setLangue }}>
        <div
          className={`container ${
            isDarkTheme ? "bg-dark text-light" : "bg-light"
          }`}
        >
          <header className="my-4">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
              <LangueSelector />
            </div>
          </header>
          <main>
            <ProductSearch setSearchProduct={setSearchProduct} />
            <ProductList searchProduct={searchProduct} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
