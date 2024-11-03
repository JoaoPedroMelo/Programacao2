import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const CadastroFornecedor = () => {
  const [fornecedor, setFornecedor] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor({ ...fornecedor, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    
    if (!fornecedor.nome) newErrors.nome = 'O nome do fornecedor é obrigatório.';
    if (!fornecedor.cnpj) newErrors.cnpj = 'O CNPJ é obrigatório.';
    if (!fornecedor.endereco) newErrors.endereco = 'O endereço é obrigatório.';
    if (!fornecedor.telefone) newErrors.telefone = 'O telefone é obrigatório.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Fornecedor cadastrado:', fornecedor);
      setSuccessMessage('Fornecedor cadastrado com sucesso!');
      setErrorMessage('');
      setFornecedor({
        nome: '',
        cnpj: '',
        endereco: '',
        telefone: ''
      });
    } else {
      setSuccessMessage('');
      setErrorMessage('Por favor, corrija os erros no formulário antes de enviar.');
    }
  };

  return (
    <>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomeFornecedor">
          <Form.Label>Nome do Fornecedor:</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={fornecedor.nome}
            onChange={handleChange}
            isInvalid={!!errors.nome}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nome}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formCnpjFornecedor">
          <Form.Label>CNPJ:</Form.Label>
          <Form.Control
            type="text"
            name="cnpj"
            value={fornecedor.cnpj}
            onChange={handleChange}
            isInvalid={!!errors.cnpj}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cnpj}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEnderecoFornecedor">
          <Form.Label>Endereço:</Form.Label>
          <Form.Control
            type="text"
            name="endereco"
            value={fornecedor.endereco}
            onChange={handleChange}
            isInvalid={!!errors.endereco}
          />
          <Form.Control.Feedback type="invalid">
            {errors.endereco}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formTelefoneFornecedor">
          <Form.Label>Telefone:</Form.Label>
          <Form.Control
            type="text"
            name="telefone"
            value={fornecedor.telefone}
            onChange={handleChange}
            isInvalid={!!errors.telefone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.telefone}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar Fornecedor
        </Button>
      </Form>
    </>
  );
};

export default CadastroFornecedor;
