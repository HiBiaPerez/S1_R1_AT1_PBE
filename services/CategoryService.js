import CategoryModel from "../models/CategoryModel.js";
import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepository.js";

class CategoryService {
  async getAll() {
    return await CategoryRepository.getAllCategories();
  }

  async createCategories(data) {
    // Model --> Cuida da estrutura dos dados
// Repository --> Cuida do banco (INSERT, UPDATE, SELECT)
    const categoria = new CategoryModel(data);

// Se der tudo certo na validação desses 3 itens, criamos o produto:
    return await CategoryRepository.createCategories(categoria);
  }

  async updateCategories(id, categoria) {
// Se der tudo certo na validação desses 3 itens, criamos o produto:
    return await CategoryRepository.updateCategories(id, categoria);
  }


  async desativar(id) {
    // (isNan) --> Se não for um número
    if (!id || isNaN(id)) {
      throw new Error("ID da categoria é obrigatório!");
    }

    const categoria = CategoryModel.getById(id);

    if (!categoria) {
      throw new Error("Categoria não encontrada!");
    }

    // Desativando a categoria encontrada!:
    await CategoryModel.updateStatus(id, 0);

    // Desativando produtos da categoria:
    await CategoryRepository.desativarPorCategoria(id);

    return { message: "Categoria e produtos desativados com sucesso!" };
  }

  async deleteCategories(id) {
    const totalProdutos = await ProductRepository.countByCategoria(id);

    // Se produtos for maior que zero, significa que tem produto nessa categoria, então não podemos excluir ela
    if (totalProdutos > 0) {
      throw new Error(
        "Não é possível excluir categorias com produtos vinculados!",
      );
    }

    console.log(totalProdutos)

    return await CategoryRepository.deleteCategories(id);
  }
}

export default new CategoryService();

// ROTAS -> CONTROLLER -> SERVICES