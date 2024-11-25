const { MAX_REQUESTS_PER_SECOND } = require('../constants');
const requestCounts = {};
const resetTime = 1000;
const maxRequestsPerSecond = MAX_REQUESTS_PER_SECOND;

setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0;
  });
}, resetTime);

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  if (!requestCounts[ip]) {
    requestCounts[ip] = 0;
  }
  console.log('requestCounts', requestCounts);
  // Проверяем, превышен ли лимит запросов
  if (requestCounts[ip] >= maxRequestsPerSecond) {
    return res
      .status(429)
      .json({ error: 'Too many requests, please try again later' });
  }
  requestCounts[ip]++;
  next();
};

module.exports = rateLimiter;
