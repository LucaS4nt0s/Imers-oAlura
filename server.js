import express from "express"; // Importa o framework Express.js para criar a aplicação web
import routes from "./src/routes/postRoutes.js"; // Importa as rotas definidas no arquivo postRoutes.js

const app = express(); // Cria uma instância do aplicativo Express para iniciar o servidor

app.use(express.static("uploads"));

routes(app); // Chama a função routes para configurar as rotas da aplicação na instância do Express

app.listen(3000, () => { // Inicia o servidor na porta 3000 e exibe uma mensagem no console
  console.log("Servidor escutando...");
});

