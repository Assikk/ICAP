import dayjs from 'dayjs'
const validators = {
  dashDate: (value) => /^\d{4}[-]\d{2}[-]\d{2}$/.test(value) || !value, /* Валидация проверяет формат даты на YYYY-MM-DD */
  checkFutureDate: (value) => dayjs(value).format('YYYY-MM-DD') >= dayjs().format('YYYY-MM-DD'), /* Валидация проверяет, чтобы дата была введена в будущем и в настоящем времени. Запрещает ввод в прошлом времени */
  checkStrongPastDate: (value) => dayjs(value).format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD'), /* Валидация проверяет, чтобы дата была введена только в прошлом времени. Запрещает ввод в настоящем и в будущем времени */
  isText: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value), /* Разрешает вводить только буквы */
  numericDash: (value) => /^[0-9-]*$/.test(value)
}
export default validators
