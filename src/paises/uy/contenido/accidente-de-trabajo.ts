import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.accidente-de-trabajo",
  h1: "Calculadora de accidente de trabajo (BSE)",
  title: "Accidente de trabajo: cuánto paga el BSE por día",
  description:
    "Calculá lo que cobrás si tenés un accidente de trabajo: dos tercios de tu jornal desde el cuarto día, que paga el BSE, más el complemento del BPS hasta el {{uy.enfermedad-porcentaje}}.",
  intro: [
    "Si te accidentás trabajando, mientras no podés volver no cobra tu empleador: paga el Banco de Seguros del Estado (BSE). Te paga dos tercios de tu jornal por día.",
    "El BPS completa la diferencia hasta el {{uy.enfermedad-porcentaje}}, igual que en el subsidio por enfermedad. Poné tu sueldo y los días de ausencia.",
  ],
  comoSeCalcula: [
    "El jornal de un mensual es el sueldo dividido entre 30. Si cobrás por día, es tu jornal.",
    "El BSE paga dos tercios de ese jornal por cada día de ausencia, desde el día {{uy.accidente-dia-desde}}, incluidos los feriados.",
    "El BPS te paga lo que falta para llegar al {{uy.enfermedad-porcentaje}} del jornal.",
  ],
  ejemplo: ["Con un sueldo de $ 45.000 y 10 días sin trabajar, el BSE te paga 7 días a $ 1.000 ($ 7.000) y el BPS te completa $ 350."],
  faq: [
    {
      pregunta: "¿Cuánto paga el BSE por un accidente de trabajo?",
      respuesta: "Dos tercios de tu jornal o sueldo por cada día de ausencia, desde el día {{uy.accidente-dia-desde}}. El BPS completa hasta el {{uy.enfermedad-porcentaje}}.",
    },
    {
      pregunta: "¿Se cobran los primeros días?",
      respuesta: "No. Los tres primeros días de ausencia no se pagan.",
    },
    {
      pregunta: "¿Me pueden despedir después del accidente?",
      respuesta: "Al recuperarte, la empresa tiene que reintegrarte y no puede despedirte en los 180 días siguientes. Si lo hace, la indemnización es el triple de la común.",
    },
    {
      pregunta: "¿Y si es una enfermedad profesional?",
      respuesta: "Para las enfermedades profesionales la ley calcula la indemnización sobre el total del jornal, desde el día siguiente a dejar de trabajar.",
    },
  ],
  glosario: [
    { termino: "BSE", definicion: "Banco de Seguros del Estado. Cubre los accidentes de trabajo." },
    { termino: "Indemnización temporaria", definicion: "Lo que paga el BSE por día mientras no podés trabajar." },
  ],
});
