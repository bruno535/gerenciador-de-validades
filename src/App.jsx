import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

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
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('/'));
        const dateB = new Date(b.date.split('/').reverse().join('/'));
        return dateA - dateB;
      });
      setProducts(sortedData);
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
    let value = event.target.value;
    value = value.replace(/[-\s]/g, '/');
    setDate(value);
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
      return '#00B300';
    } else if (differenceInDays > 15) {
      return '#ffb36e';
    } else {
      return '#FF6A33';
    }
  };

  return (
    <div className="container">
      <h1 className="heading1">Gerenciador de Data de Validade</h1>
      <AddProductForm
        name={name}
        date={date}
        handleNameChange={handleNameChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
      />
      <h2 className="heading2">Lista de Produtos</h2>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ProductList
          products={products}
          removeProduct={removeProduct}
          getColor={getColor}
        />
      )}
    </div>
  );
};

export default App;
