import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.senior-deduction",
  h1: "Calculadora de la deducción para mayores de 65",
  title: "Deducción para mayores de 65: la nueva de {{us.senior-deduction}}",
  description: "Calcule la deducción adicional para mayores, {{us.senior-deduction}} por persona de 65 años o más de 2025 a 2028, con la reducción por ingresos y el impuesto que ahorra.",
  intro: [
    "Las personas de 65 años o más pueden tomar una deducción extra de hasta {{us.senior-deduction}} cada una en su declaración federal de 2025 a 2028.",
    "Indique sus ingresos y cuántas personas de la declaración califican para ver su deducción y el impuesto que ahorra.",
  ],
  comoSeCalcula: [
    "Cada persona elegible empieza con {{us.senior-deduction}}.",
    "Si su MAGI pasa de {{us.senior-deduction-threshold[other]}} ({{us.senior-deduction-threshold[mfj]}} en una declaración conjunta), el monto de cada persona baja {{us.senior-deduction-phaseout-rate}} del exceso.",
    "Los matrimonios en que ambos tienen 65 años o más la reciben dos veces. Los casados que declaran por separado no pueden tomarla.",
  ],
  ejemplo: [
    "Una persona soltera de 70 años con $100,000 de MAGI está $25,000 sobre el umbral. La deducción baja $1,500 hasta $4,500, lo que ahorra $990 en el tramo de 22%.",
  ],
  faq: [
    { pregunta: "¿Es lo mismo que la deducción estándar adicional por 65 años?", respuesta: "No. Es una deducción aparte en el Anexo 1-A, encima de la deducción estándar adicional, y la recibe aunque detalle deducciones." },
    { pregunta: "¿Quién califica para 2026?", respuesta: "Cualquier persona nacida antes del 2 de enero de 1962 con un número de Seguro Social válido. Si está casado, tiene que presentar una declaración conjunta." },
    { pregunta: "¿Hace que el Seguro Social quede libre de impuestos?", respuesta: "No directamente. Baja su ingreso tributable, lo que puede compensar el impuesto sobre parte de sus beneficios, pero las reglas para gravar los beneficios del Seguro Social no cambiaron." },
  ],
  glosario: [
    { termino: "Deducción adicional para mayores", definicion: "Una deducción temporal para personas de 65 años o más, que se reclama en el Anexo 1-A." },
    { termino: "Reducción gradual (phase-out)", definicion: "La forma en que una deducción se achica a medida que los ingresos pasan de cierto monto." },
  ],
});
