import { useState, useEffect } from 'react';
import { Form, Button, Alert, Table, Modal } from 'react-bootstrap';

const TelaCadastroFornecedor = () => {
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
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [editingId, setEditingId] = useState(null); // Armazena o ID do fornecedor em edição
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Armazena o ID do fornecedor a ser excluído

  // Função para carregar fornecedores do backend
  const fetchFornecedores = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/fornecedores');
      const data = await response.json();
      setFornecedores(data);
    } catch (error) {
      setErrorMessage('Erro ao carregar fornecedores.');
    }
  };

  // Carrega fornecedores ao montar o componente
  useEffect(() => {
    fetchFornecedores();
  }, []);

  // Atualiza o estado dos dados do fornecedor
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor({ ...fornecedor, [name]: value });
  };

  // Validação de formulário
  const validate = () => {
    let newErrors = {};
    if (!fornecedor.nome) newErrors.nome = 'O nome do fornecedor é obrigatório.';
    if (!fornecedor.cnpj) newErrors.cnpj = 'O CNPJ é obrigatório.';
    if (!fornecedor.endereco) newErrors.endereco = 'O endereço é obrigatório.';
    if (!fornecedor.telefone) newErrors.telefone = 'O telefone é obrigatório.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submeter formulário (cadastrar ou atualizar)const handleSubmit = async (e) => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validate()) {
        try {
          const method = editingId ? 'PUT' : 'POST';
          const url = editingId
            ? `http://localhost:5000/api/fornecedores/${editingId}`
            : 'http://localhost:5000/api/fornecedores';
    
          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fornecedor),
          });
    
          // Verificar o status da resposta e exibir um erro mais detalhado
          if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Erro no servidor:', errorDetails);  // Imprime detalhes do erro
            throw new Error(errorDetails.message || `Erro ao salvar fornecedor. Status: ${response.status}`);
          }
    
          setSuccessMessage(editingId ? 'Fornecedor atualizado com sucesso!' : 'Fornecedor cadastrado com sucesso!');
          setFornecedor({ nome: '', cnpj: '', endereco: '', telefone: '' });
          setEditingId(null);
          fetchFornecedores();
        } catch (error) {
          console.error('Erro ao salvar fornecedor:', error);  // Exibe o erro detalhado no console
          setErrorMessage(error.message || 'Erro ao salvar fornecedor.');
        }
      }
    };    
    

  // Editar fornecedor
  const handleEdit = (id) => {
    const fornecedorToEdit = fornecedores.find((f) => f.id === id);
    setFornecedor(fornecedorToEdit);
    setEditingId(id);
    setIsFormVisible(true);
  };

  // Confirmar exclusão
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/fornecedores/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir fornecedor.');

      setSuccessMessage('Fornecedor excluído com sucesso!');
      setShowDeleteModal(false);
      fetchFornecedores();
    } catch (error) {
      setErrorMessage('Erro ao excluir fornecedor.');
    }
  };

  // Função para limpar as mensagens de sucesso ou erro
  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 5000);
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      clearMessages();
    }
  }, [successMessage, errorMessage]);

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
            <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.cnpj}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            {editingId ? 'Atualizar Fornecedor' : 'Cadastrar Fornecedor'}
          </Button>
          {editingId && (
            <Button variant="secondary" onClick={() => setEditingId(null)}>
              Cancelar
            </Button>
          )}
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
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.telefone}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(fornecedor.id)}>Editar</Button>
                  <Button variant="danger" onClick={() => { setDeleteId(fornecedor.id); setShowDeleteModal(true); }}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir este fornecedor?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TelaCadastroFornecedor;
