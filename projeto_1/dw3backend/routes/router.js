const express = require('express');
const routerApp = express.Router();

const appPedidos= require('../apps/pedidos/controller/ctlPedidos');
const appClientes = require('../apps/clientes/controller/ctlClientes');
const appAlunos = require('../apps/alunos/controller/ctlAlunos');
const appCursos = require('../apps/cursos/controller/ctlCursos');
const appLogin = require('../apps/login/controller/ctlLogin');

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get('/', (req, res) => {
  res.send('Olá mundo!');
});

//Rotas de Predidos
routerApp.get('/getAllPedidos', appLogin.AutenticaJWT, appPedidos.getAllPedidos);
routerApp.post('/getPedidoByID', appLogin.AutenticaJWT, appPedidos.getPedidoByID);
routerApp.post('/insertPedidos', appLogin.AutenticaJWT, appPedidos.insertPedidos);
routerApp.post('/updatePedidos', appLogin.AutenticaJWT, appPedidos.updatePedidos);
routerApp.post('/deletePedidos', appLogin.AutenticaJWT, appPedidos.deletePedidos);

//Rotas de Clientes
routerApp.get('/getAllClientes', appLogin.AutenticaJWT, appClientes.getAllClientes);
routerApp.post('/getClienteByID', appLogin.AutenticaJWT, appClientes.getClienteByID);
routerApp.post('/insertClientes', appLogin.AutenticaJWT, appClientes.insertClientes);
routerApp.post('/updateClientes', appLogin.AutenticaJWT, appClientes.updateClientes);
routerApp.post('/deleteClientes', appLogin.AutenticaJWT, appClientes.deleteClientes);

//Rotas de Alunos
routerApp.get('/getAllAlunos', appLogin.AutenticaJWT, appAlunos.getAllAlunos);
routerApp.post('/getAlunoByID', appLogin.AutenticaJWT, appAlunos.getAlunoByID);
routerApp.post('/insertAlunos', appLogin.AutenticaJWT, appAlunos.insertAlunos);
routerApp.post('/updateAlunos', appLogin.AutenticaJWT, appAlunos.updateAlunos);
routerApp.post('/DeleteAlunos', appLogin.AutenticaJWT, appAlunos.DeleteAlunos);

//Rotas de Cursos
routerApp.get('/GetAllCursos', appLogin.AutenticaJWT, appCursos.GetAllCursos);
routerApp.post('/GetCursoByID', appLogin.AutenticaJWT, appCursos.GetCursoByID);
routerApp.post('/InsertCursos', appLogin.AutenticaJWT, appCursos.InsertCursos);
routerApp.post('/UpdateCursos', appLogin.AutenticaJWT, appCursos.UpdateCursos);
routerApp.post('/DeleteCursos', appLogin.AutenticaJWT, appCursos.DeleteCursos);

// Rota Login
routerApp.post('/Login', appLogin.Login);
routerApp.post('/Logout', appLogin.Logout);

module.exports = routerApp;
