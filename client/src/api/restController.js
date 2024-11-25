import axios from 'axios';
import pLimit from 'p-limit';

const sendRequests = async (requestsPerSecond, callback, onError) => {
  const totalRequests = 1000;
  let requestIndex = 1;
  const limit = pLimit(requestsPerSecond);
  const abortController = new AbortController();

  const sendRequest = async () => {
    if (abortController.signal.aborted) {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5222/api/',
        { index: requestIndex },
        { signal: abortController.signal }
      );
      callback(requestIndex);
      requestIndex++;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Error from server:', error.response.data.error);
        onError(error.response.data.error); 
        abortController.abort();
      } else {
        console.error('Error:', error.message);
        onError(error.message); // Обработка других ошибок
      }
    }
  };

  // Инициируем запросы
  for (let i = 0; i < totalRequests; i++) {
    limit(() => sendRequest());
  }
};

export default sendRequests;
