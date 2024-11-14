import { useState } from 'react';
import { Form, Button, Alert, Table, Modal } from 'react-bootstrap';

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    categoria: '',
    descricao: ''
  });
  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Para saber se está editando ou cadastrando
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal de exclusão
  const [deleteIndex, setDeleteIndex] = useState(null); // Índice do produto a ser excluído

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
      if (isEditing) {
        // Atualizar o produto existente
        const updatedProdutos = produtos.map((p, index) =>
          index === deleteIndex ? produto : p
        );
        setProdutos(updatedProdutos);
        setSuccessMessage('Produto atualizado com sucesso!');
      } else {
        // Adicionar novo produto
        setProdutos([...produtos, produto]);
        setSuccessMessage('Produto cadastrado com sucesso!');
      }
      
      setErrorMessage('');
      setProduto({
        nome: '',
        preco: '',
        categoria: '',
        descricao: ''
      });
      setIsEditing(false); // Reseta o estado de edição
    } else {
      setSuccessMessage('');
      setErrorMessage('Por favor, corrija os erros no formulário antes de enviar.');
    }
  };

  const handleEdit = (index) => {
    setProduto(produtos[index]);
    setIsEditing(true); // Marca como edição
    setDeleteIndex(index); // Define o índice para edição
  };

  const handleDelete = () => {
    const updatedProdutos = produtos.filter((_, i) => i !== deleteIndex);
    setProdutos(updatedProdutos);
    setShowDeleteModal(false); // Fechar o modal
    setDeleteIndex(null); // Resetar o índice de exclusão
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Fechar o modal de confirmação
    setDeleteIndex(null); // Resetar o índice de exclusão
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
          {isEditing ? 'Atualizar Produto' : 'Cadastrar Produto'}
        </Button>
      </Form>

      <h3>Lista de Produtos</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((prod, index) => (
            <tr key={index}>
              <td>{prod.nome}</td>
              <td>{prod.preco}</td>
              <td>{prod.categoria}</td>
              <td>{prod.descricao}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(index)}>Editar</Button>
                <Button variant="danger" onClick={() => { setDeleteIndex(index); setShowDeleteModal(true); }}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir este produto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CadastroProduto;
