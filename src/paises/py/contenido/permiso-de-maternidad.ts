import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.permiso-de-maternidad",
  h1: "Calculadora de permiso de maternidad",
  title: "Permiso de maternidad en Paraguay: fechas y subsidio IPS",
  description: "Calculá cuándo empieza y termina tu permiso de maternidad ({{py.permiso-maternidad[semanas]}} semanas, o {{py.permiso-maternidad[semanas-prematuro]}} si el parto es prematuro) y el subsidio estimado del IPS.",
  intro: [
    "Toda trabajadora tiene derecho a {{py.permiso-maternidad[semanas]}} semanas seguidas de permiso de maternidad. Durante ese tiempo el IPS paga un subsidio del {{py.subsidio-maternidad}} de tu remuneración.",
    "Si el parto es prematuro o el bebé necesita cuidados especiales, el permiso es de {{py.permiso-maternidad[semanas-prematuro]}} semanas. Con mellizos o más, suma un mes por cada bebé desde el segundo.",
  ],
  comoSeCalcula: [
    "El permiso empieza el día del parto, o {{py.permiso-maternidad[semanas-antes-del-parto]}} semanas antes si lo pedís.",
    "Dura {{py.permiso-maternidad[semanas]}} semanas seguidas, o {{py.permiso-maternidad[semanas-prematuro]}} en los casos especiales.",
    "Por cada bebé desde el segundo se suma {{py.permiso-maternidad[meses-por-bebe-adicional]}} mes. Si además es prematuro, rige el período más largo.",
    "El subsidio es el {{py.subsidio-maternidad}} de tu salario diario (mensual dividido {{py.divisor-salario-diario}}) por cada día de permiso.",
  ],
  ejemplo: ["Si tu parto es el 10 de noviembre de 2026 y empezás ese día, el permiso termina el 15 de marzo de 2027. Con Gs. 3.044.000 de salario, el subsidio estimado es de Gs. 12.784.800."],
  faq: [
    {
      pregunta: "¿Cuántas semanas dura el permiso de maternidad?",
      respuesta: "{{py.permiso-maternidad[semanas]}} semanas seguidas. Son {{py.permiso-maternidad[semanas-prematuro]}} si el parto es antes de la semana 35, si el bebé pesa menos de 2 kilos o si necesita cuidados especiales.",
    },
    {
      pregunta: "¿Quién paga el permiso de maternidad?",
      respuesta: "El IPS, con un subsidio del {{py.subsidio-maternidad}} de tu remuneración. Si tu empleador no te inscribió o debe aportes, lo tiene que pagar él.",
    },
    {
      pregunta: "¿Cuántos días tiene el padre?",
      respuesta: "{{py.permiso-paternidad-semanas}} semanas después del parto, con goce de sueldo. Es un derecho irrenunciable.",
    },
    {
      pregunta: "¿Me pueden despedir por estar embarazada?",
      respuesta: "No. Desde que avisás del embarazo y durante los permisos, el despido es nulo. Además tenés inamovilidad hasta un año después del nacimiento.",
    },
  ],
  glosario: [
    { termino: "Permiso de maternidad", definicion: "El descanso pago por el nacimiento de un hijo (Ley 5508/2015, artículo 11)." },
    { termino: "Subsidio", definicion: "El pago que hace el IPS en lugar del salario mientras dura el permiso." },
  ],
});
