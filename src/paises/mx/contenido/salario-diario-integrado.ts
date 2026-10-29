import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.salario-diario-integrado",
  h1: "Calculadora de salario diario integrado (SDI) {{anio}}",
  title: "Salario diario integrado {{anio}}: calcula tu SDI",
  description:
    "Calcula tu salario diario integrado con el factor de integración de aguinaldo y prima vacacional, y mira el salario base de cotización con el tope del IMSS.",
  intro: [
    "El salario diario integrado (SDI) es tu salario diario más la parte proporcional de tus prestaciones. Con él se calculan las cuotas del IMSS, el Infonavit y las indemnizaciones por despido.",
    "Escribe tu sueldo y tu antigüedad. Si tu empresa da más aguinaldo o más prima vacacional que la ley, agrégalos.",
  ],
  comoSeCalcula: [
    "Salario diario: tu sueldo mensual entre 30, quincenal entre 15 o semanal entre 7.",
    "Factor de integración: 1 más los días de aguinaldo y la prima vacacional de tus días de vacaciones, divididos entre 365. Con las prestaciones de ley son {{mx.dias-aguinaldo}} de aguinaldo y {{mx.prima-vacacional}} de prima.",
    "SDI: salario diario por el factor, más otras percepciones fijas que integran salario.",
    "Para el IMSS el resultado no baja del salario mínimo ni pasa de {{mx.tope-sbc-imss}}.",
  ],
  ejemplo: [
    "Con 15,000 pesos al mes y 3 años de antigüedad te tocan 16 días de vacaciones. El factor es 1.0521 y tu SDI queda en 526.03 pesos.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es la diferencia entre salario diario y salario diario integrado?",
      respuesta: "El salario diario es lo que ganas por día. El integrado le suma la parte de aguinaldo, prima vacacional y otras prestaciones que recibes por tu trabajo.",
    },
    {
      pregunta: "¿Para qué sirve el SDI?",
      respuesta: "Para calcular tus cuotas del IMSS e Infonavit, tu pensión y la indemnización si te despiden sin causa.",
    },
    {
      pregunta: "¿Qué prestaciones no integran salario?",
      respuesta: "Entre otras, las herramientas de trabajo, el fondo de ahorro con aportaciones iguales, la PTU, las despensas y los premios de asistencia y puntualidad dentro de ciertos límites (Ley del Seguro Social, artículo 27).",
    },
    {
      pregunta: "¿El factor de integración cambia con los años?",
      respuesta: "Sí. Cada año de antigüedad te dan más días de vacaciones, así que sube la prima vacacional y con ella el factor.",
    },
  ],
  glosario: [
    { termino: "SDI", definicion: "Salario diario integrado: salario diario más prestaciones proporcionales." },
    { termino: "Factor de integración", definicion: "Número por el que se multiplica el salario diario para obtener el SDI." },
  ],
});
