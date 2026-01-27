import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import productImg from '../../assets/product-image.png';

const ProductDetail = () => {

  const { id } = useParams(); // 🌟 从 URL 路径 /product/:id 中获取 id
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🌟 获取商品详情数据
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Fetch detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!product) return <div className="error-state">Product not found!</div>;

  return (
    <div className="product-detail-container">
      {/* 🌟 增加一个返回按钮方便操作 */}
      <div className="detail-page-header">
        <span className="back-link" onClick={() => navigate(-1)}>Products</span> 
        &nbsp;/ Details
      </div>

      <div className="detail-content-card">
        <div className="product-image-large-container">
          <img 
            src={product.image} // 🌟 动态图片
            alt={product.name} 
            className="product-image-large" 
          />
        </div>

        <div className="product-info-details">
          <p className="product-category">{product.category}</p>
          <h2 className="product-title">{product.name}</h2>

          <div className="product-price-row">
            <span className="product-price-detail">${product.price}</span>
            {/* 这里的库存逻辑如果后端没存，可以先根据价格或随机显示 */}
            <span className="out-of-stock-label">In Stock</span>
          </div>

          <p className="product-description">
            {product.description || "This product has no detailed description yet. Enjoy the premium experience with our latest technology and design."}
          </p>

          <div className="product-actions">
            <button className="add-to-cart-btn">Add To Cart</button>
            <button 
              className="edit-product-btn"
              onClick={() => navigate(`/edit-product/${product.id}`)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;