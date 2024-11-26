const validateIndex = (req, res, next) => {
  const { index } = req.body;
  if (index === undefined || typeof index !== 'number' || isNaN(index)) {
    return res.status(400).json({ error: 'Invalid index. Index must be a number.' });
  }
  next();
};

module.exports = validateIndex;
