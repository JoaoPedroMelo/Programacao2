import React, { useState } from 'react'; 
import { Form, Button, Container, Row, Col, Alert, ListGroup, Modal } from 'react-bootstrap';

const CadastroVeiculo = () => {
  // Estados para controle dos dados do formulário e lista de veículos
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    anoFabricacao: '',
    cor: '',
    chassi: '',
    renavam: '',
    combustivel: ''
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [vehicles, setVehicles] = useState([]);  // Lista de veículos
  const [editMode, setEditMode] = useState(false); // Flag para saber se estamos no modo de edição
  const [editIndex, setEditIndex] = useState(null); // Índice do veículo sendo editado
  const [showModal, setShowModal] = useState(false); // Estado para controle do modal
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(null); // Índice do veículo selecionado para remoção
  
  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para validar os campos do formulário
  const validate = () => {
    let newErrors = {};
    if (!formData.placa) newErrors.placa = 'A placa é obrigatória';
    if (!formData.modelo) newErrors.modelo = 'O modelo é obrigatório';
    if (!formData.marca) newErrors.marca = 'A marca é obrigatória';
    if (!formData.anoFabricacao || isNaN(formData.anoFabricacao) || formData.anoFabricacao < 1886 || formData.anoFabricacao > new Date().getFullYear()) {
      newErrors.anoFabricacao = 'Ano de fabricação inválido';
    }
    if (!formData.cor) newErrors.cor = 'A cor é obrigatória';
    if (!formData.chassi) newErrors.chassi = 'O chassi é obrigatório';
    if (!formData.renavam) newErrors.renavam = 'O RENAVAM é obrigatório';
    if (!formData.combustivel) newErrors.combustivel = 'O combustível é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      if (editMode) {
        // Atualiza um veículo existente na lista
        const updatedVehicles = [...vehicles];
        updatedVehicles[editIndex] = formData;
        setVehicles(updatedVehicles);
        setSuccessMessage('Veículo atualizado com sucesso!');
      } else {
        // Adiciona um novo veículo
        setVehicles([...vehicles, formData]);
        setSuccessMessage('Veículo cadastrado com sucesso!');
      }

      // Limpa o formulário e desativa o modo de edição
      setFormData({
        placa: '',
        modelo: '',
        marca: '',
        anoFabricacao: '',
        cor: '',
        chassi: '',
        renavam: '',
        combustivel: ''
      });
      setEditMode(false);
      setEditIndex(null);
      setErrorMessage('');
    } else {
      setSuccessMessage('');
      setErrorMessage('Por favor, corrija os erros no formulário.');
    }
  };

  // Função para editar um veículo
  const handleEdit = (index) => {
    setFormData(vehicles[index]);
    setEditMode(true);
    setEditIndex(index);
  };

  // Função para abrir o modal de confirmação de remoção
  const handleOpenModal = (index) => {
    setSelectedVehicleIndex(index);
    setShowModal(true);
  };

  // Função para confirmar a remoção de um veículo
  const handleConfirmDelete = () => {
    const updatedVehicles = vehicles.filter((_, i) => i !== selectedVehicleIndex);
    setVehicles(updatedVehicles);
    setShowModal(false);
    setSuccessMessage('Veículo removido com sucesso!');
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicleIndex(null);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPlaca">
              <Form.Label>Placa:</Form.Label>
              <Form.Control
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                isInvalid={!!errors.placa}
              />
              <Form.Control.Feedback type="invalid">
                {errors.placa}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formModelo">
              <Form.Label>Modelo:</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                isInvalid={!!errors.modelo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.modelo}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formMarca">
              <Form.Label>Marca:</Form.Label>
              <Form.Control
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                isInvalid={!!errors.marca}
              />
              <Form.Control.Feedback type="invalid">
                {errors.marca}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAnoFabricacao">
              <Form.Label>Ano de Fabricação:</Form.Label>
              <Form.Control
                type="number"
                name="anoFabricacao"
                value={formData.anoFabricacao}
                onChange={handleChange}
                min="1886"
                max={new Date().getFullYear()}
                isInvalid={!!errors.anoFabricacao}
              />
              <Form.Control.Feedback type="invalid">
                {errors.anoFabricacao}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCor">
              <Form.Label>Cor:</Form.Label>
              <Form.Control
                type="text"
                name="cor"
                value={formData.cor}
                onChange={handleChange}
                isInvalid={!!errors.cor}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cor}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formChassi">
              <Form.Label>Chassi:</Form.Label>
              <Form.Control
                type="text"
                name="chassi"
                value={formData.chassi}
                onChange={handleChange}
                isInvalid={!!errors.chassi}
              />
              <Form.Control.Feedback type="invalid">
                {errors.chassi}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formRenavam">
              <Form.Label>Renavam:</Form.Label>
              <Form.Control
                type="text"
                name="renavam"
                value={formData.renavam}
                onChange={handleChange}
                isInvalid={!!errors.renavam}
              />
              <Form.Control.Feedback type="invalid">
                {errors.renavam}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCombustivel">
              <Form.Label>Combustível:</Form.Label>
              <Form.Control
                as="select"
                name="combustivel"
                value={formData.combustivel}
                onChange={handleChange}
                isInvalid={!!errors.combustivel}
              >
                <option value="">Selecione...</option>
                <option value="gasolina">Gasolina</option>
                <option value="alcool">Álcool</option>
                <option value="diesel">Diesel</option>
                <option value="eletrico">Elétrico</option>
                <option value="hibrido">Híbrido</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.combustivel}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              {editMode ? 'Atualizar Veículo' : 'Cadastrar Veículo'}
            </Button>
          </Form>

          <h3 className="mt-4">Veículos Cadastrados</h3>
          <ListGroup>
  {vehicles.length === 0 ? (
    <ListGroup.Item>Nenhum veículo cadastrado.</ListGroup.Item>
  ) : (
    vehicles.map((vehicle, index) => (
      <ListGroup.Item key={index}>
        <div><strong>Modelo:</strong> {vehicle.modelo}</div>
        <div><strong>Placa:</strong> {vehicle.placa}</div>
        <div><strong>Marca:</strong> {vehicle.marca}</div>
        <div><strong>Ano de Fabricação:</strong> {vehicle.anoFabricacao}</div>
        <div><strong>Cor:</strong> {vehicle.cor}</div>
        <div><strong>Chassi:</strong> {vehicle.chassi}</div>
        <div><strong>Renavam:</strong> {vehicle.renavam}</div>
        <div><strong>Combustível:</strong> {vehicle.combustivel}</div>
        
        <Button
          variant="warning"
          className="mt-2"
          onClick={() => handleEdit(index)}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          className="mt-2 ml-2"
          onClick={() => handleOpenModal(index)} // Abre o modal para confirmação
        >
          Remover
        </Button>
      </ListGroup.Item>
    ))
  )}
</ListGroup>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Remoção</Modal.Title>
            </Modal.Header>
            <Modal.Body>Você tem certeza que deseja remover este veículo?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Remover
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroVeiculo;
