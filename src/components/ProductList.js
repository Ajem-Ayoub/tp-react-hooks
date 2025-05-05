import React, { useContext } from "react";
import { LanguageContext, ThemeContext } from "../App";
import useProductSearch from "../hooks/useProductSearch";

const ProductList = ({ searchProduct }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext pour les traductions
  const { langue } = useContext(LanguageContext);

  const {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Récupérer la fonction de rechargement
    reloadProducts,
    // TODO: Exercice 4.2 - Récupérer les fonctions et états de pagination
    currentPage,
    totalPages,
    changePage,
  } = useProductSearch();

  if (loading)
    return (
      <div className="text-center my-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        Erreur: {error}
      </div>
    );

  return (
    <div>
      {/* TODO: Exercice 4.1 - Ajouter le bouton de rechargement */}
      <button className="btn btn-primary mb-3" onClick={reloadProducts}>
        Recharger les produits
      </button>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(
          (product) =>
            product.title
              ?.toLowerCase()
              .includes(searchProduct?.toLowerCase()) && (
              <div key={product.id} className="col">
                <div
                  className={`card h-100 ${
                    isDarkTheme ? "bg-dark text-light" : ""
                  }`}
                >
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <strong>Prix: </strong>
                      {product.price}
                      {langue === "FR" ? "€" : "$"}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* TODO: Exercice 4.2 - Ajouter les contrôles de pagination */}
      <nav className="pagination-nav">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </nav>
    </div>
  );
};

export default ProductList;
