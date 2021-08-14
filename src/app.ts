import * as express from "express";
import * as bobyparser from "body-parser";
import * as corsLib from "cors";
import * as path from "path";
import * as admin from "firebase-admin";
import { UserRoutes } from "./routes/users.routes";
import { ServiceAccount } from "firebase-admin";
import { ManagersRoutes } from "./routes/managers.routes";

//firebase
const adminconfig: ServiceAccount = {};
if (!process.env.PROD) {
  const config = require("./config/config.json");
  adminconfig.projectId = config["project_id"];
  adminconfig.privateKey = config["private_key"];
  adminconfig.clientEmail = config["client_email"];
} else {
  adminconfig.projectId = process.env.PROJECT_ID;
  adminconfig.privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
  adminconfig.clientEmail = process.env.CLIENT_EMAIL;
}

admin.initializeApp({
  credential: admin.credential.cert(adminconfig),
});

//express config

const app = express();
app.use(corsLib());
app.use(bobyparser.json({ limit: "25mb" }));
app.use(bobyparser.urlencoded({ extended: false }));

//init static content

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

new ManagersRoutes().routes(app);
new UserRoutes().routes(app);

//init server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server running.."));
function cors(): any {
  throw new Error("Function not implemented.");
}
