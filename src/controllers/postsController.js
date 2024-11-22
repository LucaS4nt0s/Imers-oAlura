import fs from "fs"; // Importa o módulo fs do Node.js para trabalhar com o sistema de arquivos
import { getTodosPosts, criarPost, atualizarPost } from "../models/postModel.js"; // Importa as funções para obter todos os posts e criar um novo post do módulo postModel
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Obtém todos os posts do banco de dados (ou da fonte de dados)
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON
    res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const novoPost = req.body;

    try {
        // Tenta criar o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com status 200 (sucesso) e o post criado
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra algum erro, loga o erro no console e envia uma resposta com status 500 (erro interno do servidor)
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    // Cria um objeto com os dados do novo post, incluindo o nome original da imagem
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Tenta criar o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Constrói o nome da imagem com o ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo da imagem para o novo nome
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia uma resposta HTTP com status 200 (sucesso) e o post criado
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra algum erro, loga o erro no console e envia uma resposta com status 500 (erro interno do servidor)
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

// Função assíncrona para criar um novo post
export async function atualizarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem, 
            descricao: descricao,
            alt: req.body.alt
        }
        // Tenta criar o novo post no banco de dados
        const postCriado = await atualizarPost(id, post);
        // Envia uma resposta HTTP com status 200 (sucesso) e o post criado
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra algum erro, loga o erro no console e envia uma resposta com status 500 (erro interno do servidor)
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}