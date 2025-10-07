const axios = require("axios");
const moment = require("moment");

//@ LISTAR CURSOS
const manutCursos = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllCursos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      res.render("cursos/view/vwManutCursos.njk", {
        title: "Manutenção de cursos",
        data: resp.data.registro,
        erro: null,
        userName: userName,
      });

    } catch (error) {
      let remoteMSG;
      if (error.code === "ECONNREFUSED") remoteMSG = "Servidor indisponível";
      else if (error.code === "ERR_BAD_REQUEST") remoteMSG = "Usuário não autenticado";
      else remoteMSG = error.message;

      res.render("cursos/view/vwManutCursos.njk", {
        title: "Manutenção de cursos",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    }
  })();

// =======================================================================
// ================== FUNÇÃO DE INSERIR CURSO COM DIAGNÓSTICO ==================
// =======================================================================
const insertCursos = async (req, res) =>
  (async () => {
    if (req.method === "GET") {
      return res.render("cursos/view/vwFCrCursos.njk", {
        title: "Cadastro de cursos",
        data: null,
        erro: null,
        userName: req.session.userName,
      });
    } else {
      const regData = req.body;
      const token = req.session.token;

      try {
        // Faz a chamada para o backend
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertCursos", regData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          timeout: 5000,
        });

        // ======================= LINHA DE DIAGNÓSTICO ESSENCIAL =======================
        // Esta linha vai nos mostrar a resposta exata do backend no seu terminal
        console.log('RESPOSTA COMPLETA DO BACKEND:', JSON.stringify(response.data, null, 2));
        // ============================================================================

        // Interpreta a resposta do backend
        if (response.data.status === "ok") {
          res.json({
            status: "ok",
            msg: "Curso cadastrado com sucesso!"
          });
        } else {
          res.json({
            status: "error",
            msg: response.data.status
          });
        }

      } catch (error) {
        console.error("[ctlCursos|insertCursos] A CHAMADA AXIOS FALHOU:", error.message);
        
        if (error.response) {
          console.error('DADOS DO ERRO:', error.response.data);
          console.error('STATUS DO ERRO:', error.response.status);
        }

        res.status(500).json({
          status: "error",
          msg: "Falha na comunicação com o servidor backend."
        });
      }
    }
  })();
// =======================================================================
// ================== FIM DA FUNÇÃO DE INSERIR CURSO =====================
// =======================================================================


//@ VISUALIZAR CURSO
const ViewCursos = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      const id = req.params.id;
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/getCursoByID",
        { cursoid: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

      if (response.data.status === "ok") {
        res.render("cursos/view/vwFRUDrCursos.njk", {
          title: "Visualização de curso",
          data: response.data.registro[0],
          disabled: true,
          userName: userName,
        });
      } else {
        console.log("[ctlCursos|ViewCursos] Curso não localizado!");
        res.redirect("/cursos");
      }

    } catch (error) {
      console.error("[ctlCursos|ViewCursos] Erro ao buscar curso:", error.message);
      res.json({ status: "Erro ao buscar curso" });
    }
  })();

//@ ATUALIZAR CURSO
const UpdateCurso = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      if (req.method === "GET") {
        const id = req.params.id;

        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/getCursoByID",
          { cursoid: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          });

        if (response.data.status === "ok") {
          res.render("cursos/view/vwFRUDrCursos.njk", {
            title: "Atualização de curso",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlCursos|UpdateCurso] Curso não localizado!");
        }

      } else {
        const regData = req.body;
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateCursos", regData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          timeout: 5000,
        });

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      }
    } catch (error) {
      console.error("[ctlCursos|UpdateCurso] Erro ao atualizar curso:", error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();

//@ DELETAR CURSO
const DeleteCurso = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteCursos", regData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        timeout: 5000,
      });

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });

    } catch (error) {
      console.error("[ctlCursos|DeleteCurso] Erro ao deletar curso:", error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();

module.exports = {
  manutCursos,
  insertCursos,
  ViewCursos,
  UpdateCurso,
  DeleteCurso,
};