const mdlPedidos = require("../model/mdlPedidos");

const getAllPedidos = (req, res) =>
  (async () => {
    try {
      let registro = await mdlPedidos.getAllPedidos();

      // formatar a data para yyyy-mm-dd
      for (let i = 0; i < registro.length; i++) {
        const row = registro[i];
        if (row.data) {
          row.data = row.data.toISOString().split("T")[0];
        }
      }

      res.json({ status: "ok", registro: registro });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

const getPedidoByID = (req, res) =>
  (async () => {
    try {
      const pedidoID = parseInt(req.body.pedidoid);
      let registro = await mdlPedidos.getPedidoByID(pedidoID);

      if (registro && registro.data) {
        registro.data = registro.data.toISOString().split("T")[0];
      }

      res.json({ status: "ok", registro: registro });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

const insertPedidos = (req, res) =>
  (async () => {
    try {
      const pedidoREG = req.body;
      let { msg, linhasAfetadas } = await mdlPedidos.insertPedidos(pedidoREG);
      res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

const updatePedidos = (req, res) =>
  (async () => {
    try {
      const pedidoREG = req.body;
      let { msg, linhasAfetadas } = await mdlPedidos.updatePedidos(pedidoREG);
      res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

const deletePedidos = (req, res) =>
  (async () => {
    try {
      const pedidoREG = req.body;
      let { msg, linhasAfetadas } = await mdlPedidos.deletePedidos(pedidoREG);
      res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "erro", message: error.message });
    }
  })();

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos
};
