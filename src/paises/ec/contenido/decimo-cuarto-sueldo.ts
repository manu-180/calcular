import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.decimo-cuarto-sueldo",
  h1: "Calculadora del décimo cuarto sueldo 2026",
  title: "Décimo cuarto sueldo 2026 Ecuador: calcula cuánto te toca",
  description: "Calcula tu décimo cuarto 2026 con el básico de {{ec.sbu}}: completo o proporcional, para la Sierra y Amazonía o la Costa y Galápagos. Con fecha de pago.",
  intro: [
    "El décimo cuarto sueldo de 2026 es un salario básico: {{ec.sbu}}. Lo cobra toda persona con relación de dependencia, gane lo que gane. Si trabajaste menos de un año, recibes la parte proporcional.",
    "La fecha de pago depende de la región: en la Costa y Galápagos se paga hasta el 15 de marzo, y en la Sierra y Amazonía hasta el 15 de agosto.",
  ],
  comoSeCalcula: [
    "El décimo cuarto completo es un salario básico: {{ec.sbu}} en 2026. No depende de tu sueldo.",
    "Si no trabajaste el año completo, cobras la parte proporcional: el salario básico dividido para 12, por cada mes trabajado en el período.",
    "En la Costa y Galápagos el período va del 1 de marzo al último día de febrero. En la Sierra y Amazonía, del 1 de agosto al 31 de julio.",
    "Si te vas antes de la fecha de pago, te pagan lo proporcional en la liquidación.",
  ],
  ejemplo: [
    "Trabajas en Quito desde 2020 y lo cobras acumulado. En agosto de 2027 recibes un salario básico completo: {{ec.sbu}} si el básico no cambia.",
    "Entraste en Guayaquil el 16 de septiembre de 2025. Hasta el 28 de febrero de 2026 llevas 5 meses y 13 días, así que el 15 de marzo de 2026 cobras $218,24.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el décimo cuarto en 2026?",
      respuesta: "Un salario básico unificado: {{ec.sbu}}. Si trabajaste menos de un año en el período, cobras la parte proporcional.",
    },
    {
      pregunta: "¿Cómo se calcula el décimo cuarto proporcional?",
      respuesta: "Divide el salario básico de {{ec.sbu}} para 12 y multiplica por los meses que trabajaste en el período. Los días sueltos también suman, en proporción.",
    },
    {
      pregunta: "¿Cuándo se paga el décimo cuarto?",
      respuesta: "En la Costa y Galápagos, hasta el 15 de marzo. En la Sierra y Amazonía, hasta el 15 de agosto. Si lo cobras cada mes, llega en tu rol de pagos como un doceavo del básico.",
    },
    {
      pregunta: "¿Cómo pido cobrarlo acumulado en vez de cada mes?",
      respuesta: "Por escrito a tu empleador, en los primeros quince días de enero. Si entras a un trabajo nuevo, lo pides al firmar el contrato o en los quince días siguientes.",
    },
    {
      pregunta: "¿El décimo cuarto paga aportes al IESS o impuesto a la renta?",
      respuesta: "No. No cuenta para los aportes al IESS, ni para el fondo de reserva, ni para el impuesto a la renta.",
    },
    {
      pregunta: "¿Qué región me toca si trabajo en Galápagos o en la Amazonía?",
      respuesta: "Galápagos (región Insular) sigue el calendario de la Costa. La Amazonía sigue el de la Sierra.",
    },
  ],
  glosario: [
    { termino: "Salario básico unificado (SBU)", definicion: "El sueldo mínimo mensual que fija cada año el Ministerio del Trabajo." },
    { termino: "Décimo cuarto", definicion: "Bono anual de un salario básico (en la ley, decimocuarta remuneración)." },
    { termino: "Mensualizado", definicion: "Cuando el décimo se paga cada mes en el rol de pagos, en lugar de una vez al año." },
  ],
});
