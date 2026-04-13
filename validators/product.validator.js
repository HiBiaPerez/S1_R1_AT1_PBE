import e from "cors";

export function validarCamposObrigatorios(produto) {
    const camposObrigatorios = ["nome", "preco", "descricao"]
    // Variável auxiliar:
    const camposFaltando = [];

    camposObrigatorios.forEach((campo) => {
        if(produto[campo] === undefined || produto[campo] === null || produto[campo].toString().trim() === "") {
            camposFaltando.push(campo)
    // .trim() --> Serve para remover espaços e vira "" e forçando a resposta vir em string
        }

            
    })

    if(camposFaltando.length > 0) {
        // .join() --> É utilizado para juntar, transformar todos os elementos do array
        // em uma única string!
        // EXEMPLO: const frutas = ["Maça", "Banana", "Uva"];
        // console.log(fruntas.join()) --> Maça, Banana, Uva
        // .join(" - ")
        throw new Error(`Campos obrigatórios não preenchidos: ${camposFaltando.join(", ")}`)
    }
}


export function validarPreco(produto) {
    // ! = = 
    // typeof --> Determina o tipo de dado
    if (typeof produto.preco !== "number" || produto.preco <= 0) {
        throw new   error ("O preço deve ser um número maior que zero!")
    }
}

export function validarEstoque(produto) {
    if (produto.estoque === null || produto.estoque < 0) {
        throw new   error("O estoque não pode ser negativo!")
    }
}