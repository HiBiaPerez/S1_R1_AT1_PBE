// QUARTO
// Esse arquivo é o cerébro do nosso projeto, MOSTRA O QUE VAI TER QUE FAZER ()
// Chama o model (Que faz a consulta no banco)
import Produto from '../models/Produto.js'

// Função para listar os produtos, lista todos os produtos pois colocar (SELECT *)
async function index(req, res) {
    try {
        const produtos = await Produto.getAllProducts();
        return res.json(produtos);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar produtos" })
    }
}

// Função para criar um produto
async function store(req, res) {
    try {
        const produto = req.body;

        await Produto.createProduct(produto);
        res.status(201).json({message: "Produto cadastrado com sucesso! "});
    } catch (error) {
        res.status(500).json({error: "Erro ao criar produto" })

    }
}

// Função para atualizar um produto
async function update(req, res) {
    try {
        const { id } = req.params;
        const produto = req.body;

        await Produto.updateProduct(id, produto);
        res.status(201).json({ message: "Produto atualizado com sucesso! "})
    } catch ( error ) {
        res.json({ error: "Erro ao atualizar produto!" })

    }
}

// DELETE é uma palavra reservada, é um comando do JavaScript:
async function destroy(req, res) {
    try {
        const { id } = req.params;

        await Produto.deleteProduct(id);
        res.status(200).json({message: "Produto removido com sucesso! "})
    }catch (error) {
     res.json({ message: "Erro ao remover produto! "})
    }
}
// 200 esta na faixa de resultados bem sucedidos

export default { index, store, update, destroy }