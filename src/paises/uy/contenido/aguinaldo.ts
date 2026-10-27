import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.aguinaldo",
  h1: "Calculadora de aguinaldo en Uruguay",
  title: "Aguinaldo Uruguay {{anio}}: calculá junio, diciembre o egreso",
  description: "Calculá tu aguinaldo de junio o diciembre, o el proporcional si te vas: la doceava parte de lo cobrado en el semestre, con horas extra y comisiones. Gratis.",
  intro: [
    "El aguinaldo en Uruguay es la doceava parte de todo lo que cobraste en dinero. Se paga en dos cuotas: en junio (lo generado de diciembre a mayo) y en diciembre (lo de junio a noviembre).",
    "Elegí la cuota, poné tu sueldo y los meses trabajados. Si tuviste horas extra o comisiones, sumalas aparte.",
  ],
  comoSeCalcula: [
    "La cuota de junio cubre lo generado de diciembre a mayo. La de diciembre, lo de junio a noviembre.",
    "Se suma todo lo cobrado en dinero en esos meses: sueldo, horas extra, comisiones y primas.",
    "Ese total se divide entre 12. Para un mensual con sueldo fijo y el semestre completo, es medio sueldo.",
    "Si dejás el trabajo, cobrás lo generado desde el último aguinaldo, salvo despido por notoria mala conducta.",
  ],
  ejemplo: ["Si cobrás $ 50.000 por mes y trabajaste de junio a noviembre, tu aguinaldo de diciembre es 50.000 × 6 / 12 = $ 25.000 nominales."],
  faq: [
    {
      pregunta: "¿Cómo se calcula el aguinaldo en Uruguay?",
      respuesta: "Se suma todo lo que cobraste en dinero en el semestre y se divide entre 12. Con sueldo fijo y el semestre completo, es medio sueldo nominal.",
    },
    {
      pregunta: "¿Cuándo se paga el aguinaldo?",
      respuesta: "La cuota de junio se paga en ese mes y la de diciembre, antes del 24 de diciembre. Cada año un decreto fija las fechas.",
    },
    {
      pregunta: "¿Al aguinaldo le descuentan aportes e IRPF?",
      respuesta: "Sí. Lo que muestra la calculadora es el monto nominal. El IRPF del aguinaldo se calcula aparte, con la tasa de tu franja más alta.",
    },
    {
      pregunta: "¿Si renuncio cobro aguinaldo?",
      respuesta: "Sí. Al terminar la relación cobrás el aguinaldo proporcional, sea por renuncia, despido o jubilación. Solo se pierde por notoria mala conducta.",
    },
    {
      pregunta: "¿Los tickets de alimentación cuentan para el aguinaldo?",
      respuesta: "No. El aguinaldo se calcula sobre lo que cobrás en dinero. Los tickets no entran.",
    },
  ],
  glosario: [
    { termino: "Sueldo anual complementario", definicion: "Nombre legal del aguinaldo. Lo crea la Ley 12.840." },
    { termino: "Nominal", definicion: "Monto antes de aportes e impuestos." },
  ],
});
