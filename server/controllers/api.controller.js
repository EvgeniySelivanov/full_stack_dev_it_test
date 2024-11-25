
const apiController = async (req, res) => {

  const index = req.body.index;
  const delay = Math.floor(Math.random() * 1000);
  await new Promise((resolve) => setTimeout(resolve, delay));
  res.status(200).json({ index });
  
};

module.exports = apiController;
