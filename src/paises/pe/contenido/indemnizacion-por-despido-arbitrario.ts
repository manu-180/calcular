import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.despido-arbitrario",
  h1: "Calculadora de indemnización por despido arbitrario en Perú",
  title: "Indemnización por despido arbitrario 2026: calculadora",
  description:
    "Calcula tu indemnización por despido arbitrario en Perú: una remuneración y media por año, con tope de 12. Para contrato indefinido, plazo fijo y REMYPE.",
  intro: [
    "Si te despiden sin causa justa, la indemnización por despido arbitrario es de una remuneración y media por cada año completo, con un tope de 12 remuneraciones. Los meses y días sueltos se pagan en proporción.",
    "Es aparte de tu liquidación de beneficios sociales. Si te despiden durante los tres primeros meses (el periodo de prueba), no corresponde indemnización.",
  ],
  comoSeCalcula: [
    "Contrato indefinido: 1.5 remuneraciones por año completo, más dozavos por los meses y treintavos por los días. Tope: 12 remuneraciones.",
    "Contrato a plazo fijo: 1.5 remuneraciones por cada mes que faltaba para que termine el contrato, con el mismo tope.",
    "Pequeña empresa del REMYPE: 20 remuneraciones diarias por año, hasta 120. Microempresa: 10 remuneraciones diarias por año, hasta 90. Ahí los meses sueltos cuentan en dozavos.",
    "La remuneración diaria es tu sueldo mensual entre 30.",
  ],
  ejemplo: [
    "Ganas S/ 3,000 y te despiden después de 6 años y 6 meses con contrato indefinido. Te corresponden 1.5 × 6.5 = 9.75 remuneraciones: S/ 29,250.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me pagan por despido arbitrario?",
      respuesta: "En el régimen general, una remuneración y media por cada año trabajado, con un tope de 12 remuneraciones. Con 2 años y un sueldo de S/ 2,000, son S/ 6,000.",
    },
    {
      pregunta: "¿Además me pagan la liquidación?",
      respuesta: "Sí. La indemnización es aparte: también te deben la CTS trunca, la gratificación trunca y las vacaciones truncas.",
    },
    {
      pregunta: "¿Me corresponde indemnización si renuncio?",
      respuesta: "No. Solo si te despiden sin causa justa o si renuncias por hostilidad del empleador y lo pruebas.",
    },
    {
      pregunta: "¿Cuánto es lo máximo que me pueden pagar?",
      respuesta: "En el régimen general, 12 remuneraciones mensuales. En la pequeña empresa, 120 remuneraciones diarias (4 sueldos), y en la microempresa, 90 (3 sueldos).",
    },
    {
      pregunta: "¿Qué pasa si me despidieron estando a plazo fijo?",
      respuesta: "Te deben 1.5 remuneraciones por cada mes que faltaba para que terminara tu contrato, con un tope de 12.",
    },
  ],
  glosario: [
    { termino: "Despido arbitrario", definicion: "El despido sin una causa justa probada, o sin seguir el procedimiento de la ley." },
    { termino: "Periodo de prueba", definicion: "Los primeros tres meses de trabajo. Si te despiden en ese plazo, no hay indemnización." },
    { termino: "Remuneración diaria", definicion: "Tu sueldo mensual dividido entre 30." },
  ],
});
