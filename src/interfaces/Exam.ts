export interface Exam {
  classId: Number;
  id?: Number;
  link: String;
  name: String;
  professorId: Number;
  typeId: Number;
}

export interface RecievedExam {
  class: String;
  link: String;
  name: String;
  professor: String;
  type: String;
  year: String;
}
