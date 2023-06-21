import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('https://server-gray-two.vercel.app/products', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('(App) Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.trim() === '' || date.trim() === '') {
      alert('Por favor, preencha o nome e a data de validade.');
      return;
    }

    const currentDate = new Date();
    const [day, month, year] = date.split('/');

    const productDate = new Date(year, month - 1, day);

    if (productDate < currentDate) {
      alert('A data de validade deve ser posterior à data atual.');
      return;
    }

    const newProduct = {
      name,
      date,
    };

    try {
      await fetch('https://server-gray-two.vercel.app/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      setProducts([...products, newProduct]);
      setName('');
      setDate('');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const removeProduct = useCallback(async (id) => {
    try {
      await fetch(`https://server-gray-two.vercel.app/products/${id}`, {
        method: 'DELETE',
      });

      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  }, [products]);

  const getColor = (dateString) => {
    const currentDate = new Date();
    
    const [day, month, year] = dateString.split('/');
    const formattedDateString = `${month}/${day}/${year}`;
    const productDate = new Date(formattedDateString);
  
    const differenceInDays = Math.floor((productDate - currentDate) / (1000 * 60 * 60 * 24));
  
    if (differenceInDays > 60) {
      return 'green';
    } else if (differenceInDays > 15) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });

  return (
    <div className="container">
      <h1>Gerenciador de Data de Validade</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Data (dd/mm/aaaa):
          <input type="text" value={date} onChange={handleDateChange} />
        </label>
        <button type="submit">Adicionar Produto</button>
      </form>
      <h2>Lista de Produtos</h2>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul className="lista">
          {sortedProducts.map((product, index) => (
            <li
              key={index}
              style={{ color: 'white', backgroundColor: getColor(product.date) }}
            >
              {product.name} - {product.date}
              <button onClick={() => removeProduct(product._id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
