import * as fs from 'fs';
import parse from '../10-string-to-JSON/parse.mjs';

fs.readFile('./05-JSON-to-list/data.json', 'utf8', (err, jsonString) => { // Чтение Json из файла
    if (err) {                            // Вывод ошибки
      console.error(err);
      return;                 
    }
    const list = jsonToList(jsonString)   // Получение списка из Json
    console.dir(list, { depth: null });   // Вывод полностью
})
  
function jsonToList(string) {
  string = string.replace(/[\r\n]+/g, "");  // Избавление от переходов на новую строку
  const list = parse(string)                // Использование функции строки в объект из 10 задания
  if (Object.prototype.toString.call(list) === "[object Array]")  return list   // Вывод списка после проверки на список
}