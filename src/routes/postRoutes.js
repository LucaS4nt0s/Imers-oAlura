import express from "express"; // Importa o framework Express.js para criar a aplicação web
import multer from "multer"; // Importa o middleware Multer para tratamento de uploads de arquivos
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200 
}
// Importa as funções controladoras para gerenciar posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Configura o armazenamento para arquivos de upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo para upload
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {

  // Habilita o middleware para analisar o corpo das requisições JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar todos os posts (tratada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single para um único arquivo "Imagem" e chama a função uploadImagem)
  app.post("/upload", upload.single("Imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);

};

// Exporta a função routes para uso em outro arquivo
export default routes;