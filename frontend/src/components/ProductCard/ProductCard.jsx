import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // 🌟 引入购物车大脑
import Button from '../../components/common/Button/Button';
import './ProductCard.css';

const ProductCard = ({ product, isAdmin }) => {
  const navigate = useNavigate();
  
  // 🌟 核心修改：从 useCart 中获取数量和更新方法
  const { getItemQuantity, updateQuantity } = useCart();
  
  // 🌟 数量直接从“大脑”里拿，不再自己存，这样刷新页面或跳转详情页都能同步
  const count = getItemQuantity(product.id);

  if (!product) return null;

  const goToDetail = () => {
    navigate(`/product/${product.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); 
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div className="product-card">

      <div className="card-clickable-area" onClick={goToDetail}>
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image" 
          />
        </div>

        <div className="product-info-box">
          <div className="product-name">{product.name}</div>
          <div className="product-price">${Number(product.price).toFixed(2)}</div>
        </div>
      </div>

      <div className="card-button-group">
        <Button 
          variant="primary" 
          size="xs"             
          className="card-add-btn"
          /* 🌟 只有当数量 > 0 时才开启 Stepper (加减号) 模式 */
          isStepper={count > 0}      
          count={count}         
          onIncrease={(e) => { 
            e.stopPropagation(); 
            updateQuantity(product, 1); // 🌟 增加 1 件
          }}
          onDecrease={(e) => { 
            e.stopPropagation(); 
            updateQuantity(product, -1); // 🌟 减少 1 件
          }}
          onClick={(e) => { 
            e.stopPropagation(); 
            if(count === 0) updateQuantity(product, 1); // 🌟 第一次点击，加入购物车
          }} 
        >
          {/* 🌟 只有在数量为 0 时才显示文字，有了文字用户才知道点这里干嘛 */}
          {count === 0 ? "Add to Cart" : ""}
        </Button>

        {isAdmin && (
          <Button 
            variant="secondary" 
            size="xs" 
            className="card-edit-btn"
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;