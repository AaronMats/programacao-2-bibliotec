import { Router } from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import livrosRoutes from "./livros.route";
const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/livros", livrosRoutes);

routes.get("/", (req, res) => {
  res.json({ message: "Store API - Node.js + Express + TypeScript" });
});

export default routes;