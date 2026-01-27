// src/components/common/Alert/Alert.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../../../store/slices/alertSlice';
import './Alert.css';

const Alert = () => {
  const { show, message, type } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  if (!show) return null;

  // 这里的逻辑是全站唯一的“真理”：只有 type 严格等于 'success' 才算成功
  const isSuccess = type === 'success';

  return (
    <div className="alert-wrapper">
      <div className="alert-overlay" onClick={() => dispatch(hideAlert())} />
      
      <div className={`alert-modal alert-type-${isSuccess ? 'success' : 'error'}`}>
        <div className="alert-icon-wrap">
          {/* ✅ 图标严格随逻辑切换，成功显示绿勾，失败显示红叉 */}
          <div className={`icon-circle ${isSuccess ? 'icon-success' : 'icon-error'}`}>
            {isSuccess ? '✓' : '✕'}
          </div>
        </div>

        <div className="alert-content">
          {/* ✅ 这里的标题绝对不能写死！必须根据 isSuccess 切换 */}
          <h3 className="alert-title">
            {isSuccess ? 'Update Success' : 'Request Failed'}
          </h3>
          <p className="alert-message">{message}</p>
        </div>

        <button className="alert-action-btn" onClick={() => dispatch(hideAlert())}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default Alert;