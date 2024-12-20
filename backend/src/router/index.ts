import express from "express";
import authRouter from "./authRouter";
import groupRouter from "./groupRouter";
import productRouter from "./productRouter";
import userRouter from "./userRouter";
import expenseRouter from "./expenseRouter";
import memberRouter from "./memberRouter";

const router = express.Router();

export default (): express.Router => {
  userRouter(router);
  authRouter(router);
  groupRouter(router);
  productRouter(router);
  memberRouter(router);
  expenseRouter(router);
  return router;
};
