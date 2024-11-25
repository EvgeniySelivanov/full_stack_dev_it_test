const requestCounts = {};

const resetTime = 1000;
const maxRequestsPerSecond = 5;

setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0;
  });
}, resetTime);

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  console.log('ip', req.ip);

  if (!requestCounts[ip]) {
    requestCounts[ip] = 0;
  }


  console.log('requestCounts', requestCounts);
  // Проверяем, превышен ли лимит запросов

  if (requestCounts[ip] >= maxRequestsPerSecond) {
    console.log(`Rate limit exceeded for IP: ${ip}`);
    return res
      .status(429)
      .json({ error: 'Too many requests, please try again later' });
  }
  requestCounts[ip]++;
  next();
};

module.exports = rateLimiter;
