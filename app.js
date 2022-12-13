import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";
import uploadImgRouter from "./routes/uploadImg.routes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import swaggerFile from './swagger/swagger_output.json' assert { type: "json"}

dotenv.config();

dbConnect();

const app = express();

app.use(cors({ origin: process.env.REACT_URL }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/", uploadImgRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(Number(process.env.PORT), () =>
  console.log(`server on port ${process.env.PORT}!'`)
);
