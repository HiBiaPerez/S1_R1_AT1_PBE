// "server.js": Esse arquivo roda o servidor
// Anter o "Server.js" estava com todas as responsabilidades, agora apagamos tudo e cada arquivo tem a sua responsabilidade
import env from './config/env.js';
import app from "./app.js";

app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`)
})
// Agora "Server.js" é responsável por ligar no back-end para conseguirmos acessar


// SERVER -> APP (ROTAS CATEGORIAS GET) -> CATEGORIAS ROUTES -> indexCategories 
// server - app - routes - controller - service - repository 
//                                        |
//                                       model
// O service chama o model junto com o repository