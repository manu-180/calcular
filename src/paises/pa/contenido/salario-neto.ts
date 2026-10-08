import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.salario-neto",
  h1: "Calculadora de salario neto en Panamá",
  title: "Salario neto en Panamá 2026: cuánto recibes en mano",
  description:
    "Pasa tu salario bruto a neto: {{pa.css-trabajador}} de Seguro Social, {{pa.seguro-educativo-trabajador}} de seguro educativo e impuesto sobre la renta estimado.",
  intro: [
    "De tu salario bruto se descuentan el Seguro Social, el seguro educativo y, si ganas lo suficiente, el impuesto sobre la renta.",
    "Escribe tu salario mensual y te mostramos el neto del mes y de la quincena.",
  ],
  comoSeCalcula: [
    "Seguro Social (CSS): {{pa.css-trabajador}} del salario bruto.",
    "Seguro educativo: {{pa.seguro-educativo-trabajador}} del salario bruto.",
    "Impuesto sobre la renta: tomamos tu salario por 13 (doce meses y el décimo) y aplicamos la tarifa anual. El impuesto se reparte en esos 13 pagos.",
    "La tarifa anual: hasta B/. 11,000 no se paga. De B/. 11,000 a B/. 50,000, el 15% sobre el excedente. Desde B/. 50,000, B/. 5,850 más el 25% sobre el excedente.",
  ],
  ejemplo: [
    "Con un salario de B/. 1,500 al mes: Seguro Social B/. 146.25, seguro educativo B/. 18.75 e impuesto sobre la renta B/. 98.08. Neto B/. 1,236.92.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuánto se paga impuesto sobre la renta?",
      respuesta: "Desde una renta gravable de B/. 11,000 al año. Con 13 pagos al año, es un salario de unos B/. 846 al mes.",
    },
    {
      pregunta: "¿El seguro educativo se descuenta del décimo?",
      respuesta: "No. Al décimo solo se le descuenta la contribución especial de Seguro Social y, si corresponde, el impuesto sobre la renta.",
    },
    {
      pregunta: "¿Por qué mi talonario muestra otro impuesto?",
      respuesta: "Porque tu empleador puede aplicar deducciones que declaraste. Esta calculadora estima la retención sin deducciones.",
    },
  ],
  glosario: [
    { termino: "CSS", definicion: "Caja de Seguro Social. Cubre salud, maternidad, pensiones y riesgos." },
    { termino: "Salario bruto", definicion: "Tu salario antes de los descuentos." },
  ],
});
