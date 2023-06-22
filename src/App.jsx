import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [sortBy, setSortBy] = useState('date');
=======
>>>>>>> 884b5c2dabc5c252c2f6158ac9bd9bd75207aef1

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
<<<<<<< HEAD
    let value = event.target.value;
    value = value.replace(/[-\s]/g, "/");
    setDate(value);
=======
    setDate(event.target.value);
>>>>>>> 884b5c2dabc5c252c2f6158ac9bd9bd75207aef1
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

<<<<<<< HEAD
  const sortProducts = (a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      const dateA = new Date(a.date.split('/').reverse().join('/'));
      const dateB = new Date(b.date.split('/').reverse().join('/'));
      return dateA - dateB;
    } else {
      return 0;
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const sortedProducts = [...products].sort(sortProducts);
=======
  const sortedProducts = [...products].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });
>>>>>>> 884b5c2dabc5c252c2f6158ac9bd9bd75207aef1

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <h1 className="heading1">Gerenciador de Data de Validade</h1>
      <form onSubmit={handleSubmit}>
        <label className="label">
          Nome:
          <input type="text" value={name} onChange={handleNameChange} className="text-input" />
        </label>
        <label className="label">
          Data (dd/mm/aaaa):
          <input type="text" value={date} onChange={handleDateChange} className="text-input" />
        </label>
        <button type="submit" className="button">Adicionar Produto</button>
      </form>
<<<<<<< HEAD
      <h2 className="heading2">Lista de Produtos</h2>
      <div className='container-orderby'>
        <select value={sortBy} onChange={handleSortChange} className="select-input">
          <option value="date">Ordenar por Data</option>
          <option value="name">Ordenar por Nome</option>
        </select>
        <button onClick={handleReload} className="button">Atualizar</button>
      </div>
=======
      <h2>Lista de Produtos</h2>
      <button onClick={handleReload}>Atualizar</button>
>>>>>>> 884b5c2dabc5c252c2f6158ac9bd9bd75207aef1
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul className="lista">
          {sortedProducts.map((product, index) => (
<<<<<<< HEAD
            <li key={index} style={{ backgroundColor: getColor(product.date) }} className="list-item">
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-date">{product.date}</div>
              </div>
              <button onClick={() => removeProduct(product._id)} className="button">Remover</button>
=======
            <li
              key={index}
              style={{ color: 'white', backgroundColor: getColor(product.date) }}
            >
              {product.name} - {product.date}
              <button onClick={() => removeProduct(product._id)}>Remover</button>
>>>>>>> 884b5c2dabc5c252c2f6158ac9bd9bd75207aef1
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
