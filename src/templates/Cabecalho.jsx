import { Alert } from 'react-bootstrap';

export default function Cabecalho({ user }) {
  return (
    <div>
      <Alert className='text-center'>
        <h1>Sistema De Cadastro LogCar</h1>
        {user && user.username ? (  // Verifica se existe o username no objeto user
          <h5>Usuário logado: {user.username}</h5>  // Exibe o username
        ) : (
          <h5>Nenhum usuário logado</h5>  // Caso não haja usuário
        )}
      </Alert>
    </div>
  );
}
