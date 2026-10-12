import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.feriados",
  h1: "Pago de feriados en Costa Rica",
  title: "Pago de feriados 2026 en Costa Rica: doble y horas extra",
  description:
    "Calcule cuánto le deben pagar por trabajar un feriado: pago doble, feriados de pago obligatorio y no obligatorio, y horas extra a triple. Según el MTSS.",
  intro: [
    "En Costa Rica hay nueve feriados de pago obligatorio y tres de pago no obligatorio. Si trabaja un feriado, se paga doble.",
    "Cómo se aplica depende de cómo le pagan: por mes, por semana en comercio o por semana en otra actividad. Elija su caso y le mostramos el monto.",
  ],
  comoSeCalcula: [
    "Salario diario: el mensual entre {{cr.dias-mes-planilla}}, o su salario de un día si le pagan por semana.",
    "Pago mensual o semanal en comercio: el feriado ya viene en el salario. Si lo trabaja, se suma un día sencillo y queda pagado {{cr.feriado-factor-trabajado}} veces.",
    "Pago semanal en otra actividad: el feriado obligatorio se paga sencillo aunque no lo trabaje y doble si lo trabaja. El no obligatorio se paga solo si lo trabaja.",
    "Horas extra en un feriado: {{cr.feriado-factor-horas-extra}} veces la hora ordinaria. En un feriado no obligatorio con pago semanal, a tiempo y medio.",
  ],
  ejemplo: [
    "Con un salario de ₡600.000 al mes, si trabaja el 15 de setiembre le suman ₡20.000. Si además hace dos horas extra, le suman ₡15.000 más.",
  ],
  faq: [
    {
      pregunta: "¿Cuáles son los feriados de pago obligatorio en 2026?",
      respuesta: "1 de enero, 2 y 3 de abril (Jueves y Viernes Santo), 11 de abril, 1 de mayo, 25 de julio, 15 de agosto, 15 de setiembre y 25 de diciembre.",
    },
    {
      pregunta: "¿Me pueden obligar a trabajar un feriado?",
      respuesta: "No. Solo trabaja si está de acuerdo, salvo en las actividades que el Código de Trabajo permite abrir esos días. Si se niega, no lo pueden sancionar.",
    },
    {
      pregunta: "¿Si gano por mes me pagan el feriado aparte?",
      respuesta: "No, porque su salario mensual ya lo incluye. Solo si trabaja el feriado le suman un día más.",
    },
    {
      pregunta: "¿Se trasladan los feriados al lunes?",
      respuesta: "En 2026 el MTSS indica que cada feriado se disfruta el propio día. El 25 de julio nunca se traslada.",
    },
  ],
  glosario: [
    { termino: "Pago sencillo", definicion: "El salario de un día normal." },
    { termino: "Pago doble", definicion: "Dos veces el salario de un día: lo que corresponde por trabajar un feriado." },
  ],
});
