// 2026-03-30
// middleware: É uma função que vai "ficar no caminho"
// Entre a requisição do usuário (request) e a resposta do servidor (response)
function errorHandler(err, req, res, next) {
    console.log(err);

    res.status(400).json({
        error: err.message
    })
}

export default errorHandler