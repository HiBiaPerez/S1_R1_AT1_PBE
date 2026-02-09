// QUINTO E ÚLTIMO ARQUIVO
import pool from "../database/connection.js";

async function getAllProducts() {
    // Variável para armazenar o resultado da nossa consulta do banco
    const [rows] = await pool.query('SELECT * FROM Produtos');

    // Retorna a variável rows para o controler (Cerébro do nosso projeto)
    return rows;
}

// "pool": É importado de cima, que é referente ao que criamos do banco

async function createProduct(produto) {
    const { nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, id_categorias} = produto;

    const [result] = await pool.query(`INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, id_categorias) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, id_categorias])

    return result.insertId;
}

// Função de atualização:
async function updateProduct(id ,produto) {
     const { nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, id_categorias} = produto;
    
// UPDATE produtos SET: Comando utilizado para atualizar informações no banco de dados
     const [result] = await pool.query(`UPDATE produtos SET
        nome = ?,
        descricao = ?,
        preco = ?,
        quantidade_estoque = ?,
        status = ?,
        destaque = ?,
        marca = ?,
        modelo = ?,
        garantia_meses = ?,
        id_categorias = ?
        WHERE id = ?
        `, [
            nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, id_categorias, id
        ])
// Return result.linhasAfetadas:
        return result.affectedRows;
}

// Função de deletar: Para deletar só precisamos do (id):
async function deleteProduct(id) {
    const [result] = await pool.query(`DELETE FROM produtos WHERE id = ?`, [id])

    return result.affectedRows;
} 


export default { getAllProducts, createProduct, updateProduct, deleteProduct }
// Exportar a função para ela funcionar

