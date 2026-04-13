// Responsabilidade do nosso controller hoje?: Tem regras de negócio (ifs), essas regras não deveriam estar no controller

import ProductModel from "../models/ProductModel.js";
import ProductRepository from "../repositories/ProductRepository.js";
import CategoryModel from "../models/CategoryModel.js";
import CategoryRepository from "../repositories/CategoryRepository.js";

// Estamos utilizando as {}, pelo jeito que importou de força individual, assim chamamos de forma individual:
import {
  validarCamposObrigatorios,
  validarPreco,
  validarEstoque,
} from "../validators/product.validator.js";

class ProductService {
  async listar() {
    return await ProductRepository.getAll();
  }

  async criarProduto(data) {
    // Quem vai validar os campos é o validators, só precisamos colocar os produtos:
    validarCamposObrigatorios(data);
    validarPreco(data);
    validarEstoque(data);

    // Chamei o getById e passei o id correto: Vai me retornar todas as informações da categoria!. Então eu preciso de uma variável para armazenar esse resultado
    let categoria = await CategoryRepository.getById(data.categoria_id);

    // Se não veio nenhum resultadp, significa que a categoria não existe:
    if (!categoria) {
      throw new Error("Categoria desativada!");
    }

    if (categoria.status === 0) {
      throw new Error(
        "Não é possível cadastrar produto em categorias desativadas!",
      );
    }

    // Se for 0 é falso (Não está em destaque), se for um é verdadeiro (Está em destaque):
    if (data.destaque) {
      const totalDestaques = await ProductRepository.countDestaques();

      if (totalDestaques >= 5) {
        throw new Error("Limite de produtos em destaque foi atingido!");
      }
    }

// Model --> Cuida da estrutura dos dados
// Repository --> Cuida do banco (INSERT, UPDATE, SELECT)
    const produto = new ProductModel(data);

// Se der tudo certo na validação desses 3 itens, criamos o produto:
    return await ProductRepository.createProduct(produto);
  }

  async atualizar(id, data) {
    // (!id) --> Verifica se esta vindo um id
    if (!id) {
      throw new Error("ID do produto é obrigatório!");
    }

    const produtoAtual = await ProductRepository.getById(id);

    if (!produtoAtual) {
      throw new Error("Produto não encontrado!");
    }

    if (data.categoria_id) {
      const categoria = await CategoryRepository.getById(data.categoria_id);

      if (!categoria || categoria.status === 0) {
        throw new Error("Categoria inválida ou desativada!");
      }
    }


    // Se encontrar o id, antes de atualizar o produto, precisa validar os campos:
    validarCamposObrigatorios(data);
    validarPreco(data);
    validarEstoque(data);

    if (data.destaque && !produtoAtual.destaque) {
      const totalDestaques = await ProductRepository.countDestaques();

      if (totalDestaques >= 5) {
        throw new Error("Limite de produtos em destaque foi atingido!");
      }
    }

// Model --> Cuida da estrutura dos dados
// Repository --> Cuida do banco (INSERT, UPDATE, SELECT)
    const produto = new ProductModel(data);

// Se der tudo certo na validação desses 3 itens, criamos o produto:
    return await ProductRepository.updateProduct(id, produto);
  }

  async deletar(id) {
    if (!id) {
      throw new Error("ID do produto é obrigatório!");
    }

    return await ProductRepository.deleteProduct(id);
  }
}

export default new ProductService();

