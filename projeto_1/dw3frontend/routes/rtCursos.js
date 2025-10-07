var express = require('express');
var router = express.Router();
var cursosApp = require("../apps/cursos/controller/ctlCursos");

// Middleware de autenticação
function authenticationMiddleware(req, res, next) {
  const isLogged = req.session.isLogged;
  if (!isLogged) {
    return res.redirect("/Login");
  }
  next();
}

// Rota base (corrige o erro "Cannot GET /cursos")
router.get('/', authenticationMiddleware, (req, res) => {
  res.redirect('/cursos/ManutCursos');
});

// Rotas de cursos
router.get('/ManutCursos', authenticationMiddleware, cursosApp.manutCursos);
router.get('/InsertCursos', authenticationMiddleware, cursosApp.insertCursos);
router.get('/ViewCursos/:id', authenticationMiddleware, cursosApp.ViewCursos);
router.get('/UpdateCursos/:id', authenticationMiddleware, cursosApp.UpdateCurso);

router.post('/InsertCursos', authenticationMiddleware, cursosApp.insertCursos);
router.post('/UpdateCursos', authenticationMiddleware, cursosApp.UpdateCurso);
router.post('/DeleteCursos', authenticationMiddleware, cursosApp.DeleteCurso);

module.exports = router;
