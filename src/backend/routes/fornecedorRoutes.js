const express = require('express');
const router = express.Router();
const pool = require('../db');

// Criar novo fornecedor
router.post('/', async (req, res) => {
    const { nome, cnpj, endereco, telefone } = req.body;
    console.log(req.body); // Verifique o que está chegando aqui
  
    try {
      const result = await pool.query(
        'INSERT INTO fornecedores (nome, cnpj, endereco, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, cnpj, endereco, telefone]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error); // Adicione um console.error para detalhes do erro
      res.status(400).json({ error: error.message });
    }
  });
  

// Listar todos os fornecedores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fornecedores ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar fornecedor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, endereco, telefone } = req.body;
  try {
    const result = await pool.query(
      'UPDATE fornecedores SET nome = $1, cnpj = $2, endereco = $3, telefone = $4 WHERE id = $5 RETURNING *',
      [nome, cnpj, endereco, telefone, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Excluir fornecedor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM fornecedores WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    res.json({ message: 'Fornecedor excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
