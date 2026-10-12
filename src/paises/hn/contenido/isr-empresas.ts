import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.isr-empresas",
  h1: "Calculadora del ISR para empresas en Honduras",
  title: "ISR de empresas en Honduras: tarifa y aportación solidaria",
  description: "Calcule el ISR de su empresa ({{hn.isr-personas-juridicas}} de la renta neta gravable) y la aportación solidaria del {{hn.aportacion-solidaria-tasa}} sobre lo que pasa de {{hn.aportacion-solidaria-exento}}.",
  intro: [
    "Las personas jurídicas pagan el {{hn.isr-personas-juridicas}} de su renta neta gravable. Si la renta pasa de {{hn.aportacion-solidaria-exento}}, también pagan la aportación solidaria.",
    "Escriba la renta neta gravable del año y le mostramos el ISR, la aportación y la tasa efectiva.",
  ],
  comoSeCalcula: [
    "ISR = renta neta gravable × {{hn.isr-personas-juridicas}}.",
    "Aportación solidaria = (renta neta gravable − {{hn.aportacion-solidaria-exento}}) × {{hn.aportacion-solidaria-tasa}}, si el resultado es positivo.",
    "Total = ISR + aportación solidaria.",
  ],
  ejemplo: ["Una empresa con L3,000,000 de renta neta gravable paga L750,000 de ISR y L100,000 de aportación solidaria: L850,000."],
  faq: [
    {
      pregunta: "¿Cuál es la tasa del ISR para empresas en Honduras?",
      respuesta: "El {{hn.isr-personas-juridicas}} sobre la renta neta gravable, según el artículo 22 de la Ley del Impuesto Sobre la Renta.",
    },
    {
      pregunta: "¿Qué es la aportación solidaria?",
      respuesta: "Un pago adicional del {{hn.aportacion-solidaria-tasa}} sobre la parte de la renta neta gravable que pasa de {{hn.aportacion-solidaria-exento}}. Se declara junto con el ISR en el formulario 103.",
    },
    {
      pregunta: "¿Cuándo se declara?",
      respuesta: "La declaración jurada del ISR del año se presenta y se paga hasta el 30 de abril del año siguiente, en la Oficina Virtual del SAR.",
    },
    {
      pregunta: "¿Qué pasa con las empresas muy grandes?",
      respuesta: "Si sus ingresos brutos del año anterior pasaron de L1,000 millones, el ISR no puede ser menor que un porcentaje de esos ingresos (artículo 22-A).",
    },
  ],
  glosario: [
    { termino: "Renta neta gravable", definicion: "Los ingresos gravados menos los costos y gastos que la ley permite deducir." },
    { termino: "Persona jurídica", definicion: "Una sociedad o empresa con personalidad propia, distinta de sus dueños." },
  ],
});
