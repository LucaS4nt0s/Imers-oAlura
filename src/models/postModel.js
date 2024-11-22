import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js"; // Importa a função para conectar ao banco de dados

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Estabelece a conexão com o banco de dados usando a string de conexão do ambiente

export async function getTodosPosts() { // Função assíncrona para obter todos os posts
    const db = conexao.db("Imersao-instabytes"); // Seleciona o banco de dados "Imersao-instabytes"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados
    return colecao.find().toArray(); // Executa uma consulta para encontrar todos os documentos na coleção e retorna os resultados como um array
}

export async function criarPost(novoPost) { // Função assíncrona para criar um novo post
    const db = conexao.db("Imersao-instabytes"); // Seleciona o banco de dados "Imersao-instabytes"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados
    return colecao.insertOne(novoPost); // Insere um novo documento na coleção com os dados do novo post
}

export async function atualizarPost(id, novoPost) { // Função assíncrona para criar um novo post
    const db = conexao.db("Imersao-instabytes"); // Seleciona o banco de dados "Imersao-instabytes"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost}); // Insere um novo documento na coleção com os dados do novo post
}
