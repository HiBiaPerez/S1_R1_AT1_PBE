// TERCEIRO: Achou a rota get, vai falar quais rotas tem

import express from "express";
import ProductController from '../controllers/ProductController.js'

const router = express.Router();

// A rota get (Ela busca dados) tem uma função
// ROTA PRODUTOS: http://localhost:3000/produtos --> Vai procurar a rota "get"
router.get("/", ProductController.index)
router.post("/", ProductController.store)
router.put("/:id", ProductController.update)
router.delete("/:id", ProductController.destroy)
// "/:id": id é o parametro de rota

export default router;