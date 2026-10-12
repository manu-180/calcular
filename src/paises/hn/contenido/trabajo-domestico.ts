import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.trabajo-domestico",
  h1: "Calculadora para el trabajo doméstico en Honduras",
  title: "Trabajo doméstico en Honduras: aviso e indemnización",
  description: "Calcule el aviso y la indemnización de una empleada doméstica en Honduras según su antigüedad y cómo terminó el trabajo.",
  intro: [
    "El trabajo doméstico tiene reglas propias en el Código del Trabajo. El aviso para terminar el contrato es distinto al de otros trabajos.",
    "Si el patrono despide sin avisar, paga los días de aviso. Si la trabajadora se va por maltrato o porque no le pagan, cobra una indemnización.",
  ],
  comoSeCalcula: [
    "Salario diario = salario mensual en dinero / 30.",
    "Aviso: {{hn.preaviso-domestico-dias[prueba]}} en los primeros {{hn.periodo-prueba-dias[domestico]}}, {{hn.preaviso-domestico-dias[menos-de-1-anio]}} después y {{hn.preaviso-domestico-dias[1-anio-o-mas]}} con un año o más.",
    "Por maltrato: {{hn.indemnizacion-domestico-dias[maltrato]}} de salario. Por falta de pago: {{hn.indemnizacion-domestico-dias[falta-pago-menos-de-1-anio]}} con menos de un año y {{hn.indemnizacion-domestico-dias[falta-pago-1-anio-o-mas]}} con un año o más.",
  ],
  ejemplo: ["Gana L6,000 y la despiden sin aviso después de un año y medio. Le corresponde un mes de aviso: L6,000."],
  faq: [
    {
      pregunta: "¿Con cuánto tiempo hay que avisar para despedir a una empleada doméstica?",
      respuesta: "Con {{hn.preaviso-domestico-dias[prueba]}} en los primeros {{hn.periodo-prueba-dias[domestico]}}, con {{hn.preaviso-domestico-dias[menos-de-1-anio]}} después y con {{hn.preaviso-domestico-dias[1-anio-o-mas]}} si tiene un año o más. Si no se avisa, se paga ese tiempo.",
    },
    {
      pregunta: "¿Se cuenta la comida y el cuarto en el salario?",
      respuesta: "Para el aviso y las indemnizaciones, no. Solo cuenta lo que recibe en dinero.",
    },
    {
      pregunta: "¿Una empleada doméstica tiene vacaciones y aguinaldo?",
      respuesta: "Sí. Tiene vacaciones pagadas como cualquier trabajador y también los décimos tercer y cuarto mes.",
    },
    {
      pregunta: "¿Cuánto descanso le corresponde?",
      respuesta: "Diez horas diarias, de las que al menos ocho son de noche y seguidas. Y un día de descanso pagado por cada seis de trabajo.",
    },
  ],
  glosario: [
    { termino: "Trabajo doméstico", definicion: "El de aseo, cocina, cuidado y demás tareas propias de un hogar, de forma habitual y continua." },
    { termino: "Aviso", definicion: "El tiempo de anticipación para terminar el contrato (artículo 158 del Código del Trabajo)." },
  ],
});
