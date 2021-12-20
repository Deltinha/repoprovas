import * as yup from 'yup';

export const UploadSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'O nome da prova deve ter no mínimo 3 caracteres')
    .required(),
  classId: yup
    .number()
    .required('Selecione uma disciplina')
    .positive()
    .integer(),
  professorId: yup
    .number()
    .required('Selecione um professor')
    .positive()
    .integer(),
  typeId: yup
    .number()
    .required('Selecione o tipo da prova')
    .positive()
    .integer(),
  link: yup
    .string()
    .required('Insira o endereço da prova')
    .matches(
      /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      {
        excludeEmptyString: true,
        message: 'O endereço inserido não é um link válido',
      }
    ),
});
