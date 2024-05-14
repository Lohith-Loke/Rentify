import express from "express";

import auth from "./auth/authRoute.js";
import dashpath from "./dashborard/dashboard.js";

const apiRouter = express.Router();
apiRouter.use("/auth", auth);
apiRouter.use("/dashboard", dashpath);

export default apiRouter;
