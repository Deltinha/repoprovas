import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { getProfessors } from '../../services/repoprovas-api';
import { useNavigate } from 'react-router-dom';

export default function Professors() {
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  useEffect(() => {
    getProfessors().then((res) => setProfessors(res.data));
  }, []);

  return (
    <ListGroup style={{ width: '300px' }}>
      {professors.map((professor: any) => (
        <ListGroup.Item
          action
          onClick={() => navigate(`/professors/${professor.id}`)}
          className="d-flex justify-content-between"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{professor.name}</div>
          </div>
          <Badge pill>{professor.examsQty}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
