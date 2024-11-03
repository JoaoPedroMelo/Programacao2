import Pagina from "../templates/Pagina";
import CadastroFornecedor from "../formularios/CadastroFornecedor";

export default function TelaCadastroFornecedor() {
  return (
    <Pagina>
      <h1>Cadastro de Fornecedores</h1>
      <CadastroFornecedor />
    </Pagina>
  );
}
