import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.cuotas-imss",
  h1: "Calculadora de cuotas obrero patronales del IMSS 2026",
  title: "Cuotas IMSS 2026: obrero, patronal e Infonavit",
  description:
    "Calcula las cuotas obrero patronales del IMSS, el retiro, la cesantía y el Infonavit de un sueldo, con la tabla de cesantía de 2026 y la UMA vigente.",
  intro: [
    "Cada mes la empresa paga al IMSS una parte por cada trabajador y le descuenta otra del sueldo. Con esta calculadora ves las dos, más el retiro, la cesantía y vejez y la aportación al Infonavit.",
    "Usa el salario base de cotización (SBC) de tu recibo. Si no lo tienes, lo estimamos con el aguinaldo y la prima vacacional de ley.",
  ],
  comoSeCalcula: [
    "El SBC es el salario diario más la parte proporcional de prestaciones. Nunca baja del salario mínimo ni pasa de {{mx.tope-sbc-imss}}.",
    "El trabajador paga {{mx.cuotas-imss-obrero[cesantia-vejez]}} de cesantía y vejez, {{mx.cuotas-imss-obrero[invalidez-vida]}} de invalidez y vida, {{mx.cuotas-imss-obrero[gastos-medicos-pensionados]}} de gastos médicos de pensionados y {{mx.cuotas-imss-obrero[prestaciones-dinero]}} de prestaciones en dinero. Además, {{mx.cuotas-imss-obrero[excedente-eym]}} de lo que su SBC pase de {{mx.umbral-excedente-imss}}.",
    "La empresa paga una cuota fija de {{mx.cuotas-imss-patron[cuota-fija]}} de la UMA por día, más {{mx.cuotas-imss-patron[excedente-eym]}} sobre el excedente de {{mx.umbral-excedente-imss}}, invalidez y vida, guarderías, gastos médicos de pensionados, prestaciones en dinero y su prima de riesgo de trabajo.",
    "Para el retiro paga {{mx.cuotas-imss-patron[retiro]}} del SBC. La cesantía y vejez patronal sube cada año hasta 2030 y depende de cuántas UMA gana la persona.",
    "Al Infonavit la empresa aporta {{mx.aportacion-vivienda}} del SBC.",
  ],
  ejemplo: [
    "Con un SBC de 500 pesos diarios en una empresa de clase I, en un mes de 30 días el trabajador paga unos 374 pesos de IMSS y la empresa unos 3,700 entre IMSS, retiro, cesantía e Infonavit.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me descuentan de IMSS en mi recibo?",
      respuesta: "La suma de cuatro cuotas sobre tu salario base de cotización, y una quinta si ganas más de {{mx.umbral-excedente-imss}} al día. Si ganas el salario mínimo no te descuentan nada: lo paga tu empresa.",
    },
    {
      pregunta: "¿Por qué la cuota de cesantía y vejez cambia cada año?",
      respuesta: "La reforma de pensiones de 2020 sube la parte de la empresa cada 1 de enero desde 2023 hasta 2030. Quien gana más paga una tasa mayor. La parte del trabajador se queda igual.",
    },
    {
      pregunta: "¿Qué prima de riesgo de trabajo uso?",
      respuesta: "La que tu empresa determinó en febrero con su siniestralidad. Si es nueva, paga la prima media de su clase: {{mx.prima-riesgo-trabajo[clase-i]}} en clase I.",
    },
    {
      pregunta: "¿Cada cuándo se pagan?",
      respuesta: "Las cuotas del IMSS se pagan cada mes. El retiro, la cesantía y vejez y el Infonavit se pagan cada dos meses.",
    },
  ],
  glosario: [
    { termino: "SBC", definicion: "Salario base de cotización: el salario diario con el que se calculan las cuotas del IMSS e Infonavit." },
    { termino: "RCV", definicion: "Retiro, cesantía en edad avanzada y vejez. Se deposita en la cuenta de tu Afore." },
    { termino: "UMA", definicion: "Unidad de Medida y Actualización. Sirve de referencia para topes y cuotas en lugar del salario mínimo." },
  ],
});
