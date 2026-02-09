// Segundo arquivo
// "app.js": Procurar o servidor 3000 e vai buscar a rota produtos
import express from 'express';
import ProdutosRoutes from './routes/ProdutosRoutes.js'
import CategoriasRoutes from './routes/CategoriasRoutes.js'

const app = express();
// Para o back-end entender que o front-end está enviando um "json"
app.use(express.json());


app.use("/produtos", ProdutosRoutes);

app.use("/categorias", CategoriasRoutes);

export default app;