import mongoose from "mongoose";

export const mongodbConnect = () => {
  mongoose
    .connect(process.env.MONGODB as string)
    .then((msg) => {
      console.log("connect to mongodb successfully!!");
    })
    .catch((e) => {
      console.log("connot connect to mongodb.");
    });
};
