import { Alert } from 'react-bootstrap';

export default function Cabecalho({ user }) {
  return (
    <div>
      <Alert className='text-center'>
        <h1>Sistema De Cadastro LogCar</h1>
        {user && <h5>Usuário logado: {user}</h5>}
      </Alert>
    </div>
  );
}
