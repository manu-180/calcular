import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.deducciones-personales",
  h1: "Calculadora del tope de deducciones personales 2026",
  title: "Deducciones personales 2026: tope y cuánto ahorras",
  description:
    "Calcula tu tope de deducciones personales para la declaración anual ({{mx.tope-deducciones-uma}} anuales o {{mx.tope-deducciones-porcentaje}} de tus ingresos) y cuánto ISR ahorras.",
  intro: [
    "Los gastos médicos, dentales, colegiaturas, intereses de tu crédito hipotecario y otros con factura se pueden restar de tus ingresos en la declaración anual. Pero hay un tope.",
    "El tope es lo menor entre {{mx.tope-deducciones-uma}} anuales y el {{mx.tope-deducciones-porcentaje}} de tus ingresos del año. Con esta calculadora ves tu tope y cuánto ISR te ahorras.",
  ],
  comoSeCalcula: [
    "Tope por UMA: {{mx.tope-deducciones-uma}} anuales. La UMA anual es la mensual ({{mx.uma-mensual}}) por 12.",
    "Tope por ingresos: {{mx.tope-deducciones-porcentaje}} de todos tus ingresos del año, incluidos los exentos.",
    "Tu tope es el menor de los dos. Lo que gastaste por encima no se deduce.",
    "El ahorro es la diferencia entre el ISR anual con y sin la deducción.",
  ],
  ejemplo: ["Con 300,000 pesos de ingresos tu tope es de 45,000 (el 15 %). Si tienes 40,000 de gastos deducibles, te ahorras unos 8,544 pesos de ISR."],
  faq: [
    {
      pregunta: "¿Qué gastos entran en el tope?",
      respuesta: "Casi todas las deducciones personales: médicas, dentales, hospitalarias, funerales, intereses hipotecarios, donativos y seguros de gastos médicos. Las aportaciones voluntarias al retiro no cuentan para este tope; tienen su propio límite.",
    },
    {
      pregunta: "¿Puedo deducir gastos pagados en efectivo?",
      respuesta: "Los gastos médicos, dentales y hospitalarios tienen que pagarse con tarjeta, transferencia o cheque nominativo para ser deducibles.",
    },
    {
      pregunta: "¿Las colegiaturas también son deducibles?",
      respuesta: "Sí, por un decreto aparte y con un límite por nivel escolar. Revisa los montos en el portal del SAT antes de capturarlas.",
    },
  ],
  glosario: [{ termino: "UMA anual", definicion: "Valor de la UMA mensual por 12. Se usa para el tope de deducciones personales." }],
});
