const Promo = require('../models/promoModel'); 
const mongoose = require('mongoose');

const validateCode = async (req, res) => {
    try {
        const { code } = req.body; 
        
        const promo = await Promo.findOne({ code: code, isActive: true });

        if (!promo) {
            return res.status(404).json({ 
                success: false, 
                message: 'Please enter valid code' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully applied!',
            code: promo.code,
            discountType: promo.discountType,   
            discountValue: promo.discountValue  
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}; 

module.exports = {
    validateCode
};
