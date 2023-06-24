import React, { useState } from 'react';

const ProductList = ({ products, removeProduct, getColor }) => {
  const [confirmingRemoval, setConfirmingRemoval] = useState(null);

  const handleRemoveClick = (productId) => {
    if (confirmingRemoval === productId) {
      removeProduct(productId);
      setConfirmingRemoval(null);
    } else {
      setConfirmingRemoval(productId);
    }
  };

  return (
    <ul className="lista">
      {products.map((product, index) => (
        <li
          key={index}
          style={{ backgroundColor: getColor(product.date) }}
          className="list-item"
        >
          <div className="product-info">
            <div className="product-name">{product.name}</div>
            <div className="product-date">{product.date}</div>
          </div>
          {confirmingRemoval === product._id ? (
            <div className="confirmation-overlay">
              <div className="confirmation-box">
                <p>Tem certeza que deseja remover esse item?</p>
                <div className="confirmation-buttons">
                  <button className='confirm' onClick={() => handleRemoveClick(product._id)}>Confirmar</button>
                  <button onClick={() => setConfirmingRemoval(null)}>Cancelar</button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleRemoveClick(product._id)}
              className="list-button"
              aria-label="Remover produto"
            >
              Remover
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
