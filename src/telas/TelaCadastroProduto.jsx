import Pagina from "../templates/Pagina";
import CadastroProduto from "../formularios/CadastroProduto";

export default function TelaCadastroProduto() {
  return (
    <Pagina>
      <h1>Cadastro de Produtos</h1>
      <CadastroProduto />
    </Pagina>
  );
}
