import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ProductPage.css';
import { apiGetProducts, apiDeleteProduct } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import ProductHeader from './components/ProductHeader'; 
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const ProductPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const isAdmin = !!token && user?.role === 'admin';
  
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

  const fetchProducts = async () => {
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (filterCategory !== 'All') params.category = filterCategory;

      const data = await apiGetProducts(params);
      const result = Array.isArray(data) ? data : (data.data || []);
      setProducts(result); 
    } catch (err) {
      console.error("Fail to load:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, filterCategory]);

  const handleDelete = async (mongoId) => {
    if (!window.confirm("Confirm to delete this product?")) return;
    try {
      await apiDeleteProduct(mongoId);
      fetchProducts();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
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