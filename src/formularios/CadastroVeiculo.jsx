import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CadastroVeiculo = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let newErrors = {};
    
    if (!formData.placa) newErrors.placa = 'A placa é obrigatória';
    if (!formData.modelo) newErrors.modelo = 'O modelo é obrigatório';
    if (!formData.marca) newErrors.marca = 'A marca é obrigatória';
    if (!formData.anoFabricacao) {
      newErrors.anoFabricacao = 'O ano de fabricação é obrigatório';
    } else if (isNaN(formData.anoFabricacao) || formData.anoFabricacao < 1886 || formData.anoFabricacao > new Date().getFullYear()) {
      newErrors.anoFabricacao = 'Ano inválido. Deve ser um número entre 1886 e o ano atual.';
    }
    if (!formData.cor) newErrors.cor = 'A cor é obrigatória';
    if (!formData.chassi) newErrors.chassi = 'O chassi é obrigatório';
    if (!formData.renavam) newErrors.renavam = 'O RENAVAM é obrigatório';
    if (!formData.combustivel) newErrors.combustivel = 'O combustível é obrigatório';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Dados válidos:', formData);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
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

            <Form.Group controlId="formCombustivel">
            <Form.Label>Tipo de Combustível:</Form.Label>
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

            <Button variant="primary" type="submit">Cadastrar Veículo</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroVeiculo;
