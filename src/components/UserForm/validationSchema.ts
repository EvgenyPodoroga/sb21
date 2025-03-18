import { date, number, object, string } from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

const schema = object().shape({
  id: number().nullable(),
  surname: string().required('Обязательное поле'),
  name: string().required('Обязательное поле'),
  patronymic: string().required('Обязательное поле'),
  administrativePosition: string().required('Обязательное поле'),
  medicalPosition: string().required('Обязательное поле'),
  department: string().required('Обязательное поле'),
  phoneNumber: string()
    .required('Обязательное поле')
    .test('isValidPhoneNumber', 'Неверный формат', (value) =>
      isValidPhoneNumber(value, 'RU')
    ),
  email: string().email('Неверный формат').required('Обязательное поле'),
  dateOfHire: date().required('Обязательное поле').typeError('Неверный формат'),
});

export default schema;
