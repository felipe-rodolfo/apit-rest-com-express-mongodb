import express from "express";
import db from "./config/dbConnect.js";
import livros from './models/Livro.js';

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log("conexão com o banco feita com sucesso")
});

const app = express();

app.use(express.json());

// const livros = [
//     {id: 1, "titulo": "Senhor dos Aneis"},
//     {id: 2, "título": "O Hobbit"}
// ]

app.get('/livros', (req, res) => {
    livros.find((err, livros) => {
        res.status(200).json(livros)
    });
    
})

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso');
})

app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);
})

function buscaLivro(id){
    return livros.findIndex((item) => item.id == id);
}

app.delete('/livros/:id', (req, res) => {
    const {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.send(`Livro id: ${id} removido com sucesso`);
})

export default app;