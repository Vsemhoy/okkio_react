import { v4 as uuidv4 } from 'uuid';

export const generateShortId = (length = 25) => {
  // Удаляем дефисы и обрезаем до 25 символов
  return uuidv4().replace(/-/g, '').substring(0, 25);
}