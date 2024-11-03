import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TelaLogin = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === '12345') {
      setUser(credentials.username);
      setError('');
      navigate('/menu-inicial'); // Redireciona para a tela de menu inicial
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Usuário:</Form.Label>
          <Form.Control type="text" name="username" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Senha:</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default TelaLogin;
