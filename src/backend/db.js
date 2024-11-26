const { Pool } = require('pg');

// Configuração do pool de conexões
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'fornecedores',
  password: '123',
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
