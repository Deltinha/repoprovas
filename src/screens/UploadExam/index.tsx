import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
import { ExamType } from '../../interfaces/ExamType';
import { Professor } from '../../interfaces/Professor';
import { Class } from '../../interfaces/Class';
import { Exam } from '../../interfaces/Exam';

export default function UploadExam() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const [types, setTypes] = useState<ExamType[]>([]);
  const [selectedType, setSelectedType]: any[] = useState({});

  const [allProfessors, setAllProfessors] = useState<Professor[]>([]);
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor]: any[] = useState({});

  const [allClasses, setAllClasses] = useState<Class[]>([]);
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

  function selectClass(e: ChangeEvent) {
    const classId = Number((e.target as HTMLTextAreaElement).value);

    if (!classId) {
      setFilteredProfessors([...allProfessors]);
      setSelectedClass({});
    } else {
      const _class: any = allClasses.find((_class) => _class.id === classId);

      setSelectedClass(_class);
      setFilteredProfessors(_class.professors);
      if (
        !_class.professors.some(
          (professor: Professor) => professor.id === selectedProfessor.id
        )
      ) {
        setSelectedProfessor(_class.professors[0]);
      }
    }
  }

  function selectType(e: ChangeEvent) {
    const typeId = Number((e.target as HTMLTextAreaElement).value);

    if (!typeId) {
      setSelectedType({});
    } else {
      const type = types.find((type) => type.id === typeId);

      setSelectedType(type);
    }
  }

  function selectProfessor(e: ChangeEvent) {
    const professorId = Number((e.target as HTMLTextAreaElement).value);

    if (!professorId) {
      setSelectedProfessor({});
    } else {
      const professor = allProfessors.find(
        (professor) => professor.id === professorId
      );

      setSelectedProfessor(professor);
    }
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();
    const body: Exam = {
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
          {types.map((type) => (
            <option value={Number(type.id)}>{type.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-5 mb-3">
        <Form.Group className="" controlId="formClass">
          <Form.Label>Disciplina</Form.Label>
          <Form.Select value={selectedClass.id} onChange={selectClass}>
            <option>Selecione a disciplina da prova</option>
            {allClasses.map((_class) => (
              <option value={Number(_class.id)}>{_class.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="" controlId="formProfessor">
          <Form.Label>Professor</Form.Label>
          <Form.Select value={selectedProfessor.id} onChange={selectProfessor}>
            <option>Selecione o professor que aplicou</option>
            {filteredProfessors.map((prof) => (
              <option value={Number(prof.id)}>{prof.name}</option>
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
