import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import ProductHeader from './components/ProductHeader'; 
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const ProductPage = ({ isAdmin }) => {
  
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const filterCategory = searchParams.get('category') || 'All';
  const sortType = searchParams.get('sort') || 'Last added';
  const currentPage = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = 10;
  
  

  const updateParams = (newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...current, ...newParams }); 
  };

  const processedProducts = products
    .sort((a, b) => {
      if (sortType === 'Price: low to high') return parseFloat(a.price) - parseFloat(b.price);
      if (sortType === 'Price: high to low') return parseFloat(b.price) - parseFloat(a.price);
      if (sortType === 'Last added') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchProducts = () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (filterCategory !== 'All') params.append('category', filterCategory);

      fetch(`http://localhost:8000/api/products?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
          const result = Array.isArray(data) ? data : (data.data || []);
          setProducts(result); 
        })
        .catch(err => console.error("fetch error:", err));
    };

    fetchProducts();
  }, [searchQuery, filterCategory]);

  const handleDelete = async (mongoId) => {
    if (!window.confirm("confirm to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/products/${mongoId}`, { 
        method: 'DELETE' 
      });
      if (res.ok) {const params = new URLSearchParams(searchParams);
        fetch(`http://localhost:8000/api/products?${params.toString()}`)
          .then(res => res.json())
          .then(data => setProducts(Array.isArray(data) ? data : (data.data || [])));}
    } catch (err) {
      console.error("fail to delete:", err);
    }
  };

  return (
    <div className="product-page-container">
      <ProductHeader
        isAdmin={isAdmin} 
        currentCategory={filterCategory} 
        onCategoryChange={(val) => updateParams({ category: val, page: 1 })} 
        currentSort={sortType}
        onSortChange={(val) => updateParams({ sort: val })}
      />
        
      <div className="product-list-container">
        {searchQuery && (
          <div className="search-info-bar">
            <div className="search-text-content">
              <span className="results-count">{processedProducts.length}</span>
              {processedProducts.length === 1 ? ' result' : ' results'} found for 
              <span className="search-term"> "{searchQuery}"</span>
            </div>
            <div className="search-action">
              <Button 
                variant="primary"
                onClick={() => navigate('/')}
              >
                Back
              </Button>
            </div>
          </div>
        )}
        <div className="product-grid">
          {currentItems.map((item) => (
            <ProductCard 
              key={item._id}
              product={item}
              isAdmin={isAdmin}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      </div>
      
      <Pagination
        totalItems={processedProducts.length} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        onPageChange={(val) => updateParams({ page: val })} 
      />
    </div>
  );
};

export default ProductPage;