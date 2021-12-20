import { Exam } from './Exam';
import { Professor } from './Professor';

export interface Class {
  id: Number;
  name: String;
  professors: Professor[];
  year: String;
  exams: Exam[];
}
