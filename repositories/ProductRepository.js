// QUINTO E ÚLTIMO ARQUIVO
// O repository vai conversar com o banco
import pool from "../database/connection.js";

class ProductRepository {
    async getAll() {
        const [rows] = await pool.query('SELECT * FROM produtos');
        return rows;
    }

    async getById(id) {
        const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
        return rows[0]; // Como vai retornar um único produto, colocamos o índice 0
    }

    // UPDATE, nome da tabela, SET, qual campo do produto eu vou atualizar
    async desativarPorCategoria(categoriaId) {
        // (pool) --> Para fazer a conexão com o banco
        await pool.query('UPDATE produtos SET status = 0 WHERE categoria_id = ?', [categoriaId])

    }

    async countByCategoria(categoriaId) {
        // Buscar a quantidade de produtos relacionado a CATEGORIA X
        // CATEGORIA ID 1 E TENHO 20 PRODUTOS RELACIONADOS A ESSA CATEGORIA, COMO EU RETORNO ESSE NÚMERO?
        const [rows] = await pool.query ('SELECT COUNT(*) as TOTAL FROM produtos WHERE categoria_id = ?', [categoriaId])

        // O return dele é uma lista, que vai te retornar o primeiro item que é o valor
        return rows[0].total;
    }

    async countDestaques() {
        // (COUNT) --> Função para contar a quantidade de linhas que tem em destaque igual a 1:
        const [rows] = await pool.query('SELECT COUNT (*) as total FROM produtos WHERE destaque = 1');
        return rows[0].total;
    }

    async createProduct(produto) {
    
    const [result] = await pool.query(`INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            produto.nome, 
            produto.descricao, 
            produto.preco, 
            produto.quantidade_estoque,
            produto.status, 
            produto.destaque, 
            produto.marca, 
            produto.modelo, 
            produto.garantia_meses, 
            produto.categoria_id
        ]
    )

    return result.insertId;
    }

    async updateProduct(id, produto) {
    
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
        categoria_id = ?
        WHERE id = ?
        `, [
        produto.nome,
        produto.descricao,
        produto.preco, 
        produto.quantidade_estoque, 
        produto.status, 
        produto.destaque, 
        produto.marca, 
        produto.modelo, 
        produto.garantia_meses, 
        produto.categoria_id, 
        id // O (id) não precisa de (produto.) pois já é um parâmetro
    ])

// Return result.linhasAfetadas:
        return result.affectedRows;
    }

    async deleteProduct(id) {
    const [result] = await pool.query(`DELETE FROM produtos WHERE id = ?`, [id])

    return result.affectedRows;
 
    }

    }

export default new ProductRepository()

