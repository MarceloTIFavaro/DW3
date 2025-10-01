const db = require('../../../database/databaseconfig');

const getAllClientes = async () => {
  return (
    await db.query(
      'SELECT * FROM clientes WHERE deleted = false ORDER BY nome ASC',
    )
  ).rows;
};

const getClienteByID = async (clienteIDPar) => {
  return (
    await db.query(
      'SELECT * FROM clientes WHERE clienteid = $1 AND deleted = false',
      [clienteIDPar],
    )
  ).rows;
};

const insertClientes = async (clienteREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'INSERT INTO clientes VALUES (default, $1, $2, $3, $4, $5)',
        [
          clienteREGPar.codigo,
          clienteREGPar.nome,
          clienteREGPar.endereco,
          clienteREGPar.ativo,
          clienteREGPar.deleted,
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlClientes|insertClientes] ' + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updateClientes = async (clienteREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE clientes SET codigo = $2, nome = $3, endereco = $4, ativo = $5, deleted = $6 WHERE clienteid = $1',
        [
          clienteREGPar.clienteid,
          clienteREGPar.codigo,
          clienteREGPar.nome,
          clienteREGPar.endereco,
          clienteREGPar.ativo,
          clienteREGPar.deleted,
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlClientes|updateClientes] ' + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deleteClientes = async (clienteREGPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE clientes SET deleted = true WHERE clienteid = $1',
        [clienteREGPar.clienteid],
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlClientes|deleteClientes] ' + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

module.exports = {
  getAllClientes,
  getClienteByID,
  insertClientes,
  updateClientes,
  deleteClientes,
};
