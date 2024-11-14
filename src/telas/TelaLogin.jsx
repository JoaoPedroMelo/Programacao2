import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

const TelaLogin = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializando o navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'senha123') {
      setUser(username);  // Armazenando o usuário logado
      setErrorMessage('');
      navigate('/menu-inicial'); // Redirecionando para a tela de menu inicial
    } else {
      setErrorMessage('Credenciais inválidas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Usuário</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Entrar</Button>
      </Form>
    </div>
  );
};

export default TelaLogin;
