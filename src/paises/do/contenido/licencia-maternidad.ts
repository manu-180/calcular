import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.licencia-maternidad",
  h1: "Calculadora de licencia de maternidad en República Dominicana",
  title: "Licencia de maternidad en RD: fechas de inicio y fin",
  description: "Calcula cuándo empieza y termina tu licencia de maternidad de {{do.maternidad-semanas}} semanas a partir de la fecha probable de parto.",
  intro: [
    "La licencia de maternidad cubre {{do.maternidad-semanas}} semanas. Puede empezar hasta {{do.maternidad-semanas-antes}} semanas antes de la fecha probable de parto o el día del parto.",
    "Pon la fecha probable de parto y ves el primer y el último día de licencia, y cuándo vuelves a trabajar.",
  ],
  comoSeCalcula: [
    "Si la empiezas antes del parto, el primer día es {{do.maternidad-semanas-antes}} semanas antes de la fecha probable.",
    "Si la empiezas el día del parto, el primer día es ese.",
    "La licencia dura {{do.maternidad-semanas}} semanas seguidas desde el primer día.",
  ],
  ejemplo: [
    "Con parto probable el 1 de diciembre de 2026, la licencia puede empezar el 13 de octubre y termina el 18 de enero de 2027.",
  ],
  faq: [
    { pregunta: "¿Cuántas semanas dura la licencia de maternidad en RD?", respuesta: "{{do.maternidad-semanas}} semanas, según la normativa de subsidios de maternidad del Consejo Nacional de Seguridad Social." },
    { pregunta: "¿Quién paga la licencia de maternidad?", respuesta: "La SISALRIL paga el subsidio por maternidad a las afiliadas que cotizaron al menos 8 meses en los 12 anteriores al parto. Si el empleador no te inscribió en la TSS, debe pagarte el salario completo." },
    { pregunta: "¿Puedo pedir vacaciones después de la licencia?", respuesta: "Sí. Si las pides al terminar el descanso por maternidad, el empleador está obligado a dártelas." },
    { pregunta: "¿Qué pasa si el parto se adelanta?", respuesta: "La licencia empieza el día del parto y dura las mismas semanas." },
  ],
  glosario: [
    { termino: "Fecha probable de parto", definicion: "La fecha que estima tu médico para el nacimiento." },
    { termino: "Subsidio por maternidad", definicion: "El pago de la Seguridad Social durante la licencia." },
  ],
});
