const express = require("express");
const routerApp = express.Router();

const appAlunos = require("../apps/alunos/controller/ctlAlunos");
const appCursos = require("../apps/cursos/controller/ctlCursos");
const appLogin = require("../apps/login/controller/ctlLogin");
const appPedidos = require("../apps/pedidos/controller/ctlPedidos");
const appClientes = require("../apps/clientes/controller/ctlClientes");

routerApp.use((req, res, next) => {
  next();
});

//Rota página principal
routerApp.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Teste de API</title>
      <style>
        body { font-family: sans-serif; padding: 20px; }
        button { font-size: 16px; padding: 10px 15px; cursor: pointer; }
        pre { background-color: #f4f4f4; padding: 15px; border: 1px solid #ddd; word-wrap: break-word; }
      </style>
    </head>
    <body>
      <h1>Olá mundo!</h1>
      <button id="loginButton">Testar Login (qwe/qwe)</button>
      <h2>Resultado:</h2>
      <pre id="resultado">Clique no botão para ver o resultado da requisição.</pre>

      <script>
        document.getElementById('loginButton').addEventListener('click', async () => {
          const resultadoEl = document.getElementById('resultado');
          resultadoEl.textContent = 'Enviando requisição...';

          try {
            const response = await fetch('/Login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: 'qwe',
                password: 'qwe'
              })
            });

            const data = await response.json();
            resultadoEl.textContent = JSON.stringify(data, null, 2);

            // Log no console do navegador para mais detalhes
            console.log('Resposta completa:', response);
            console.log('Dados recebidos:', data);

          } catch (error) {
            resultadoEl.textContent = 'Erro ao fazer a requisição. Verifique o console do servidor e do navegador.\\n\\n' + error.message;
            console.error('Erro no fetch:', error);
          }
        });
      </script>
    </body>
    </html>
  `);
});

//Rotas de Alunos
routerApp.get("/getAllAlunos", appLogin.AutenticaJWT, appAlunos.getAllAlunos);
routerApp.post("/getAlunoByID", appLogin.AutenticaJWT, appAlunos.getAlunoByID);
routerApp.post("/insertAlunos", appLogin.AutenticaJWT, appAlunos.insertAlunos);
routerApp.post("/updateAlunos", appLogin.AutenticaJWT, appAlunos.updateAlunos);
routerApp.post("/DeleteAlunos", appLogin.AutenticaJWT, appAlunos.DeleteAlunos);

//Rotas de Cursos
routerApp.get("/GetAllCursos", appLogin.AutenticaJWT, appCursos.GetAllCursos);
routerApp.post("/GetCursoByID", appLogin.AutenticaJWT, appCursos.GetCursoByID);
routerApp.post("/InsertCursos", appLogin.AutenticaJWT, appCursos.InsertCursos);
routerApp.post("/UpdateCursos", appLogin.AutenticaJWT, appCursos.UpdateCursos);
routerApp.post("/DeleteCursos", appLogin.AutenticaJWT, appCursos.DeleteCursos);

//Rotas de Pedidos
routerApp.get("/getAllPedidos", appLogin.AutenticaJWT, appPedidos.getAllPedidos);
routerApp.post("/getPedidoByID", appLogin.AutenticaJWT, appPedidos.getPedidoByID);
routerApp.post("/insertPedidos", appLogin.AutenticaJWT, appPedidos.insertPedidos);
routerApp.post("/updatePedidos", appLogin.AutenticaJWT, appPedidos.updatePedidos);
routerApp.post("/deletePedidos", appLogin.AutenticaJWT, appPedidos.deletePedidos);

//Rotas de Clientes
routerApp.get("/getAllClientes", appLogin.AutenticaJWT, appClientes.getAllClientes);
routerApp.post("/getClienteByID", appLogin.AutenticaJWT, appClientes.getClienteByID);
routerApp.post("/insertClientes", appLogin.AutenticaJWT, appClientes.insertClientes);
routerApp.post("/updateClientes", appLogin.AutenticaJWT, appClientes.updateClientes);
routerApp.post("/deleteClientes", appLogin.AutenticaJWT, appClientes.deleteClientes);


// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;