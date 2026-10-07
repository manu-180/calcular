import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.liquidacion",
  h1: "Calculadora de liquidación laboral",
  title: "Liquidación laboral 2026: calcula la tuya en Colombia",
  description:
    "Calcula tu liquidación con cesantías, intereses, prima, vacaciones e indemnización. Con el salario mínimo de {{co.smmlv}} y fuentes oficiales.",
  intro: [
    "Cuando se termina un contrato de trabajo, la empresa te tiene que pagar la liquidación. Son las prestaciones que tienes acumuladas hasta tu último día.",
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
      pregunta: "Renuncié. ¿Me toca indemnización?",
      respuesta: "No. La indemnización solo se paga si la empresa termina el contrato sin justa causa. Si renunciaste, te pagan todo lo demás.",
    },
  ],
  glosario: [
    { termino: "Cesantías", definicion: "Un mes de salario por cada año trabajado. Es un ahorro para cuando te quedes sin empleo." },
    { termino: "Prima de servicios", definicion: "Un mes de salario por año, que se paga en dos partes: junio y diciembre." },
    { termino: "Salario base", definicion: "El salario que se usa para calcular las prestaciones. Incluye el auxilio de transporte si ganas hasta {{co.auxilio-tope}}." },
  ],
});
