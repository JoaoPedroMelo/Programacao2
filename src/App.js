import { Routes, Route } from 'react-router-dom';
import TelaCadastroVeiculos from './telas/TelaCadastroVeiculos';
import TelaCadastroFornecedor from './telas/TelaCadastroFornecedor';
import TelaCadastroProduto from './telas/TelaCadastroProduto';
import TelaLogin from './telas/TelaLogin';
import TelaMenuInicial from './telas/TelaMenuInicial';
import { useState } from 'react';
import Cabecalho from './templates/Cabecalho';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Cabecalho user={user} />
      <Routes>
        <Route path="/" element={<TelaLogin setUser={setUser} />} />
        <Route path="/menu-inicial" element={<TelaMenuInicial />} /> 
        <Route path="/cadastro-veiculo" element={<TelaCadastroVeiculos />} />
        <Route path="/cadastro-fornecedor" element={<TelaCadastroFornecedor />} />
        <Route path="/cadastro-produto" element={<TelaCadastroProduto />} />
      </Routes>
    </div>
  );
};

export default App;
