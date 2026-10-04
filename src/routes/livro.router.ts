import { Router } from "express";
import { LivroController } from "@/controllers/livro.controller";
import { authenticate, authorize } from "@/middlewares/auth";

const router = Router();

const livroController = new LivroController();

router.get("/", livroController.getAllLivros);
router.get("/:id", livroController.getLivroById);
router.post("/", livroController.createLivro);
router.put("/:id", livroController.updateLivro);
router.delete("/:id", livroController.deleteLivro);

export default router;