import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.intereses-prestaciones",
  h1: "Calculadora de intereses de prestaciones sociales",
  title: "Intereses de prestaciones sociales con la tasa BCV",
  description:
    "Calcula los intereses de tu garantía de prestaciones con la tasa del BCV del {{ve.tasa-prestaciones}} (promedio) o la activa del {{ve.tasa-activa}} si no te depositaron.",
  intro: [
    "Tu garantía de prestaciones genera intereses. Si la empresa la lleva en su contabilidad, se pagan a la tasa promedio entre la activa y la pasiva que fija el Banco Central de Venezuela: hoy {{ve.tasa-prestaciones}} anual.",
    "Si la empresa no depositó la garantía, se aplica la tasa activa, que hoy es {{ve.tasa-activa}} anual. Las tasas se actualizan solas cada mes desde la web del BCV.",
  ],
  comoSeCalcula: [
    "Elegimos la tasa según dónde está tu garantía: promedio ({{ve.tasa-prestaciones}}) o activa ({{ve.tasa-activa}}).",
    "Interés mensual: garantía por la tasa anual, entre 12.",
    "Interés del período: el mensual por la cantidad de meses.",
  ],
  ejemplo: ["Con Bs 10.000 en la contabilidad de la empresa y una tasa de 47,46 %, los intereses de un año dan Bs 4.746."],
  faq: [
    {
      pregunta: "¿Qué tasa de interés se usa para las prestaciones sociales?",
      respuesta: "La que fija el BCV cada mes. Si la garantía está en la contabilidad de la empresa, el promedio entre activa y pasiva ({{ve.tasa-prestaciones}}). Si no la depositaron, la activa ({{ve.tasa-activa}}).",
    },
    {
      pregunta: "¿Cuándo se publica la tasa nueva?",
      respuesta: "El BCV la publica en Gaceta Oficial con unos 50 días de atraso. Por eso la tasa más reciente siempre es de uno o dos meses atrás.",
    },
    {
      pregunta: "¿Cuándo me pagan los intereses?",
      respuesta: "Se calculan cada mes y se pagan al cumplir cada año de servicio, salvo que pidas por escrito capitalizarlos.",
    },
    {
      pregunta: "¿Y si mi garantía está en un fideicomiso?",
      respuesta: "Entonces ganas lo que rinda el fideicomiso, no la tasa del BCV. El banco te tiene que informar el capital y los intereses cada año.",
    },
    {
      pregunta: "¿Pagan impuesto los intereses?",
      respuesta: "No. Las prestaciones sociales y sus intereses están exentos del impuesto sobre la renta.",
    },
  ],
  glosario: [
    { termino: "Tasa activa", definicion: "La que cobran los bancos por sus préstamos. El BCV la toma de los seis principales bancos." },
    { termino: "Tasa promedio", definicion: "El promedio entre la tasa activa y la pasiva, la que pagan los bancos por los depósitos." },
  ],
});
