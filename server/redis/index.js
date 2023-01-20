("use strict");
require("dotenv").config();
const { log } = require("../logger");
const redis = require("redis");

async function initRedis() {
  try {
    console.log(process.env.REDIS_PORT);
    // SETUP ENV BASED RESOURCES -> REDIS CLIENT, JOB SCHEDULES
    const clienConfig = {
      socket: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_IP,
      },
    };

    const redisClient = redis.createClient(clienConfig);

    redisClient.on(
      "error",
      async (error) =>
        await log("error", "NA", "NA", "initRedis", `ON ERROR`, {
          // TODO: KILL APP?
          error: error,
        })
    );

    await redisClient.connect();

    return redisClient;
  } catch (error) {
    await log("error", "NA", "NA", "initRedis", `FN CALL`, {
      error: error,
    });
  }
}

initRedis();

module.exports = initRedis;
