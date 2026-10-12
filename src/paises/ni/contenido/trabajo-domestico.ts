import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.trabajo-domestico",
  h1: "Calculadora de liquidación de trabajo doméstico en Nicaragua",
  title: "Trabajadora doméstica en Nicaragua: calculá la liquidación",
  description: "Liquidación del trabajo doméstico en Nicaragua: antigüedad, aguinaldo y vacaciones. Si recibe comida y habitación, se suma un {{ni.domestico-especie}} al salario.",
  intro: [
    "Las trabajadoras y los trabajadores domésticos tienen los mismos derechos que cualquier otro: aguinaldo, vacaciones e indemnización por antigüedad.",
    "La diferencia: si en la casa le dan alimentos y habitación, para las prestaciones se suma un {{ni.domestico-especie}} al salario en dinero.",
  ],
  comoSeCalcula: [
    "Salario para prestaciones: el salario en dinero más el {{ni.domestico-especie}} si recibe alimentos y habitación.",
    "Antigüedad: {{ni.indemnizacion-meses-por-anio}} de ese salario por cada uno de los tres primeros años y {{ni.indemnizacion-dias-desde-cuarto-anio}} por año desde el cuarto, con un máximo de {{ni.indemnizacion-tope-meses}}.",
    "Aguinaldo proporcional desde el 1 de diciembre y vacaciones de {{ni.vacaciones-dias-por-semestre}} por cada seis meses.",
    "Los primeros {{ni.periodo-prueba-domestico-dias}} son de prueba: si el trabajo termina en ese tiempo, no hay indemnización.",
  ],
  ejemplo: [
    "Una trabajadora que gana C$6,000 y vive en la casa tiene un salario para prestaciones de C$9,000. Si la despiden después de dos años y nueve meses, le corresponden C$38,959.40.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula la liquidación de una empleada doméstica en Nicaragua?",
      respuesta: "Igual que la de cualquier trabajador, pero con un salario más alto si recibe comida y habitación: se le suma un {{ni.domestico-especie}} al salario en dinero.",
    },
    {
      pregunta: "¿La trabajadora doméstica tiene derecho a aguinaldo?",
      respuesta: "Sí. Un mes de salario por año trabajado, o la parte proporcional, igual que cualquier trabajador.",
    },
    {
      pregunta: "¿Cuánto dura el período de prueba en el trabajo doméstico?",
      respuesta: "Los primeros {{ni.periodo-prueba-domestico-dias}}. En ese tiempo cualquiera de las dos partes puede terminar el trabajo sin aviso ni indemnización.",
    },
    {
      pregunta: "¿Hay que inscribirla en el INSS?",
      respuesta: "Sí. Es obligación del empleador. Si no la inscribe, responde él por lo que hubiera cubierto el seguro social.",
    },
    {
      pregunta: "¿Cuánto descanso le corresponde?",
      respuesta: "Doce horas de descanso absoluto por día, ocho de ellas de noche y seguidas, y un día libre después de seis días de trabajo.",
    },
  ],
  glosario: [
    { termino: "Salario en especie", definicion: "La parte del pago que no es en dinero, como la comida y el cuarto donde duerme." },
    { termino: "Prestaciones", definicion: "Aguinaldo, vacaciones e indemnización por antigüedad." },
  ],
});
