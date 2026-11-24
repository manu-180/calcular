import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kh.specific-tax",
  h1: "គណនាអាករពិសេស {{anio}}",
  title: "គណនាអាករពិសេស {{anio}}",
  description: "អាករពិសេសលើស្រាបៀរ {{kh.specific-rates[beer]}} បារី {{kh.specific-rates[cigarette]}} និងសំបុត្រយន្តហោះ {{kh.specific-rates[air-ticket]}}។ ជ្រើសរើសប្រភេទ ហើយគណនា។",
  intro: [
    "អាករពិសេសជាប់លើទំនិញ និងសេវាមួយចំនួន។ ស្រា {{kh.specific-rates[wine]}} ស្រាបៀរ {{kh.specific-rates[beer]}} ស៊ីហ្គា {{kh.specific-rates[cigar]}} និងបារី {{kh.specific-rates[cigarette]}}។",
    "ភេសជ្ជៈគ្មានជាតិអាល់កុលជាប់ {{kh.specific-rates[soft-drink]}} ហើយសេវាទូរគមនាគមន៍ជាប់ {{kh.specific-rates[telecom]}}។",
  ],
  comoSeCalcula: [
    "ជ្រើសរើសប្រភេទទំនិញ ឬសេវា។",
    "បញ្ចូលមូលដ្ឋានគិតអាករ។ មូលដ្ឋានពិតអាស្រ័យលើផលិតកម្មក្នុងស្រុក ឬការនាំចូល ដូច្នេះអ្នកត្រូវបញ្ចូលដោយខ្លួនឯង។",
    "មូលដ្ឋានគុណនឹងអត្រា បានអាករពិសេស។",
  ],
  ejemplo: ["ស្រាបៀរមានមូលដ្ឋានគិតអាករ 1,000,000 រៀល។ អាករពិសេសគឺ 300,000 រៀល។ សេវាទូរគមនាគមន៍ដែលមានមូលដ្ឋានដូចគ្នា ជាប់ 30,000 រៀល។"],
  faq: [
    { pregunta: "សំបុត្រយន្តហោះជាប់អាករប៉ុន្មាន?", respuesta: "{{kh.specific-rates[air-ticket]}} ទាំងក្នុងស្រុក និងអន្តរជាតិ តាមអគ្គនាយកដ្ឋានពន្ធដារ។" },
    { pregunta: "សេវាកម្សាន្តជាប់អាករប៉ុន្មាន?", respuesta: "{{kh.specific-rates[entertainment]}} លើសេវាកម្សាន្ត។" },
    { pregunta: "អត្រានេះមកពីណា?", respuesta: "សំណួរដែលសួរញឹកញាប់របស់អគ្គនាយកដ្ឋានពន្ធដារ ដែលយោងប្រកាសលេខ 341 ប្រកាសលេខ 153 និងប្រកាសលេខ 521។" },
  ],
  glosario: [
    { termino: "អាករពិសេស", definicion: "អាករលើទំនិញ និងសេវាមួយចំនួនដែលច្បាប់កំណត់។" },
    { termino: "មូលដ្ឋានគិតអាករ", definicion: "តម្លៃដែលត្រូវយកមកគុណនឹងអត្រាអាករ។" },
  ],
});
