import axios from 'axios';

const sendRequests = async (requestsPerSecond, callback, errorCallback) => {
  const totalRequests = 1000; // Общее количество запросов
  let requestIndex = 1;

  // Функция для отправки запросов с указанным интервалом
  const sendRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5222/api/', { index: requestIndex });
      // console.log(response.data); // Ответ от сервера
      callback(requestIndex); // Отправляем индекс обратно на клиент
      requestIndex++;
    } catch (error) {
      if (error.response) {
              const errorMessage = `Error from server: ${error.response.data.error}`
        console.error(errorMessage);
        errorCallback(errorMessage);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  // Отправляем запросы с указанным интервалом
  const interval = 1000 / requestsPerSecond; // Интервал между запросами в миллисекундах

  for (let i = 0; i < totalRequests; i++) {
    setTimeout(sendRequest, i * interval);
  }
};

export default sendRequests;
