import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import ProductHeader from './components/ProductHeader'; 

const ProductPage = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortType, setSortType] = useState('Last added');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const processedProducts = products
    .filter(item => {
      if (filterCategory === 'All') return true;
      return item.category === filterCategory;
    })
    .sort((a, b) => {
      if (sortType === 'Price: low to high') return parseFloat(a.price) - parseFloat(b.price);
      if (sortType === 'Price: high to low') return parseFloat(b.price) - parseFloat(a.price);
      if (sortType === 'Last added') return b.id - a.id;
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, sortType]);

  const fetchProducts = () => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("fail to get product:", err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("confirm to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error("fail to delete:", err);
    }
  };

  return (
    <div className="product-page-container">
      <ProductHeader
        isAdmin={isAdmin} 
        currentCategory={filterCategory} 
        onCategoryChange={setFilterCategory} 
        currentSort={sortType}
        onSortChange={setSortType}
      />
        
      <div className="product-list-container">
        <div className="product-grid">
          {currentItems.map((item) => (
            <ProductCard 
              key={item.id} 
              product={item}
              isAdmin={isAdmin} //switch admin and regular user
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </div>
      
      <Pagination
        totalItems={processedProducts.length} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default ProductPage;