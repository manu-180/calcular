import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.licencia-de-maternidad",
  h1: "Calculadora de licencia de maternidad en Panamá",
  title: "Licencia de maternidad en Panamá: fechas y pago",
  description:
    "Calcula tu licencia de maternidad en Panamá: {{pa.maternidad-semanas[antes]}} semanas antes del parto y {{pa.maternidad-semanas[despues]}} después, con tu salario completo. Ve cuándo empieza, cuándo vuelves y cuánto cobras.",
  intro: [
    "En Panamá tienes un descanso pagado de {{pa.maternidad-semanas[antes]}} semanas antes del parto y {{pa.maternidad-semanas[despues]}} semanas después. Lo cobras como si trabajaras: la Caja de Seguro Social paga el subsidio y tu empleador completa la diferencia.",
    "Escribe la fecha probable del parto y tu salario. Te mostramos las fechas y el pago total.",
  ],
  comoSeCalcula: [
    "Inicio: {{pa.maternidad-semanas[antes]}} semanas antes de la fecha probable del parto.",
    "Fin: {{pa.maternidad-semanas[despues]}} semanas después del parto.",
    "Pago: tu último salario o el promedio de los últimos 180 días, el que sea mayor, pasado a semanal y multiplicado por las semanas de licencia.",
  ],
  ejemplo: [
    "Con parto probable el 15 de marzo de 2027 y un salario de B/. 1,300: la licencia empieza el 1 de febrero y vuelves el 10 de mayo. Cobras B/. 300 por semana, B/. 4,200 en total.",
  ],
  faq: [
    {
      pregunta: "¿Cuántas semanas dura la licencia de maternidad en Panamá?",
      respuesta: "{{pa.maternidad-semanas[antes]}} semanas antes del parto y {{pa.maternidad-semanas[despues]}} después. Si el parto se atrasa, igual te dan las semanas completas después.",
    },
    {
      pregunta: "¿Quién paga la licencia?",
      respuesta: "La Caja de Seguro Social paga el subsidio de maternidad y el empleador cubre lo que falte hasta tu salario. Si la Caja no está obligada, paga todo el empleador.",
    },
    {
      pregunta: "¿Me pueden despedir embarazada?",
      respuesta: "Solo por causa justificada y con autorización previa de un juez de trabajo. Es el fuero de maternidad.",
    },
    {
      pregunta: "¿Y la licencia de paternidad?",
      respuesta: "Existe y es corta, de pocos días hábiles. Pregunta en tu empresa o en el MITRADEL cuántos te corresponden.",
    },
  ],
  glosario: [
    { termino: "Fuero de maternidad", definicion: "Protección contra el despido durante el embarazo." },
    { termino: "Subsidio de maternidad", definicion: "El pago que hace la Caja de Seguro Social durante la licencia." },
  ],
});
