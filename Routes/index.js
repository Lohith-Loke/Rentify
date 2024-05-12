import auth  from "./auth/authRoute.js";
import express from "express";

const apiRouter = express.Router();
apiRouter.use("/auth", auth);

export default apiRouter;