import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.licencia-por-enfermedad",
  h1: "Calculadora de licencia por enfermedad en Panamá",
  title: "Licencia por enfermedad en Panamá: horas que te quedan",
  description:
    "En Panamá acumulas {{pa.licencia-enfermedad-horas[por-anio]}} al año de licencia por enfermedad con salario completo. Calcula cuántas horas y días tienes disponibles.",
  intro: [
    "Desde que empiezas a trabajar vas sumando un fondo de licencia por enfermedad: {{pa.licencia-enfermedad-horas[por-26-jornadas]}} por cada 26 jornadas, o {{pa.licencia-enfermedad-horas[por-anio]}} al año. Lo usas con salario completo si te enfermas o tienes un accidente que no es de trabajo.",
    "Escribe tu fecha de ingreso, las horas que ya usaste y tu salario. Te mostramos cuántas horas te quedan y cuánto salario cubren.",
  ],
  comoSeCalcula: [
    "Horas generadas: {{pa.licencia-enfermedad-horas[por-anio]}} por año trabajado, en proporción.",
    "El fondo se acumula hasta {{pa.licencia-enfermedad-anios-acumulables}} seguidos. Contamos como máximo lo generado en ese tiempo.",
    "Horas disponibles: las generadas menos las que ya usaste.",
    "Salario que cubren: horas disponibles por el valor de tu hora.",
  ],
  ejemplo: [
    "Con un año de trabajo generaste 144 horas. Si usaste 16, te quedan 128 horas, que son 16 jornadas de 8 horas. Con un salario de B/. 1,000, cubren B/. 615.38.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de incapacidad pagados tengo al año en Panamá?",
      respuesta: "{{pa.licencia-enfermedad-horas[por-anio]}} al año. En jornada diurna de {{pa.jornada-diaria[diurna]}} son 18 días.",
    },
    {
      pregunta: "¿Se acumulan los días que no uso?",
      respuesta: "Sí, hasta {{pa.licencia-enfermedad-anios-acumulables}} seguidos, y los puedes usar durante el tercer año.",
    },
    {
      pregunta: "¿Qué pasa cuando se me acaba el fondo?",
      respuesta: "Si estás asegurado, la Caja de Seguro Social paga el subsidio por enfermedad. Si no lo estás, la licencia se descuenta de tus vacaciones ganadas.",
    },
    {
      pregunta: "¿Qué certificado necesito?",
      respuesta: "Uno de un médico idóneo, numerado, con su registro, su nombre y la institución o clínica donde atiende.",
    },
  ],
  glosario: [
    { termino: "Certificado de incapacidad", definicion: "El documento médico que justifica la ausencia por enfermedad." },
    { termino: "Enfermedad no profesional", definicion: "La que no tiene relación con tu trabajo." },
  ],
});
