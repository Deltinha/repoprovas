import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';

export function postUpload(body) {
  const promise = axios.post(`${BASE_URL}/upload`, body);
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
