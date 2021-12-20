import Buttom from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      className="p-5 flex-column gap-3"
      style={{ width: '800px', alignItems: 'center', justifyContent: 'center' }}
    >
      <h1 className="cover-heading text-center">D🤫ssiê</h1>

      <p className="lead text-center">
        Provas passadas de todas as diciplinas do nosso curso
      </p>

      <div className="lead d-flex gap-5 justify-content-center mb-5">
        <Buttom onClick={() => navigate('/professors')}>
          Buscar prova por professor
        </Buttom>

        <Buttom onClick={() => navigate('/classes')}>
          Buscar prova por disciplina
        </Buttom>
      </div>
      <div className="lead d-flex gap-1 flex-column align-items-center">
        <h3 className="text-center">
          Ajude seus coleguinhas enviando uma prova
        </h3>

        <Buttom style={{ width: '150px' }} onClick={() => navigate('/upload')}>
          Enviar prova
        </Buttom>
      </div>
    </div>
  );
}
