import * as S from './style';
import Window from '../../components/Window';

export default function UploadExam() {
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
          <label htmlFor="professor">Professor</label>
          <select name="professor" id="professor">
            <option value="volvo">P1</option>
            <option value="saab">P2</option>
            <option value="mercedes">P3</option>
            <option value="audi">Final</option>
          </select>
          <label htmlFor="disciplina">Disciplina</label>
          <select name="disciplina" id="disciplina">
            <option value="volvo">P1</option>
            <option value="saab">P2</option>
            <option value="mercedes">P3</option>
            <option value="audi">Final</option>
          </select>
          <label htmlFor="link">Endereço do PDF</label>
          <input id="link" type="text" placeholder="" />
          <input type="button" value="Enviar prova" />
        </form>
      </Window>
    </S.UploadExam>
  );
}
