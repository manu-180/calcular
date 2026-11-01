import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.retencion-honorarios",
  h1: "Calculadora de retención en la fuente por honorarios",
  title: "Retención en la fuente por honorarios {{anio}}",
  description:
    "Calcula la retención sobre tus honorarios: tabla del artículo 383 si eres persona natural, o tarifa del {{co.retencion-honorarios[natural]}} o {{co.retencion-honorarios[juridica]}}.",
  intro: [
    "Cuando cobras honorarios, quien te paga te descuenta una retención en la fuente, que es un anticipo de tu impuesto de renta.",
    "Si eres persona natural y no tienes dos o más trabajadores contratados, la retención se calcula con la misma tabla de los salarios. En los demás casos se aplica una tarifa fija.",
  ],
  comoSeCalcula: [
    "Persona natural sin trabajadores: a los honorarios del mes se les restan los aportes a salud y pensión, y la renta exenta del {{co.renta-exenta-trabajo}}. Lo que queda se pasa a UVT ({{co.uvt}}) y se aplica la tabla del artículo 383.",
    "Persona natural con dos o más trabajadores: {{co.retencion-honorarios[natural]}} de los honorarios, o {{co.retencion-honorarios[natural-mayor]}} si los contratos del año pasan de {{co.honorarios-umbral}}.",
    "Empresa o persona jurídica: {{co.retencion-honorarios[juridica]}}.",
  ],
  ejemplo: [
    "Con honorarios de $10.000.000 al mes como persona natural, los aportes son $1.140.000 y la renta exenta $2.215.000. La base queda en $6.645.000 y la retención es de $317.199.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es la tarifa de retención por honorarios?",
      respuesta: "Para personas naturales sin trabajadores se usa la tabla del artículo 383, como un salario. Si tienes dos o más trabajadores, es del {{co.retencion-honorarios[natural]}} o del {{co.retencion-honorarios[natural-mayor]}}. Para empresas, {{co.retencion-honorarios[juridica]}}.",
    },
    {
      pregunta: "¿Puedo restar los aportes a seguridad social?",
      respuesta: "Sí. En la tabla del artículo 383 se restan los aportes obligatorios a salud y pensión antes de calcular la retención.",
    },
    {
      pregunta: "¿Desde cuánto me retienen?",
      respuesta: "Con la tabla del artículo 383, solo si la base pasa de 95 UVT al mes. Con la tarifa fija, sobre cualquier valor.",
    },
    {
      pregunta: "¿La retención es un impuesto adicional?",
      respuesta: "No. Es un anticipo del impuesto de renta. En tu declaración restas lo que te retuvieron durante el año.",
    },
  ],
  glosario: [
    { termino: "Honorarios", definicion: "Pagos por un trabajo independiente en el que predomina el conocimiento, como una asesoría o un diseño." },
    { termino: "Retención en la fuente", definicion: "Un anticipo del impuesto de renta que quien paga descuenta y le entrega a la DIAN." },
  ],
});
