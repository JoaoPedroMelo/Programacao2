import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    categoria: '',
    descricao: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    
    if (!produto.nome) newErrors.nome = 'O nome do produto é obrigatório.';
    if (!produto.preco) {
      newErrors.preco = 'O preço é obrigatório.';
    } else if (isNaN(produto.preco) || produto.preco <= 0) {
      newErrors.preco = 'O preço deve ser um número positivo.';
    }
    if (!produto.categoria) newErrors.categoria = 'A categoria é obrigatória.';
    if (!produto.descricao) newErrors.descricao = 'A descrição é obrigatória.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Produto cadastrado:', produto);
      setSuccessMessage('Produto cadastrado com sucesso!');
      setErrorMessage('');
      setProduto({
        nome: '',
        preco: '',
        categoria: '',
        descricao: ''
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
        <Form.Group controlId="formNomeProduto">
          <Form.Label>Nome do Produto:</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            isInvalid={!!errors.nome}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nome}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPrecoProduto">
          <Form.Label>Preço:</Form.Label>
          <Form.Control
            type="number"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            isInvalid={!!errors.preco}
          />
          <Form.Control.Feedback type="invalid">
            {errors.preco}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formCategoriaProduto">
          <Form.Label>Categoria:</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            isInvalid={!!errors.categoria}
          />
          <Form.Control.Feedback type="invalid">
            {errors.categoria}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formDescricaoProduto">
          <Form.Label>Descrição:</Form.Label>
          <Form.Control
            as="textarea"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            isInvalid={!!errors.descricao}
          />
          <Form.Control.Feedback type="invalid">
            {errors.descricao}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar Produto
        </Button>
      </Form>
    </>
  );
};

export default CadastroProduto;
