import { useState, useEffect } from "react";

// TODO: Exercice 3.1 - Créer le hook useDebounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
// TODO: Exercice 3.2 - Créer le hook useLocalStorage
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error("Erreur lors de la lecture du localStorage", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erreur lors de l'écriture dans le localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
};

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track the total number of pages
  const [reload, setReload] = useState(false); // Track if products should be reloaded
  const fetchProducts = async () => {
    try {
      // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const response = await fetch(
        `https://api.daaif.net/products?delay=1000&skip=${
          (currentPage - 1) * 10
        }&limit=10`
      );
      if (!response.ok) throw new Error("Erreur réseau");
      const data = await response.json();
      setProducts(data.products);
      const totalPages = Math.ceil(data.total / 10); // Use Math.ceil() to round up
      setTotalPages(totalPages); // Set total pages from the API response
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage, reload]); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reloadProducts = () => {
    setLoading(true);
    setReload(!reload); // Toggle the reload state to trigger a re-fetch
  };
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setLoading(true);
      setCurrentPage(newPage);
    }
  };
  return {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reloadProducts,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    totalPages,
    changePage,
  };
};

export default useProductSearch;
