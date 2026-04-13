import express from 'express';
import CategoriasController from '../controllers/CategoryController.js'

const router = express.Router();

// A rota get (Ela busca dados) tem uma função
router.get("/", CategoriasController.indexCategories)
router.post("/", CategoriasController.storeCategories)
router.put("/:id", CategoriasController.updateCategories)
router.delete("/:id", CategoriasController.destroyCategories)
// "/:id": id é o parametro de rota

export default router;