import { app } from "./app.js";
import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "VideoCall",
    })
    .then((c) => console.log(`connected with ${c.connection.host}`))
    .then(() => {
      app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port:${process.env.PORT || 5000}`);
      });
    })
    .catch((e) => console.log(e));
};

connectDB();
