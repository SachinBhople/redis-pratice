
// const { default: Redis } = require("ioredis")

// const redis = new Redis({
//     host: process.env.REDIS_HOST || 'localhost',
//     port: process.env.REDIS_PORT || 6379,
// })
// redis.on('error', (err) => {
//     console.error("Redis connection error:", err);
// })
// module.exports = { redis }

const { default: Redis } = require("ioredis")


const redis = new Redis(process.env.REDIS_HOST)

redis.on('error', (err) => {
    console.error("Redis connection error:", err);
})
module.exports = { redis }