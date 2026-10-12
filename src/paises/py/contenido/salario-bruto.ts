import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.salario-bruto",
  h1: "Calculadora de salario bruto desde el neto",
  title: "Del salario neto al bruto en Paraguay: calculalo",
  description: "Si sabés cuánto querés cobrar en mano, calculá el salario bruto que tenés que pedir. Sumamos el {{py.ips-trabajador}} de aporte al IPS.",
  intro: [
    "Cuando negociás un sueldo, conviene hablar en bruto. Si sabés cuánto querés cobrar en mano, acá ves el bruto que corresponde.",
    "La única retención mensual de un asalariado es el aporte al IPS: el {{py.ips-trabajador}} del bruto.",
  ],
  comoSeCalcula: [
    "El neto es el bruto menos el {{py.ips-trabajador}}.",
    "Para volver al bruto, el neto se divide por lo que queda después del aporte (0,91).",
    "Se redondea al guaraní.",
  ],
  ejemplo: ["Para cobrar Gs. 3.640.000 en mano, el bruto tiene que ser Gs. 4.000.000. El IPS descuenta Gs. 360.000."],
  faq: [
    {
      pregunta: "¿Cómo paso de neto a bruto?",
      respuesta: "Dividí el neto por 0,91, porque el IPS se lleva el {{py.ips-trabajador}} del bruto.",
    },
    {
      pregunta: "¿El IRP se descuenta del sueldo cada mes?",
      respuesta: "No. El IRP se declara una vez al año, en marzo, y solo si tus ingresos pasan el monto no alcanzado.",
    },
    {
      pregunta: "¿Cuánto le cuesta el bruto a mi empleador?",
      respuesta: "El bruto más su propio aporte al IPS. Para verlo, usá la calculadora de costo del empleador.",
    },
  ],
  glosario: [
    { termino: "Salario bruto", definicion: "El salario antes de cualquier descuento." },
    { termino: "Salario neto", definicion: "Lo que cobrás en mano después del aporte al IPS." },
  ],
});
