// TERCEIRO: Achou a rota get, vai falar quais rotas tem

import express from 'express';
import ProdutosController from '../controllers/ProdutosController.js'

const router = express.Router();

// A rota get (Ela busca dados) tem uma função
// ROTA PRODUTOS: http://localhost:3000/produtos --> Vai procurar a rota "get"
router.get("/", ProdutosController.index)
router.post("/", ProdutosController.store)
router.put("/:id", ProdutosController.update)
router.delete("/:id", ProdutosController.destroy)
// "/:id": id é o parametro de rota

export default router;