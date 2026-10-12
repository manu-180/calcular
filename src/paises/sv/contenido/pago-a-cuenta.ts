import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.pago-a-cuenta",
  h1: "Calculadora del pago a cuenta",
  title: "Pago a cuenta en El Salvador: calcule el {{sv.pago-a-cuenta[general]}} mensual",
  description: "Calcule el pago o anticipo a cuenta del impuesto sobre la renta: {{sv.pago-a-cuenta[general]}} de sus ingresos brutos del mes, o la tasa menor que le toque según su actividad.",
  intro: [
    "Si tiene un negocio o una empresa, cada mes adelanta parte de su impuesto sobre la renta. Ese adelanto es el pago a cuenta.",
    "En general es el {{sv.pago-a-cuenta[general]}} de los ingresos brutos del mes. Algunos distribuidores, el transporte de pasajeros y las gasolineras de sociedades pagan un porcentaje menor.",
  ],
  comoSeCalcula: [
    "Se toman los ingresos brutos del mes, sin restar costos ni gastos.",
    "Se aplica el porcentaje de su actividad: {{sv.pago-a-cuenta[general]}} en general, {{sv.pago-a-cuenta[distribuidores]}} para distribuidores con precio sugerido, {{sv.pago-a-cuenta[transporte]}} para transporte de pasajeros y {{sv.pago-a-cuenta[gasolineras]}} para gasolineras de sociedades.",
  ],
  ejemplo: ["Un comercio que vendió $10,000 en el mes paga $175 de pago a cuenta."],
  faq: [
    {
      pregunta: "¿Cuándo se paga?",
      respuesta: "Dentro de los diez días hábiles después de terminar el mes, con la declaración de pago a cuenta. Se presenta aunque no haya nada que pagar.",
    },
    {
      pregunta: "¿Qué pasa con lo que pagué durante el año?",
      respuesta: "Lo resta del impuesto en su declaración anual de renta. Si pagó de más, puede pedir la devolución o usarlo en los meses siguientes.",
    },
    {
      pregunta: "¿Quiénes no hacen pago a cuenta?",
      respuesta: "Las empresas que solo se dedican a la agricultura o la ganadería, y las personas que venden gasolina y diésel (aunque igual declaran sus ingresos cada mes).",
    },
    {
      pregunta: "¿Los profesionales también pagan?",
      respuesta: "Sí, pero solo por lo que cobraron sin retención. Lo que ya les retuvieron no entra en el pago a cuenta.",
    },
  ],
  glosario: [
    { termino: "Ingresos brutos", definicion: "Todo lo que vendió o cobró en el mes, antes de restar costos y gastos." },
    { termino: "Anticipo a cuenta", definicion: "Otro nombre del pago a cuenta: un adelanto mensual del impuesto sobre la renta." },
  ],
});
