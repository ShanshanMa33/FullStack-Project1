import React from 'react';
import { useNavigate } from 'react-router-dom';
import SortSelect from './SortSelect';
import Button from '../../../components/common/Button/Button';

const ProductHeader = ({ isAdmin, currentSort, onSortChange }) => {
  const navigate = useNavigate();

  return (
    <header className="product-page-header">
      <h1 className="product-title">Products</h1>
      
      <div className="header-controls">        
        <SortSelect
          value={currentSort} 
          onSortChange={onSortChange} 
        />
        {isAdmin && (
          <Button 
            variant="primary" 
            className="add-product-btn-primary"
            onClick={() => navigate('/create-product')}
          >
            Add Product
          </Button>
        )}
      </div>
    </header>
  );
};

export default ProductHeader;