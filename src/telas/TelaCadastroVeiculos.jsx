import React from 'react';
import Pagina from "../templates/Pagina"; 
import CadastroVeiculo from "../formularios/CadastroVeiculo"; 
export default function TelaCadastroVeiculos() {
    return (
        <Pagina>
            <h1>Cadastro de Veículos</h1>
            <CadastroVeiculo />
        </Pagina>
    );
}
