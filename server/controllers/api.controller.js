// apiController.js
const apiController = async (req, res) => {
  const index = req.body.index; // Получаем индекс из запроса
  const delay = Math.floor(Math.random() * 1000); // Случайная задержка от 1 до 1000 мс

  // Задержка обработки
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Если запрос был лимитирован, возвращаем ошибку
  if (req.rateLimited) {
      return res.status(429).json({ message: "Too Many Requests" });
  }

  // Успешный ответ
  res.status(200).json({ index });
};

module.exports = apiController;