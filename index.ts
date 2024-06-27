import express from "express";
import env from "dotenv";
env.config();
import connect from "./config/database";

const app = express();
connect();
const port: string | number = process.env.PORT || 3002;

app.listen(() => {
  console.log(`App is listening on port ${port}`);
});
