import { useState } from 'react';
import { Form, Button, Alert, Table, Modal } from 'react-bootstrap';

const TelaCadastroFornecedor = () => {
  // Estado para armazenar os dados do formulário e a lista de fornecedores
  const [fornecedor, setFornecedor] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: ''
  });
  const [fornecedores, setFornecedores] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);  // Controla a visibilidade do formulário
  const [editingIndex, setEditingIndex] = useState(null); // Índice do fornecedor sendo editado
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Controla o modal de exclusão
  const [deleteIndex, setDeleteIndex] = useState(null); // Armazena o índice do fornecedor a ser excluído

  // Função para atualizar o estado dos dados do fornecedor
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor({ ...fornecedor, [name]: value });
  };

  // Função para validar os dados do formulário
  const validate = () => {
    let newErrors = {};
    
    if (!fornecedor.nome) newErrors.nome = 'O nome do fornecedor é obrigatório.';
    if (!fornecedor.cnpj) newErrors.cnpj = 'O CNPJ é obrigatório.';
    if (!fornecedor.endereco) newErrors.endereco = 'O endereço é obrigatório.';
    if (!fornecedor.telefone) newErrors.telefone = 'O telefone é obrigatório.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para manipular a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (editingIndex !== null) {
        // Atualizar fornecedor
        const updatedFornecedores = [...fornecedores];
        updatedFornecedores[editingIndex] = fornecedor;
        setFornecedores(updatedFornecedores);
        setSuccessMessage('Fornecedor atualizado com sucesso!');
      } else {
        // Adicionar novo fornecedor
        setFornecedores([...fornecedores, fornecedor]);
        setSuccessMessage('Fornecedor cadastrado com sucesso!');
      }
      setErrorMessage('');
      setFornecedor({ nome: '', cnpj: '', endereco: '', telefone: '' });
      setEditingIndex(null);  // Resetar o índice de edição
    } else {
      setSuccessMessage('');
      setErrorMessage('Por favor, corrija os erros no formulário antes de enviar.');
    }
  };

  // Função para excluir um fornecedor da lista
  const handleDelete = () => {
    const updatedFornecedores = fornecedores.filter((_, i) => i !== deleteIndex);
    setFornecedores(updatedFornecedores);
    setShowDeleteModal(false);  // Fechar o modal
    setDeleteIndex(null);  // Resetar o índice de exclusão
  };

  // Função para cancelar a exclusão
  const handleCancelDelete = () => {
    setShowDeleteModal(false);  // Fechar o modal de confirmação
    setDeleteIndex(null);  // Resetar o índice de exclusão
  };

  // Função para editar um fornecedor da lista
  const handleEdit = (index) => {
    setFornecedor(fornecedores[index]);
    setEditingIndex(index);  // Marcar o índice do fornecedor para edição
    setIsFormVisible(true);  // Exibir o formulário para edição
  };

  return (
    <div>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Button variant="secondary" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Ver Fornecedores' : 'Cadastrar Fornecedor'}
      </Button>

      {isFormVisible ? (
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
            {editingIndex !== null ? 'Atualizar Fornecedor' : 'Cadastrar Fornecedor'}
          </Button>
        </Form>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor, index) => (
              <tr key={index}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.telefone}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(index)}>Editar</Button>
                  <Button variant="danger" onClick={() => { setDeleteIndex(index); setShowDeleteModal(true); }}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir este fornecedor?
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
    </div>
  );
};

export default TelaCadastroFornecedor;
