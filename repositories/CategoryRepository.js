import pool from "../database/connection.js";

class CategoryModel {
// O que é getALLProducts
async getAllCategories() {
    // Variável para armazenar o resultado da nossa consulta do banco
    const [rows] = await pool.query('SELECT * FROM Categorias');

    // Retorna a variável rows para o controler (Cerébro do nosso projeto)
    return rows;
}

// "pool": É importado de cima, que é referente ao que criamos do banco

async createCategories(categoria) {
    const [result] = await pool.query(`INSERT INTO categorias (nome, descricao) VALUES (?, ?)`, [categoria.nome, categoria.descricao])

    return result.insertId;
}

// Função de atualização:
async updateCategories(id, categoria) {
// UPDATE produtos SET: Comando utilizado para atualizar informações no banco de dados
     const [result] = await pool.query(`UPDATE categorias SET
        nome = ?,
        descricao = ?
        WHERE id = ?
        `, [
            categoria.nome, categoria.descricao,id
        ])
// Return result.linhasAfetadas:
        return result.affectedRows;
}

// Função de deletar: Para deletar só precisamos do (id):
async deleteCategories(id) {
    const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [id])

    return result.affectedRows;
} 

async getById(id) {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows [0];
}

// Desativar uma categoria:
async updateStatus(id, status) {
    const [rows] = await pool.query('UPDATE categorias SET status = ?', [status, id])
    return rows;
}
}

// Exportar a função para ela funcionar:
export default new CategoryModel ()
