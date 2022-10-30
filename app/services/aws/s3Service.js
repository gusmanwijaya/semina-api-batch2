require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3();

module.exports = {
  s3Upload: async (file) => {
    // START: Single upload
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `exercise/${new Date().getTime().toString()}-${file.originalname}`,
      Body: file.buffer,
    };

    return await s3.upload(params).promise();
    // END: Single upload

    // START: Multiple upload
    // const params = files.map((file) => {
    //   return {
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: `exercise/${new Date().getTime().toString()}-${file.originalname}`,
    //     Body: file.buffer,
    //   };
    // });
    // return await Promise.all(params.map((param) => s3.upload(param).promise()));
    // END: Multiple upload
  },
  //   s3UploadV3: async (file) => {
  //     const s3Client = new S3Client();

  //     const params = {
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: `exercise/${new Date().getTime().toString()}-${file.originalname}`,
  //       Body: file.buffer,
  //     };

  //     return await s3Client.send(new PutObjectCommand(params));
  //   },
  s3Delete: async (Key) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
    };

    return await s3.deleteObject(params).promise();
  },
};
