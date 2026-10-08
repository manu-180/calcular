import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.liquidacion",
  h1: "Calculadora de liquidación laboral 2026 en Colombia",
  title: "Calculadora de liquidación laboral 2026 en Colombia",
  description:
    "Calcula tu liquidación de contrato con tus fechas y tu salario: cesantías, intereses, prima, vacaciones e indemnización si te despidieron. Gratis y al instante.",
  intro: [
    "La liquidación laboral es lo que la empresa te paga al terminar el contrato: cesantías, intereses sobre las cesantías, prima de servicios y vacaciones pendientes. Si te despidieron sin justa causa, se suma la indemnización.",
    "Escribe tu salario y tus fechas. Te mostramos cuánto te toca por cada concepto y el total.",
  ],
  comoSeCalcula: [
    "Cesantías: salario base por los días trabajados en el año, dividido por 360. Si ganas hasta {{co.auxilio-tope}}, el salario base incluye el auxilio de transporte de {{co.auxilio-transporte}}.",
    "Intereses sobre las cesantías: el {{co.intereses-cesantias}} anual de tus cesantías, en proporción a los días trabajados.",
    "Prima de servicios: salario base por los días trabajados en el semestre, dividido por 360.",
    "Vacaciones: salario sin auxilio por los días trabajados sin vacaciones, dividido por 720. Equivale a medio mes de salario por cada año.",
    "Indemnización: solo si te despidieron sin justa causa. Se calcula con la tabla del artículo 64 del Código Sustantivo del Trabajo.",
    "Para contar los días se usan meses de 30 días, como en la nómina.",
  ],
  ejemplo: [
    "Con un salario de $4.000.000, ingreso el 1 de febrero de 2025 y retiro el 30 de junio de 2026 por renuncia, te tocan 180 días de cesantías ($2.000.000), $120.000 de intereses, $2.000.000 de prima y $2.833.333 de vacaciones por 510 días trabajados sin tomarlas. En total, $6.953.333.",
  ],
  faq: [
    {
      pregunta: "¿Qué me deben pagar en la liquidación si renuncio?",
      respuesta: "Las cesantías y sus intereses, la prima y las vacaciones que no tomaste, todo en proporción al tiempo trabajado. La indemnización no, porque solo aplica en un despido sin justa causa.",
    },
    {
      pregunta: "¿Cuánto tiempo tiene la empresa para pagarme la liquidación?",
      respuesta:
        "Te la tiene que pagar al terminar el contrato. Si se demora sin razón, la ley le pone una sanción de un día de salario por cada día de retraso (artículo 65 del Código Sustantivo del Trabajo).",
    },
    {
      pregunta: "¿El auxilio de transporte entra en la liquidación?",
      respuesta:
        "Sí, para las cesantías, los intereses y la prima, siempre que ganes hasta {{co.auxilio-tope}}. No entra en las vacaciones ni en la indemnización.",
    },
    {
      pregunta: "¿Por qué solo calcula las cesantías de este año?",
      respuesta:
        "Porque las de los años anteriores la empresa ya las tuvo que consignar en tu fondo de cesantías antes del 15 de febrero. Esas las retiras directamente en el fondo.",
    },
    {
      pregunta: "¿Cómo se calcula la liquidación de un contrato a término fijo?",
      respuesta: "Las prestaciones se calculan igual que en un contrato indefinido. Si te despiden sin justa causa antes de la fecha pactada, la indemnización son los salarios que faltaban hasta esa fecha. Esta calculadora usa la tabla del contrato indefinido: para el fijo, usa la calculadora de indemnización por despido.",
    },
  ],
  glosario: [
    { termino: "Cesantías", definicion: "Un mes de salario por cada año trabajado. Es un ahorro para cuando te quedes sin empleo." },
    { termino: "Prima de servicios", definicion: "Un mes de salario por año, que se paga en dos partes: junio y diciembre." },
    { termino: "Salario base", definicion: "El salario que se usa para calcular las prestaciones. Incluye el auxilio de transporte si ganas hasta {{co.auxilio-tope}}." },
  ],
});
