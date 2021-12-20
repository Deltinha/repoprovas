import { FormEvent, useEffect, useState } from 'react';
import {
  getClasses,
  getExamTypes,
  getProfessors,
  postExam,
} from '../../services/repoprovas-api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UploadSchema } from './validation';
import { AlertModal } from '../../components/AlertModal';
import { useNavigate } from 'react-router-dom';

export default function UploadExam() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const [types, setTypes]: any[] = useState([]);
  const [selectedType, setSelectedType]: any[] = useState({});

  const [allProfessors, setAllProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor]: any[] = useState({});

  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass]: any[] = useState({});

  const [link, setLink] = useState('');

  useEffect(() => {
    getProfessors().then((res) => {
      setAllProfessors(res.data);
      setFilteredProfessors(res.data);
    });

    getClasses().then((res) => {
      setAllClasses(res.data);
    });

    getExamTypes().then((res) => setTypes(res.data));
  }, []);

  function selectClass(e: any) {
    const classId = Number(e.target.value);

    if (!classId) {
      setFilteredProfessors([...allProfessors]);
      setSelectedClass({});
    } else {
      const _class: any = allClasses.find(
        (_class: any) => _class.id === classId
      );

      setSelectedClass(_class);
      setFilteredProfessors(_class.professors);
      if (
        !_class.professors.some(
          (professor: any) => professor.id === selectedProfessor.id
        )
      ) {
        setSelectedProfessor(_class.professors[0]);
      }
    }
  }

  function selectType(e: any) {
    const typeId = Number(e.target.value);

    if (!typeId) {
      setSelectedType({});
    } else {
      const type = types.find((type: any) => type.id === typeId);

      setSelectedType(type);
    }
  }

  function selectProfessor(e: any) {
    const professorId = Number(e.target.value);

    if (!professorId) {
      setSelectedProfessor({});
    } else {
      const professor = allProfessors.find(
        (professor: any) => professor.id === professorId
      );

      setSelectedProfessor(professor);
    }
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();
    const body = {
      name,
      classId: selectedClass.id,
      professorId: selectedProfessor.id,
      typeId: selectedType.id,
      link,
    };

    UploadSchema.validate(body)
      .then((isValid) => {
        if (isValid) {
          postExam(body)
            .then((res) => {
              AlertModal.fire({
                title: 'Prova enviada com sucesso',
                timer: 3000,
                timerProgressBar: true,
                icon: 'success',
              }).then(() => {
                navigate('/');
              });
            })
            .catch((err) => {
              AlertModal.fire({
                title: err.response?.data,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'Ok',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
              });
            });
        }
      })
      .catch((err) => {
        const errorMessage = err.errors[0];
        AlertModal.fire({
          title: errorMessage,
          timer: 3000,
          timerProgressBar: true,
          icon: 'info',
        });
      });
  }

  return (
    <Form onSubmit={submitForm} className="m-5">
      <Form.Group className="mb-3" controlId="formExamName">
        <Form.Label>Nome da prova</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Ex: 2020.1"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formType">
        <Form.Label>Tipo de prova</Form.Label>
        <Form.Select value={selectedType.id} onChange={selectType}>
          <option>Selecione o tipo da prova</option>
          {types.map((type: any) => (
            <option value={type.id}>{type.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-5 mb-3">
        <Form.Group className="" controlId="formClass">
          <Form.Label>Disciplina</Form.Label>
          <Form.Select value={selectedClass.id} onChange={selectClass}>
            <option>Selecione a disciplina da prova</option>
            {allClasses.map((_class: any, index) => (
              <option value={_class.id}>{_class.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="" controlId="formProfessor">
          <Form.Label>Professor</Form.Label>
          <Form.Select value={selectedProfessor.id} onChange={selectProfessor}>
            <option>Selecione o professor que aplicou</option>
            {filteredProfessors.map((prof: any) => (
              <option value={prof.id}>{prof.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      <Form.Group className="mb-3" controlId="formPdfLink">
        <Form.Label>Endereço do PDF</Form.Label>
        <Form.Control
          value={link}
          type="text"
          placeholder="Apenas HTTPS"
          onChange={(e) => setLink(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar prova
      </Button>
    </Form>
  );
}
