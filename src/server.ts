import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import expenseRoute from "./routes/expense";
import userRoutes from "./routes/user";
import { authenticateToken } from "./middlewares/auth";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  // Check if the error is an HTTP error
  const status = err.status || 500; // Default to 500 if no status is set
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: status,
    },
  });
});

app.use("/auth", authRouter);
app.use("/expenses", authenticateToken, expenseRoute);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
