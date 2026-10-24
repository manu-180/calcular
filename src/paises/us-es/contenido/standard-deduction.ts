import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.standard-deduction",
  h1: "Calculadora de la deducción estándar",
  title: "Deducción estándar 2026: calculadora por estado civil",
  description: "Vea su deducción estándar de 2026: {{us.standard-deduction[single]}} soltero, {{us.standard-deduction[mfj]}} casado en conjunto, {{us.standard-deduction[hoh]}} cabeza de familia, más el extra por 65 años y ceguera.",
  intro: [
    "La deducción estándar es la parte de su ingreso sobre la que no paga impuesto federal si no detalla deducciones.",
    "Elija su estado civil y las casillas por edad y ceguera para ver la suya de 2026 y compararla con sus deducciones detalladas.",
  ],
  comoSeCalcula: [
    "El monto básico es de {{us.standard-deduction[single]}} para solteros y casados que declaran por separado, {{us.standard-deduction[mfj]}} para matrimonios con declaración conjunta y {{us.standard-deduction[hoh]}} para cabezas de familia.",
    "Cada persona de 65 años o más suma {{us.additional-standard-deduction[married]}} si es casada o {{us.additional-standard-deduction[unmarried]}} si no lo es. Ser ciego suma otra vez el mismo monto.",
    "Si sus deducciones detalladas son mayores, detallarlas baja más su impuesto.",
  ],
  ejemplo: [
    "Un matrimonio con declaración conjunta, ambos mayores de 65 y uno de ellos ciego, recibe $32,200 más tres montos extra de $1,650, en total $37,150.",
  ],
  faq: [
    { pregunta: "¿Cuándo conviene detallar las deducciones?", respuesta: "Cuando los intereses hipotecarios, los impuestos estatales y locales, las donaciones y los gastos médicos altos suman más que su deducción estándar." },
    { pregunta: "¿Cuándo se me considera de 65 años?", respuesta: "El IRS lo considera de 65 años el día antes de su cumpleaños 65. Para 2026, eso incluye a cualquier persona nacida antes del 2 de enero de 1962." },
    { pregunta: "¿La nueva deducción para mayores es parte de la deducción estándar?", respuesta: "No. La deducción adicional para mayores es aparte y se reclama en el Anexo 1-A, así que se suma a los montos que se muestran aquí." },
  ],
  glosario: [
    { termino: "Deducciones detalladas", definicion: "Gastos específicos que se anotan en el Anexo A en lugar de tomar la deducción estándar." },
    { termino: "Estado civil para la declaración", definicion: "Soltero, casado con declaración conjunta, casado con declaración por separado, cabeza de familia o cónyuge sobreviviente que califica." },
  ],
});
