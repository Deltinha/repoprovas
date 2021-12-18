/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './style';
import Window from '../../components/Window';
import { useEffect, useState } from 'react';
import { getClasses, getProfessors } from '../../services/repoprovas-api';

export default function UploadExam() {
  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [allProfessors, setAllProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [link, setLink] = useState('');

  useEffect(() => {
    getProfessors().then((res) => {
      setAllProfessors(res.data);
      setFilteredProfessors(res.data);
    });
    getClasses().then((res) => setClasses(res.data));
  }, []);

  function updateProfessors(e: any) {
    const classId = parseInt(e.target.value, 10);
    if (!classId) {
      setFilteredProfessors([...allProfessors]);
    } else {
      setFilteredProfessors(
        allProfessors.filter(
          (professor: any) =>
            professor.classToProfessors.some(
              (_class: any) => _class.classId === classId
            ) === true
        )
      );
    }
  }

  return (
    <S.UploadExam>
      <Window title="Enviar prova">
        <form>
          <label htmlFor="name">Nome da prova</label>
          <input id="name" type="text" placeholder="Ex: 2020.1" />

          <label htmlFor="types">Tipo de prova</label>
          <select name="types" id="types">
            <option value="volvo">P1</option>
            <option value="saab">P2</option>
            <option value="mercedes">P3</option>
            <option value="audi">Final</option>
          </select>

          <label htmlFor="classes">Disciplina</label>
          <select onChange={updateProfessors} name="classes" id="classes">
            <option></option>
            {classes.map((_class: any) => (
              <option value={_class.id}>{_class.name}</option>
            ))}
          </select>

          <label htmlFor="professors">Professor</label>
          <select name="professors" id="professors">
            <option></option>
            {filteredProfessors.map((prof: any) => (
              <option value={prof.name}>{prof.name}</option>
            ))}
          </select>

          <label htmlFor="link">Endereço do PDF</label>
          <input id="link" type="text" placeholder="" />

          <input type="button" value="Enviar prova" />
        </form>
      </Window>
    </S.UploadExam>
  );
}
