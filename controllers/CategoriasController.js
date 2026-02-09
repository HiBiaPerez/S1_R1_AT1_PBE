// Chama o model (Que faz a consulta no banco)
import Categorias from '../models/Categorias.js'

// Função para listar as categorias, lista todas as categorias pois colocar (SELECT *)
async function indexCategories(req, res) {
    try {
        const categorias = await Categorias.getAllCategories();
        return res.json(categorias);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar categorias" })
    }
}

// Função para criar uma categoria
async function storeCategories(req, res) {
    try {
        const produto = req.body;

        await Categorias.createCategories(produto);
        res.status(201).json({message: "Categorias cadastrada com sucesso! "});
    } catch (error) {
        res.status(500).json({error: "Erro ao criar categorias" })

    }
}

// Função para atualizar um categoria
async function updateCategories(req, res) {
    try {
        const { id } = req.params;
        const categorias = req.body;

        await Categorias.updateCategories(id, categorias);
        res.status(201).json({ message: "Categoria atualizada com sucesso! "})
    } catch ( error ) {
        res.json({ error: "Erro ao atualizar categoria!" })

    }
}

// DELETE é uma palavra reservada, é um comando do JavaScript:
async function destroyCategories(req, res) {
    try {
        const { id } = req.params;

        await Categorias.deleteCategories(id);
        res.status(200).json({message: "Categoria removida com sucesso! "})
    }catch (error) {
     res.json({ message: "Erro ao remover categoria! "})
    }
}
// 200 esta na faixa de resultados bem sucedidos

export default { indexCategories, storeCategories, updateCategories, destroyCategories }