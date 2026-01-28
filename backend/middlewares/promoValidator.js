if (!req.body.code) {
    return res.status(400).json({ message: "Please enter code" });
  }
  next();