// Chama o model (Que faz a consulta no banco)
import CategoryService from '../services/CategoryService.js'

class CategoryController {
// Função para listar as categorias, lista todas as categorias pois colocar (SELECT *)
async indexCategories(req, res) {
    try {
        const categorias = await CategoryService.getAll();
        return res.json(categorias);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar categorias" })
    }
}

// Função para criar uma categoria
async storeCategories(req, res) {
    try {
        const categoria = req.body;

        await CategoryService.createCategories(categoria);
        res.status(201).json({message: "Categorias cadastrada com sucesso! "});
    } catch (error) {
        res.status(500).json({error: "Erro ao criar categorias" })

    }
}

// Função para atualizar um categoria
async updateCategories(req, res) {
    try {
        const { id } = req.params;
        const categorias = req.body;

        await CategoryService.updateCategories(id, categorias);
        res.status(201).json({ message: "Categoria atualizada com sucesso! "})
    } catch ( error ) {
        res.json({ error: "Erro ao atualizar categoria!" })

    }
}

// DELETE é uma palavra reservada, é um comando do JavaScript:
async destroyCategories(req, res) {
    try {
        const { id } = req.params;

        await CategoryService.deleteCategories(id);
        res.status(200).json({message: "Categoria removida com sucesso! "})
    }catch (error) {
     res.json({ message: "Erro ao remover categoria! "})
    }
}
// 200 esta na faixa de resultados bem sucedidos

}

export default new CategoryController ();