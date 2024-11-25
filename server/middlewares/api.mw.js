// rateLimiter.js
let requestCount = 0;
const resetTime = 1000; // Время сброса (1 секунда)
const maxRequestsPerSecond = 50; // Лимит запросов

// Сбрасываем счётчик каждую секунду
setInterval(() => {
    requestCount = 0;
}, resetTime);

const rateLimiter = (req, res, next) => {
    if (requestCount >= maxRequestsPerSecond) {
        req.rateLimited = true;
    } else {
        requestCount++;
        req.rateLimited = false;
    }
    next();
};

module.exports = rateLimiter;
