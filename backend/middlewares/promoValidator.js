const promoValidator = (req, res, next) => {
  const { code } = req.body;

  if (!code || typeof code !== "string" || code.trim().length === 0) {
      return res.status(400).json({ 
          success: false, 
          message: "Please enter valid code" 
      });
  }

  req.body.code = code.trim().toUpperCase();
  
  next();
};

module.exports = promoValidator;