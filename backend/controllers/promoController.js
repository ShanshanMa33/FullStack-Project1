const Promo = require('../models/promoModel'); 
const mongoose = require('mongoose');

const validateCode = async (req, res) => {
    try {
        const { code } = req.body;
        const promo = await Promo.findOne({ code: code.toUpperCase(), isActive: true });

        if (!promo) {
            return res.status(404).json({ success: false, message: 'Invalid code!' });
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

const createPromoCode = async (req, res) => {
    try {
        const { code, discount } = req.body;

        if (!code || !discount) {
            return res.status(400).json({ message: "Please enter discount amount" });
        }

        const newPromo = new Promo({
            code: code.toUpperCase(),
            discount: Number(discount),
            isActive: true
        });

        await newPromo.save();
        res.status(201).json({ success: true, message: "Promo code created success!", data: newPromo });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// const seedPromos = async (req, res) => {
//     try {

//         await Promo.deleteMany({});

//         const samplePromos = [
//             {
//                 code: 'SAVE20',
//                 discountType: 'amount',
//                 discountValue: 20,
//                 isActive: true
//             },
//             {
//                 code: 'HAPPY10',
//                 discountType: 'percentage',
//                 discountValue: 10,
//                 isActive: true
//             },
//             {
//                 code: 'CHUWASPECIAL',
//                 discountType: 'percentage',
//                 discountValue: 50,
//                 isActive: true
//             }
//         ];

//         await Promo.insertMany(samplePromos);

//         res.status(200).send("Initialize promo code success!");
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

const seedPromos = async (req, res) => {
    try {
         const deleteResult = await Promo.deleteMany({});
    

        const samplePromos = [
            { code: 'SAVE20', discountType: 'amount', discountValue: 20, isActive: true },
            { code: 'HAPPY10', discountType: 'percentage', discountValue: 10, isActive: true }
        ];

        const saved = await Promo.insertMany(samplePromos);
        res.status(200).send(`Successfully save ${saved.length} codes into database.`);
    } catch (err) {
        console.error("error:", err);
        res.status(500).send("Error: " + err.message);
    }
};

module.exports = {
    validateCode,
    createPromoCode,
    seedPromos
};
