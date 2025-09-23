const db = require("../../../database/databaseconfig");

// Buscar todos os pedidos (somente os não deletados)
const getAllPedidos = async () => {
  try {
    const sql = `
      SELECT pedidoid, numero, data, valortotal, clienteid, deleted
      FROM pedidos
      WHERE deleted = false
      ORDER BY pedidoid
    `;
    const result = await db.query(sql);
    return result.rows;
  } catch (err) {
    throw new Error("Erro ao buscar pedidos: " + err.message);
  }
};

// Buscar pedido por ID
const getPedidoByID = async (pedidoid) => {
  try {
    const sql = `
      SELECT pedidoid, numero, data, valortotal, clienteid, deleted
      FROM pedidos
      WHERE pedidoid = $1 AND deleted = false
    `;
    const result = await db.query(sql, [pedidoid]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Erro ao buscar pedido por ID: " + err.message);
  }
};

// Inserir pedido
const insertPedidos = async (pedido) => {
  try {
    const sql = `
      INSERT INTO pedidos (numero, data, valortotal, clienteid, deleted)
      VALUES ($1, $2, $3, $4, false)
      RETURNING pedidoid
    `;
    const values = [pedido.numero, pedido.data, pedido.valortotal, pedido.clienteid];
    const result = await db.query(sql, values);

    return { msg: "ok", linhasAfetadas: result.rowCount };
  } catch (err) {
    return { msg: "erro: " + err.message, linhasAfetadas: -1 };
  }
};

// Atualizar pedido
const updatePedidos = async (pedido) => {
  try {
    const sql = `
      UPDATE pedidos
      SET numero = $1, data = $2, valortotal = $3, clienteid = $4, deleted = $5
      WHERE pedidoid = $6
    `;
    const values = [pedido.numero, pedido.data, pedido.valortotal, pedido.clienteid, pedido.deleted, pedido.pedidoid];
    const result = await db.query(sql, values);

    return { msg: "ok", linhasAfetadas: result.rowCount };
  } catch (err) {
    return { msg: "erro: " + err.message, linhasAfetadas: -1 };
  }
};

// Exclusão lógica do pedido
const deletePedidos = async (pedido) => {
  try {
    const sql = `
      UPDATE pedidos
      SET deleted = true
      WHERE pedidoid = $1
    `;
    const result = await db.query(sql, [pedido.pedidoid]);

    return { msg: "ok", linhasAfetadas: result.rowCount };
  } catch (err) {
    return { msg: "erro: " + err.message, linhasAfetadas: -1 };
  }
};

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos
};
