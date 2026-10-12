import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.isr-persona-fisica",
  h1: "Calculadora del ISR anual de personas físicas (IR-1)",
  title: "ISR de personas físicas en RD: calcula tu IR-1",
  description: "Calcula el impuesto sobre la renta anual de un profesional o independiente: renta neta, gastos educativos, retenciones y saldo a pagar o a favor.",
  intro: [
    "Si trabajas por tu cuenta o tienes ingresos además del salario, declaras el ISR del año en el formulario IR-1.",
    "Pon tus ingresos, tus gastos deducibles y lo que ya te retuvieron. Ves el impuesto y si te queda saldo a pagar o a favor.",
  ],
  comoSeCalcula: [
    "Renta neta: ingresos menos los costos y gastos deducibles.",
    "Se restan los gastos educativos, hasta el {{do.gastos-educativos-tope-ingreso}} de la renta y el {{do.gastos-educativos-tope-exento}} del monto exento.",
    "Al resultado se le aplica la escala anual del ISR.",
    "Se restan las retenciones y anticipos ya pagados.",
  ],
  ejemplo: [
    "Con RD$1,500,000 de ingresos y RD$300,000 de gastos, la renta neta es RD$1,200,000 y el ISR del año, RD$162,995.25. Si te retuvieron RD$100,000, pagas RD$62,995.25.",
  ],
  faq: [
    { pregunta: "¿Cuánto es el monto exento del ISR?", respuesta: "En 2026, la renta anual hasta el primer tramo de la escala no paga ISR. Desde 2027 sube con la Ley 30-26." },
    { pregunta: "¿Cuándo se presenta el IR-1?", respuesta: "Se presenta una vez al año, después del cierre del ejercicio. Revisa la fecha límite en el calendario de la DGII." },
    { pregunta: "¿Las retenciones de mis clientes se restan?", respuesta: "Sí. La retención sobre honorarios es un pago a cuenta del impuesto anual." },
    { pregunta: "¿Y los alquileres?", respuesta: "Desde el 1 de julio de 2026 la retención sobre alquileres pagados por empresas es definitiva: esos ingresos ya pagaron su ISR." },
  ],
  glosario: [
    { termino: "IR-1", definicion: "Declaración jurada anual del ISR de personas físicas." },
    { termino: "Renta neta", definicion: "Ingresos menos los gastos que la ley permite restar." },
    { termino: "Saldo a favor", definicion: "Lo que pagaste de más y la DGII te devuelve o compensa." },
  ],
});
