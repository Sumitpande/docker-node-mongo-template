import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const mongoURL = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(
      mongoURL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions
    )
    .then(() => console.log("Connected to DB"))
    .catch(e => console.info(e));
};
connectWithRetry()
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server :D");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
