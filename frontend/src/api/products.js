import { request } from "./client";

export const apiGetProducts = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return request(`/api/products?${queryString}`);
};

export const apiGetProductById = (id) => request(`/api/products/${id}`);

export const apiCreateProduct = (formData) => request('/api/products', {
    method: 'POST',
    body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
    })
});

export const apiUpdateProduct = (id, formData) => request(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
    })
});

export const apiDeleteProduct = (id) => request(`/api/products/${id}`, {
    method: 'DELETE'
});

export const apiUploadImage = (formData) => request('/api/upload', {
    method: 'POST',
    body: formData,
});