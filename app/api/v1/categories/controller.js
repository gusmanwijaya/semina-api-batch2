module.exports = {
  get: async (req, res, next) => {
    try {
      res.send("response with a resource");
    } catch (error) {
      next(error);
    }
  },
};
