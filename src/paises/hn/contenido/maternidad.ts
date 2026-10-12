import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.maternidad",
  h1: "Calculadora del descanso por maternidad en Honduras",
  title: "Licencia de maternidad en Honduras: fechas y pago",
  description: "Calcule cuándo empieza y termina su descanso por maternidad y cuánto le pagan: {{hn.maternidad-semanas[antes]}} semanas antes del parto y {{hn.maternidad-semanas[despues]}} después.",
  intro: [
    "Toda trabajadora embarazada tiene un descanso pagado de {{hn.maternidad-semanas[antes]}} semanas antes del parto y {{hn.maternidad-semanas[despues]}} semanas después. Conserva su empleo y todos sus derechos.",
    "Escriba su salario promedio y la fecha probable del parto. Le mostramos las fechas del descanso y cuánto debe recibir en total.",
  ],
  comoSeCalcula: [
    "Inicio: la fecha probable del parto menos {{hn.maternidad-semanas[antes]}} semanas. Fin: la fecha del parto más {{hn.maternidad-semanas[despues]}} semanas.",
    "Salario diario = promedio de lo ganado en los últimos {{hn.maternidad-promedio-dias}}, llevado a un mes, / 30.",
    "Pago total = salario diario × días de descanso.",
  ],
  ejemplo: ["Gana L15,000 y el parto se espera el 15 de diciembre de 2026. Descansa del 17 de noviembre al 26 de enero (70 días) y recibe L35,000."],
  faq: [
    {
      pregunta: "¿Cuántas semanas de licencia por maternidad hay en Honduras?",
      respuesta: "{{hn.maternidad-semanas[antes]}} semanas pagadas antes del parto y {{hn.maternidad-semanas[despues]}} después, según el artículo 135 del Código del Trabajo.",
    },
    {
      pregunta: "¿Quién paga la licencia de maternidad?",
      respuesta: "Si está asegurada, el IHSS paga un subsidio y el patrono pone la diferencia hasta su salario completo. Si el IHSS no cubre, paga todo el patrono.",
    },
    {
      pregunta: "¿Qué necesito para pedir el descanso?",
      respuesta: "Un certificado médico con el embarazo, la fecha probable del parto y el día en que debe empezar el descanso.",
    },
    {
      pregunta: "¿Me pueden despedir estando embarazada?",
      respuesta: "No sin autorización de la Inspección del Trabajo y por una causa justa. Si la despiden sin ella, cobra una indemnización especial.",
    },
  ],
  glosario: [
    { termino: "Descanso pre y posnatal", definicion: "Las semanas pagadas antes y después del parto (artículo 135 del Código del Trabajo)." },
    { termino: "Subsidio de maternidad", definicion: "El pago que hace el IHSS a la trabajadora asegurada durante el descanso." },
  ],
});
