import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.fcl",
  h1: "Calculadora del FCL (Fondo de Capitalización Laboral)",
  title: "FCL en Costa Rica: cuánto tengo acumulado y cuándo retirarlo",
  description:
    "Calcule cuánto lleva ahorrado en su Fondo de Capitalización Laboral: el patrono aporta {{cr.fcl}} de su salario cada mes. Vea cuándo puede retirarlo.",
  intro: [
    "El FCL es un ahorro a su nombre que el patrono deposita cada mes en una operadora de pensiones. Es el {{cr.fcl}} de su salario y no se rebaja de su pago.",
    "Escriba su salario y los meses trabajados para estimar cuánto tiene acumulado.",
  ],
  comoSeCalcula: [
    "Aporte mensual: {{cr.fcl}} de su salario bruto.",
    "Acumulado: el aporte por los meses trabajados desde su último retiro.",
    "Retiro: cada {{cr.fcl-anios-retiro}} con el mismo patrono, o todo cuando termina la relación laboral.",
  ],
  ejemplo: ["Con un salario de ₡800.000 durante cinco años, el FCL acumula ₡720.000 más los rendimientos."],
  faq: [
    {
      pregunta: "¿Cuándo puedo retirar el FCL?",
      respuesta: "Cada {{cr.fcl-anios-retiro}} si sigue con el mismo patrono, y todo el saldo cuando termina la relación laboral, por renuncia, despido o cualquier otra causa.",
    },
    {
      pregunta: "¿El FCL paga renta o cargas sociales?",
      respuesta: "No. Es un ahorro exento del impuesto sobre la renta y de cargas sociales.",
    },
    {
      pregunta: "¿Dónde veo mi saldo real?",
      respuesta: "En el estado de cuenta de su operadora de pensiones. Ahí aparecen también los rendimientos.",
    },
    {
      pregunta: "¿El FCL reemplaza la cesantía?",
      respuesta: "No. Si lo despiden sin justa causa, el patrono le debe la cesantía completa además del FCL.",
    },
  ],
  glosario: [
    { termino: "FCL", definicion: "Fondo de Capitalización Laboral, creado por la Ley de Protección al Trabajador." },
    { termino: "Operadora de pensiones", definicion: "La entidad que administra su FCL y su pensión complementaria." },
  ],
});
