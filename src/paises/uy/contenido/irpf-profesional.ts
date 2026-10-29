import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.irpf-profesional",
  h1: "Calculadora de IRPF para profesionales y servicios personales",
  title: "IRPF servicios personales {{anio}}: cuánto pagás",
  description:
    "Calculá el IRPF de tus servicios personales fuera de la relación de dependencia: se resta un {{uy.irpf-ficto-independientes}} de gastos y se aplica la escala anual en BPC.",
  intro: [
    "Si facturás como profesional o trabajador independiente y no optaste por IRAE, pagás IRPF sobre lo que facturás. La ley te deja restar un {{uy.irpf-ficto-independientes}} en concepto de gastos, sin presentar comprobantes.",
    "Poné lo que facturás en el año y tus aportes. Te decimos el IRPF del año y cuánto es por mes.",
  ],
  comoSeCalcula: [
    "A lo que facturás sin IVA se le resta un {{uy.irpf-ficto-independientes}} de gastos fictos. Lo que queda es la renta.",
    "A la renta se le aplica la escala anual del IRPF, medida en BPC (este año {{uy.bpc}}).",
    "Tus aportes y la deducción por hijos ({{uy.irpf-deduccion-hijo}} por hijo) se multiplican por {{uy.irpf-deducciones-tasa-baja}} si facturás hasta {{uy.irpf-deducciones-umbral-anual}}, o por {{uy.irpf-deducciones-tasa-alta}} si facturás más. Eso se resta.",
  ],
  ejemplo: ["Si facturás $ 1.200.000 en el año y aportás $ 120.000, la renta es $ 840.000 y el IRPF del año, $ 10.358,40."],
  faq: [
    {
      pregunta: "¿Cuánto IRPF paga un profesional en Uruguay?",
      respuesta: "Depende de lo que facture. Primero se resta un {{uy.irpf-ficto-independientes}} de gastos y al resto se le aplica la escala anual. Con facturaciones bajas puede no pagar nada.",
    },
    {
      pregunta: "¿Puedo restar mis gastos reales?",
      respuesta: "No en el IRPF: se resta siempre el {{uy.irpf-ficto-independientes}} ficto. Si tus gastos reales son mucho más altos, podés evaluar con un contador pasar a IRAE.",
    },
    {
      pregunta: "¿Cómo se paga?",
      respuesta: "El impuesto es anual y se liquida con una declaración jurada ante la DGI.",
    },
    {
      pregunta: "¿Y el IVA?",
      respuesta: "Es aparte: lo cobrás en tus facturas y lo volcás a la DGI. No entra en este cálculo.",
    },
  ],
  glosario: [
    { termino: "Servicios personales", definicion: "Trabajo independiente, sin patrón: profesionales, consultores, técnicos." },
    { termino: "Gastos fictos", definicion: "Un porcentaje que la ley te deja restar sin probar los gastos." },
  ],
});
