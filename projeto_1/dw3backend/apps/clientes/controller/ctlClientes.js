const mdlClientes = require("../model/mdlClientes");

const getAllClientes = (req, res) =>
  (async () => {
    try {
      let registro = await mdlClientes.getAllClientes();
      res.json({ status: "ok", registro: registro });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

const getClienteByID = (req, res) =>
  (async () => {
    try {
      const clienteID = parseInt(req.body.clienteid);
      let registro = await mdlClientes.getClienteByID(clienteID);
      res.json({ status: "ok", registro: registro });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

const insertClientes = (req, res) =>
  (async () => {
    try {
      const clienteREG = req.body;
      let { msg, linhasAfetadas } = await mdlClientes.insertClientes(clienteREG);
      res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

const updateClientes = (req, res) =>
  (async () => {
    try {
      const clienteREG = req.body;
      let { msg, linhasAfetadas } = await mdlClientes.updateClientes(clienteREG);
      res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

const deleteClientes = (req, res) =>
  (async () => {
    try {
      const clienteREG = req.body;
      let { msg, linhasAfetadas } = await mdlClientes.deleteClientes(clienteREG);
      res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

module.exports = {
  getAllClientes,
  getClienteByID,
  insertClientes,
  updateClientes,
  deleteClientes
};
