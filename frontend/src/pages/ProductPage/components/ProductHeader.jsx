import React from 'react';
import { useNavigate } from 'react-router-dom';
import SortSelect from './SortSelect';
import Button from '../../../components/common/Button/Button';

// 🌟 确保接收 onCategoryChange，因为 Workflow 要求有分类筛选
const ProductHeader = ({ isAdmin, currentSort, onSortChange, onCategoryChange }) => {
  const navigate = useNavigate();

  // 调试用：如果普通用户还能看见，看一眼控制台印出的是 true 还是 false
  // console.log("Header isAdmin state:", isAdmin);

  return (
    <header className="product-page-header">
      <h1 className="product-title">Products</h1>
      
      <div className="header-controls">
        {/* 这里可以放置分类筛选（如果你有这个组件的话） */}
        
        <SortSelect
          value={currentSort} 
          onSortChange={onSortChange} 
        />

        {/* 🌟 权限检查：只有当 isAdmin 为 true 时才渲染 */}
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