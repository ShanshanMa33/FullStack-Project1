import React from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {

  const navigate = useNavigate(); 
  const showAlert = useAlert();

  // 处理提交的逻辑
  const handleCreateSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        }),
      });

      const result = await response.json();

      if (result.success) {
        // 2. 🌟 替换掉 alert，改用 success 类型的漂亮弹窗
        showAlert('Product created successfully!', 'success');
        
        // 成功后跳转
        navigate('/products'); 
      } else {
        // 3. 🌟 API 报错时，显示红色的 error 弹窗
        showAlert(result.message || 'Failed to create product', 'error');
      }
    } catch (err) {
      console.error("Submission failed:", err);
      // 4. 🌟 网络错误时同样使用红色弹窗
      showAlert('Network error, please check your server.', 'error');
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-main-layout">
        {/* Uses the global .page-title from App.css */}
        <h1 className="page-title">Create Product</h1>
        
        {/* The reusable form shell */}
        <ProductForm mode="create" onSubmit={handleCreateSubmit} />
      </div>
    </div>
  );
};

export default CreateProduct;