const initRedis = require("./index");

const getRedisDT = async () => {
  try {
    const redisClient = await initRedis();
    // Get stored datetime from redis
    const dt = await redisClient.get("acumatica_datetime");

    // Turn it back into usable string from JSON
    const dtObject = JSON.parse(dt);

    // Create datetime object from redis datetime
    const newDate = new Date(dtObject);

    // Get current datetime
    const now = new Date();

    // Get time delta in milliseconds
    const time_diff = now.getTime() - newDate.getTime();

    // Convert delta to days
    const Difference_In_Days = time_diff / (1000 * 3600 * 24);

    await redisClient.quit();

    return Difference_In_Days;
  } catch (error) {
    console.log(error);
    console.log("ERROR OCURRED - getRedisDT");
  }
};

const setApiData = async (data) => {
  try {
    const redisClient = await initRedis();

    const jsonData = JSON.stringify(data);

    await redisClient.set("acumatica", jsonData);

    let now = new Date();

    now = JSON.stringify(now);

    await redisClient.set("acumatica_datetime", now);
    await redisClient.quit();
  } catch (error) {
    console.log("ERROR OCURRED - setApiData");
  }
};

const getRedisData = async () => {
  try {
    const redisClient = await initRedis();

    let data = await redisClient.get("acumatica");
    data = JSON.parse(data);
    await redisClient.quit();
    return data;
  } catch (error) {
    console.log("ERROR OCURRED - getRedisData");
  }
};

module.exports = { getRedisDT, setApiData, getRedisData };
