import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.licencia-por-maternidad",
  h1: "Calculadora de licencia por maternidad en El Salvador",
  title: "Licencia por maternidad El Salvador: fechas y pago 2026",
  description: "Calcule cuándo empieza y termina su licencia por maternidad de {{sv.maternidad-dias}} y cuánto le pagan el ISSS y su patrono.",
  intro: [
    "La licencia por maternidad dura {{sv.maternidad-dias}} (16 semanas). {{sv.maternidad-semanas-posparto}} de esas semanas se toman obligatoriamente después del parto.",
    "Si cotiza al ISSS, el Seguro le paga un subsidio del {{sv.maternidad-subsidio-isss}} de su salario. Si no, su patrono le paga el {{sv.maternidad-patrono-porcentaje}} por adelantado.",
  ],
  comoSeCalcula: [
    "La licencia empieza las semanas que usted elija antes de la fecha probable del parto y dura {{sv.maternidad-dias}} en total.",
    "Subsidio del ISSS: el {{sv.maternidad-subsidio-isss}} de su salario diario por cada día de licencia, con el techo de {{sv.isss-salario-maximo}} al mes. Se le descuenta la AFP.",
    "El patrono debe como mínimo el {{sv.maternidad-patrono-porcentaje}} del salario. Si el ISSS ya paga eso, el patrono no paga más; si no lo alcanza, completa la diferencia.",
  ],
  ejemplo: [
    "Con parto previsto el 15 de diciembre de 2026 y cuatro semanas antes, la licencia va del 17 de noviembre de 2026 al 8 de marzo de 2027. Con $600 de salario, el ISSS paga $2,240.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto dura la licencia por maternidad?",
      respuesta: "{{sv.maternidad-dias}}, es decir 16 semanas. Al menos {{sv.maternidad-semanas-posparto}} semanas van después del parto.",
    },
    {
      pregunta: "¿Qué pasa si el bebé nace después de la fecha probable?",
      respuesta: "El descanso antes del parto se alarga hasta el día real del nacimiento y no se acortan las semanas obligatorias de después.",
    },
    {
      pregunta: "¿Me pueden despedir durante el embarazo?",
      respuesta: "No. Desde que comienza el embarazo y hasta seis meses después de la licencia, el despido no termina el contrato. Aun si la causa es anterior al embarazo, solo tiene efecto al final de ese período.",
    },
    {
      pregunta: "¿El papá tiene licencia?",
      respuesta: "Sí. El Código de Trabajo le da tres días pagados por el nacimiento o la adopción, que puede tomar dentro de los primeros quince días.",
    },
  ],
  glosario: [
    { termino: "Subsidio por maternidad", definicion: "El pago diario del ISSS mientras dura la licencia." },
    { termino: "Fecha probable del parto", definicion: "La que indica el médico en la constancia de embarazo." },
  ],
});
