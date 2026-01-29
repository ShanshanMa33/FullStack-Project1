import { request } from "./client";

/**
 * @param {string} promoCode 
 * @returns {Promise}
 */
export const apiValidatePromo = (promoCode) => {
    return request('/api/promo/validate', {
        method: 'POST',
        body: JSON.stringify({ code: promoCode })
    });
};