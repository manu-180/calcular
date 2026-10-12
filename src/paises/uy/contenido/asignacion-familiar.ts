import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.asignacion-familiar",
  h1: "Calculadora de asignación familiar del BPS",
  title: "Asignación familiar 2026: cuánto cobrás por hijo",
  description:
    "Calculá la asignación familiar común (Ley 15.084): {{uy.afam-15084[monto1]}} por hijo si el hogar gana hasta {{uy.afam-15084[tope1]}} y {{uy.afam-15084[monto2]}} en la segunda franja.",
  intro: [
    "La asignación familiar es una ayuda del BPS por cada hijo o menor a cargo de trabajadores privados, jubilados y personas en seguro de paro. El monto depende de lo que gana el hogar.",
    "Poné los ingresos del hogar y cuántos hijos tenés a cargo. Te decimos cuánto cobrás por mes y cada dos meses.",
  ],
  comoSeCalcula: [
    "Si el hogar gana hasta {{uy.afam-15084[tope1]}} por mes, se cobran {{uy.afam-15084[monto1]}} por hijo.",
    "Si gana hasta {{uy.afam-15084[tope2]}}, se cobran {{uy.afam-15084[monto2]}} por hijo. Ese tope es para hogares de hasta dos hijos y sube {{uy.afam-15084[adicional]}} por cada hijo más.",
    "Por un hijo con discapacidad la asignación es doble.",
    "El BPS la paga cada dos meses.",
  ],
  ejemplo: ["Un hogar que gana $ 40.000 con dos hijos cobra $ 1.347 por hijo: $ 2.694 por mes, $ 5.388 cada dos meses."],
  faq: [
    {
      pregunta: "¿Cuánto es la asignación familiar por hijo en 2026?",
      respuesta: "{{uy.afam-15084[monto1]}} por mes si el hogar gana hasta {{uy.afam-15084[tope1]}}, y {{uy.afam-15084[monto2]}} si gana hasta {{uy.afam-15084[tope2]}}.",
    },
    {
      pregunta: "¿Hasta qué edad se cobra?",
      respuesta: "Hasta los 14 años si el niño va a la escuela, y hasta los 18 si estudia en liceo o UTU. Por discapacidad puede cobrarse de por vida.",
    },
    {
      pregunta: "¿Cada cuánto se cobra?",
      respuesta: "Cada dos meses, según el calendario de pagos del BPS.",
    },
    {
      pregunta: "¿Es lo mismo que la asignación del Plan de Equidad?",
      respuesta: "No. La del Plan de Equidad es para hogares vulnerables y tiene otros montos y requisitos. Esta calculadora es la de la Ley 15.084.",
    },
  ],
  glosario: [
    { termino: "Beneficiario", definicion: "El hijo o menor a cargo por el que se cobra la asignación." },
    { termino: "Ingresos del hogar", definicion: "La suma de lo que ganan las personas que viven en la casa." },
  ],
});
