import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://repoprovas-deltinha.herokuapp.com';

export function postExam(body: any) {
  const promise = axios.post(`${BASE_URL}/exams`, body);
  return promise;
}

export function getProfessors() {
  const promise = axios.get(`${BASE_URL}/professors`);
  return promise;
}

export function getClasses() {
  const promise = axios.get(`${BASE_URL}/classes`);
  return promise;
}

export function getExamsFromProfessor(id: number) {
  const promise = axios.get(`${BASE_URL}/professors/${id}`);
  return promise;
}

export function getExamsFromClass(id: number) {
  const promise = axios.get(`${BASE_URL}/classes/${id}`);
  return promise;
}

export function getExamTypes() {
  const promise = axios.get(`${BASE_URL}/exams/types`);
  return promise;
}
