import express, { NextFunction } from "express";
import bodyparser from "body-parser";
import path from "path";
// import mongoose from "mongoose"
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { config } from "dotenv";
config({ path: `./${process.env.NODE_ENV}.env` });
// import { db } from "./Utils/Database"
import Shared from "./Routes/Shared";
import BookRouter from "./Routes/Book";
import MemberRouter from "./Routes/Member";
import { logger } from "./Utils/Logger";
import * as ejs from 'ejs';
import mongoose from "mongoose";

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const port: any = process.env.PORT || 8000;

/* Swagger API initialization Served */

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Qcam API",
      version: "1.0.0",
      description: "Qcam web api created",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./Routes*.js"],
};
const specs = swaggerJsDoc(options);

/* Static Content Served */

app.use("/", express.static(path.join(__dirname, "public/qcam-dashboard")));

app.use("/assets", express.static(path.join(__dirname, "Assets")));

/* Swagger Route Served */

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

/* Deals with the CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/* Routes defined for all module */

app.use("", Shared);
app.use("/book", BookRouter);
app.use("/member", MemberRouter);



// error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  const status = error.statusCode || 500;
  const message = error.message || "";
  let errorData = [];

  if (error.data) {
    errorData = error.data;
  }
  res.status(status).json({
    message: message,
    status: "failure",
    statusCode: status,
    error: errorData,
  });
});


mongoose
  .connect(process.env.MONGO_URI || '')
  .then((result) => {
  logger.info(`🚀 Library Management Db is up ready`)
  })
  .catch((err) => {
    console.log(err);
  });




function onError(error: any) {
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.log(process.env.PORT + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.log(process.env.PORT + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
app.listen(port, () => {
  logger.info(`=================================`);
  logger.info(`🚀 Library Management app ready at http://localhost:${port}`)
  logger.info(`=================================`);
});
