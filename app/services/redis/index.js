const CustomError = require("../../errors");
const redis = require("redis");
const { promisifyAll } = require("bluebird");

promisifyAll(redis);

const client = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
  password: "",
});
client.on("error", (error) => console.log("Error Redis Client" + error));
client.connect();

const getRedis = async (key) => {
  try {
    const value = await client.get(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    throw new CustomError.Unauthorized(error);
  }
};

const setRedis = async (key, value) => {
  try {
    return await client.set(key, JSON.stringify(value));
  } catch (error) {
    throw new CustomError.Unauthorized(error);
  }
};

const deleteRedis = async (...key) => {
  try {
    return await client.del(key);
  } catch (error) {
    throw new CustomError.Unauthorized(error);
  }
};

module.exports = {
  getRedis,
  setRedis,
  deleteRedis,
};
