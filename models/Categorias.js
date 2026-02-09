import pool from "../database/connection.js";

// O que é getALLProducts
async function getAllCategories() {
    // Variável para armazenar o resultado da nossa consulta do banco
    const [rows] = await pool.query('SELECT * FROM Categorias');

    // Retorna a variável rows para o controler (Cerébro do nosso projeto)
    return rows;
}

// "pool": É importado de cima, que é referente ao que criamos do banco

async function createCategories(categorias) {
    const { nome, descricao} = categorias;

    const [result] = await pool.query(`INSERT INTO categorias (nome, descricao) VALUES (?, ?)`, [nome, descricao])

    return result.insertId;
}

// Função de atualização:
async function updateCategories(id, categorias) {
     const { nome, descricao} = categorias;
// UPDATE produtos SET: Comando utilizado para atualizar informações no banco de dados
     const [result] = await pool.query(`UPDATE categorias SET
        nome = ?,
        descricao = ?
        WHERE id = ?
        `, [
            nome, descricao,id
        ])
// Return result.linhasAfetadas:
        return result.affectedRows;
}

// Função de deletar: Para deletar só precisamos do (id):
async function deleteCategories(id) {
    const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [id])

    return result.affectedRows;
} 

export default { getAllCategories, createCategories, updateCategories, deleteCategories}
// Exportar a função para ela funcionar