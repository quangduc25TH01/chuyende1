import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "reflect-metadata";

import AppDataSource from "./ormconfig";
import routes from "./routes";
import config from "./config";
import { sessionConfig } from "./config/sessionConfig";

// env config
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    origin: (origin: string | undefined, callback: any) => {
      if (!origin || config.corsOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Initialize Passport
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Register routes
app.use("/api", routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to DB:", error));
