import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.ire",
  h1: "Calculadora del IRE (impuesto a la renta empresarial)",
  title: "IRE Paraguay: calculá el impuesto de tu empresa",
  description: "Calculá el IRE ({{py.ire-tasa}} sobre la renta neta) en el régimen general o en el SIMPLE, que usa la menor entre la renta real y la presunta del {{py.ire-simple-presunta}}.",
  intro: [
    "El IRE es el impuesto a la renta de las empresas, incluidas las unipersonales. La tasa es del {{py.ire-tasa}} sobre la renta neta del año.",
    "En el IRE SIMPLE, para quienes facturaron hasta {{py.ire-simple-tope}} el año anterior, la renta neta es la menor entre la real y el {{py.ire-simple-presunta}} de la facturación.",
  ],
  comoSeCalcula: [
    "La renta real es lo que facturaste menos los costos y gastos de la actividad, con comprobantes.",
    "En el SIMPLE también se calcula la renta presunta: el {{py.ire-simple-presunta}} de la facturación bruta. Se toma la menor de las dos.",
    "Al resultado se le aplica el {{py.ire-tasa}}.",
  ],
  ejemplo: ["Si en el SIMPLE facturaste Gs. 1.000.000.000 con Gs. 600.000.000 de gastos, la renta real es Gs. 400.000.000 y la presunta Gs. 300.000.000. Pagás el {{py.ire-tasa}} de la menor: Gs. 30.000.000."],
  faq: [
    {
      pregunta: "¿Qué tasa tiene el IRE?",
      respuesta: "El {{py.ire-tasa}} sobre la renta neta, tanto en el régimen general como en el SIMPLE.",
    },
    {
      pregunta: "¿Quiénes pueden usar el IRE SIMPLE?",
      respuesta: "Empresas unipersonales y otras del artículo 26 que facturaron hasta {{py.ire-simple-tope}} el año anterior.",
    },
    {
      pregunta: "¿Qué gastos puedo restar?",
      respuesta: "Los relacionados con tu actividad y respaldados con comprobantes legales: mercaderías, insumos, equipos, sueldos con IPS, alquiler del local, entre otros.",
    },
    {
      pregunta: "¿Y si facturo poco?",
      respuesta: "Las empresas unipersonales chicas pueden estar en el RESIMPLE, que tiene un monto fijo por mes. Usá la calculadora del RESIMPLE.",
    },
  ],
  glosario: [
    { termino: "Renta neta", definicion: "Lo que queda de los ingresos después de restar costos y gastos deducibles." },
    { termino: "Renta presunta", definicion: "Un porcentaje fijo de la facturación que la ley toma como ganancia, sin mirar gastos." },
  ],
});
