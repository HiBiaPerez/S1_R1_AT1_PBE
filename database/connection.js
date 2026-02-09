// Para fazer a conexão com o banco de dados
import mysql from "mysql2/promise"
import env from "../config/env.js"


const pool = mysql.createPool(env.db);

console.log("Pool MySQL criado.");

export default pool;