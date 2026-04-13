// Segundo arquivo
// "app.js": Procurar o servidor 3000 e vai buscar a rota produtos
import express from 'express';
import cors from 'cors';
import ProdutosRoutes from './routes/product.routes.js'
import CategoriasRoutes from './routes/category.routes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express();
// Para o back-end entender que o front-end está enviando um "json"
app.use(cors());
app.use(express.json());


app.use("/produtos", ProdutosRoutes);
// categorias/LISTARTODASASCATEGORIAS
app.use("/categorias", CategoriasRoutes);

app.use(errorHandler);

export default app;