import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.salario-neto",
  h1: "Calculadora de salario neto",
  title: "Salario neto en Paraguay: calculá tu descuento de IPS",
  description: "Poné tu salario bruto y mirá cuánto cobrás en mano después del aporte al IPS del {{py.ips-trabajador}}. También ves cuánto aporta tu empleador.",
  intro: [
    "Tu salario neto es lo que cobrás después del descuento del IPS. Al trabajador le descuentan el {{py.ips-trabajador}} del salario bruto.",
    "Poné lo que cobraste en el mes, con horas extra y comisiones. El aguinaldo no paga aporte, así que no lo sumes.",
  ],
  comoSeCalcula: [
    "Se toma el salario bruto del mes: salario, horas extra, comisiones y otros cobros habituales.",
    "Se le descuenta el aporte del trabajador al IPS, que es el {{py.ips-trabajador}}.",
    "El empleador aporta aparte el {{py.ips-empleador}} sobre el mismo monto. Eso no sale de tu bolsillo.",
    "Para jornada completa, el IPS toma como base mínima el salario mínimo, que hoy es {{py.salario-minimo}}.",
  ],
  ejemplo: ["Si tu salario bruto es Gs. 4.000.000, el IPS te descuenta Gs. 360.000 y cobrás Gs. 3.640.000. Tu empleador aporta otros Gs. 660.000."],
  faq: [
    {
      pregunta: "¿Cuánto me descuenta el IPS?",
      respuesta: "El {{py.ips-trabajador}} de tu salario bruto. Con ese aporte tenés cobertura de salud y sumás para tu jubilación.",
    },
    {
      pregunta: "¿Al aguinaldo le descuentan IPS?",
      respuesta: "No. El aguinaldo no paga aporte al IPS, así que lo cobrás entero.",
    },
    {
      pregunta: "¿Me tienen que descontar IRP del salario?",
      respuesta: "La calculadora no lo descuenta. El IRP se declara una vez al año, en marzo, y solo si tus ingresos del año pasan el monto no alcanzado. Para estimarlo, usá la calculadora de IRP.",
    },
    {
      pregunta: "¿Las horas extra pagan IPS?",
      respuesta: "Sí. Para el IPS, el salario incluye horas extra, comisiones, premios y gratificaciones. Solo queda afuera el aguinaldo.",
    },
  ],
  glosario: [
    { termino: "IPS", definicion: "Instituto de Previsión Social. Da cobertura de salud y paga jubilaciones a los trabajadores asalariados." },
    { termino: "Salario bruto", definicion: "Lo que ganás antes de cualquier descuento." },
  ],
});
