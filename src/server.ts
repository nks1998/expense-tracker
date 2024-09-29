import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRouter from "./routes/auth";
import expenseRoute from "./routes/expense";
import userRoutes from "./routes/user";
import { authenticateToken } from "./middlewares/auth";
import { ErrorMiddleware } from "./middlewares/errorHandle";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/expenses", authenticateToken, expenseRoute);
app.use("/users", userRoutes);

app.use(ErrorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
