import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.licencia-por-maternidad",
  h1: "Calculadora de licencia por maternidad en Nicaragua",
  title: "Licencia por maternidad en Nicaragua: fechas y pago",
  description: "Calculá tu descanso por maternidad en Nicaragua: {{ni.maternidad-semanas[prenatal]}} semanas antes del parto y {{ni.maternidad-semanas[postnatal]}} después. Cuánto paga el INSS ({{ni.subsidio-maternidad}}) y cuánto el empleador.",
  intro: [
    "En Nicaragua tenés derecho a {{ni.maternidad-semanas[prenatal]}} semanas de descanso antes del parto y {{ni.maternidad-semanas[postnatal]}} después, con tu salario. Si el parto es múltiple, son {{ni.maternidad-semanas[postnatal-multiple]}} semanas después.",
    "Poné la fecha probable del parto y tu salario. Te decimos desde cuándo hasta cuándo es el descanso y cuánto cobrás.",
  ],
  comoSeCalcula: [
    "El descanso empieza {{ni.maternidad-semanas[prenatal]}} semanas antes de la fecha probable del parto.",
    "Termina {{ni.maternidad-semanas[postnatal]}} semanas después del parto, o {{ni.maternidad-semanas[postnatal-multiple]}} si es múltiple.",
    "Cobrás tu salario de esos días (mensual entre 30, por cada día). El INSS paga el {{ni.subsidio-maternidad}} y el empleador completa el resto.",
  ],
  ejemplo: ["Con parto previsto el 1 de diciembre de 2026 y un salario de C$9,000, descansás del 3 de noviembre de 2026 al 25 de enero de 2027 y cobrás C$25,200."],
  faq: [
    {
      pregunta: "¿Cuántas semanas dura la licencia por maternidad en Nicaragua?",
      respuesta: "Doce semanas: {{ni.maternidad-semanas[prenatal]}} antes del parto y {{ni.maternidad-semanas[postnatal]}} después. En un parto múltiple, {{ni.maternidad-semanas[postnatal-multiple]}} después.",
    },
    {
      pregunta: "¿Cuánto paga el INSS por maternidad?",
      respuesta: "El {{ni.subsidio-maternidad}} de tu remuneración semanal promedio, si cotizaste 16 semanas dentro de las 39 anteriores al parto.",
    },
    {
      pregunta: "¿Qué pasa si el bebé nace antes de la fecha?",
      respuesta: "Los días de descanso que no usaste antes del parto se suman al descanso posterior. No los perdés.",
    },
    {
      pregunta: "¿Me pueden despedir por estar embarazada?",
      respuesta: "No. Embarazada o durante el descanso solo te pueden despedir por una causa justificada que apruebe antes el Ministerio del Trabajo (artículo 144).",
    },
    {
      pregunta: "¿Tengo tiempo para amamantar cuando vuelvo?",
      respuesta: "Sí. Mientras estés lactando tenés quince minutos cada tres horas de jornada para alimentar a tu bebé, y cuentan como tiempo trabajado.",
    },
  ],
  glosario: [
    { termino: "Descanso prenatal", definicion: "Las semanas de descanso antes de la fecha probable del parto." },
    { termino: "Descanso postnatal", definicion: "Las semanas de descanso después del parto." },
    { termino: "Subsidio", definicion: "Lo que paga el INSS mientras no podés trabajar." },
  ],
});
