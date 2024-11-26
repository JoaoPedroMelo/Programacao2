// Função para inserir um novo fornecedor
const inserirFornecedor = async (fornecedor) => {
    const { nome, cnpj, endereco, telefone } = fornecedor;
    const query = `
      INSERT INTO fornecedores (nome, cnpj, endereco, telefone)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    try {
      const res = await pool.query(query, [nome, cnpj, endereco, telefone]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao inserir fornecedor:', err.message);
      throw err;
    }
  };
  
  // Função para listar todos os fornecedores
  const listarFornecedores = async () => {
    const query = 'SELECT * FROM fornecedores;';
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      console.error('Erro ao listar fornecedores:', err.message);
      throw err;
    }
  };
  
  // Função para atualizar um fornecedor
  const atualizarFornecedor = async (id, fornecedor) => {
    const { nome, cnpj, endereco, telefone } = fornecedor;
    const query = `
      UPDATE fornecedores
      SET nome = $1, cnpj = $2, endereco = $3, telefone = $4
      WHERE id = $5
      RETURNING *;
    `;
    try {
      const res = await pool.query(query, [nome, cnpj, endereco, telefone, id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar fornecedor:', err.message);
      throw err;
    }
  };
  
  // Função para excluir um fornecedor
  const excluirFornecedor = async (id) => {
    const query = 'DELETE FROM fornecedores WHERE id = $1 RETURNING *;';
    try {
      const res = await pool.query(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao excluir fornecedor:', err.message);
      throw err;
    }
  };
  
  module.exports = {
    inserirFornecedor,
    listarFornecedores,
    atualizarFornecedor,
    excluirFornecedor,
  };