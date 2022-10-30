const { Image } = require("../../models");
const CustomError = require("../../errors");
const { s3Upload, s3Delete } = require("../aws/s3Service");

module.exports = {
  createImage: async (req) => {
    if (!req.file) throw new CustomError.BadRequest("Please upload an image!");

    const uploadToS3 = await s3Upload(req.file); // Single upload use req.file || Multiple upload use req.files

    const data = new Image({
      ETag: uploadToS3.ETag,
      Location: uploadToS3.Location,
      Key: uploadToS3.Key,
      Bucket: uploadToS3.Bucket,
    });
    await data.save();

    return data;
  },
  getAllImages: async () => {
    const data = await Image.findAll({
      attributes: ["id", "ETag", "Location", "Key", "Bucket"],
    });
    return data;
  },
  detailImage: async (req) => {
    const { id } = req.params;

    const data = await Image.findOne({
      where: {
        id,
      },
      attributes: ["id", "ETag", "Location", "Key", "Bucket"],
    });

    if (!data)
      throw new CustomError.NotFound(`Image with id : ${id} not found!`);

    return data;
  },
  destroyImage: async (req) => {
    const { id } = req.params;

    const data = await Image.findOne({
      where: {
        id,
      },
    });

    if (!data)
      throw new CustomError.NotFound(`Image with id : ${id} not found!`);

    await s3Delete(data.Key);
    await data.destroy();

    return data;
  },
};
