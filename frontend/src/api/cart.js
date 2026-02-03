import { request } from "./client";

export const apiSyncCart = (cartArray) => {
  return request('/api/auth/updateCart', {
    method: 'PUT',
    body: JSON.stringify({ cart: cartArray })
  });
};