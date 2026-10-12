import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.euro-bcv",
  h1: "Euro BCV hoy: convierte euros y bolívares",
  title: "Euro BCV hoy: {{ve.tasa-bcv-eur}}",
  description:
    "Euro oficial del BCV hoy: {{ve.tasa-bcv-eur}}. Convierte euros a bolívares, bolívares a euros y euros a dólares con las tasas oficiales del día.",
  intro: [
    "El Banco Central de Venezuela publica cada día hábil la tasa oficial del euro, igual que la del dólar. Hoy un euro vale {{ve.tasa-bcv-eur}}.",
    "Sirve para precios, viajes, remesas o compras en euros. La tasa se actualiza sola desde la web del BCV.",
  ],
  comoSeCalcula: [
    "Euros a bolívares: monto por la tasa del euro.",
    "Bolívares a euros: monto entre la tasa del euro.",
    "Euros a dólares: la tasa del euro entre la del dólar ({{ve.tasa-bcv-usd}}) da cuántos dólares vale un euro.",
  ],
  ejemplo: ["Con la tasa del 8 de octubre de 2026 (Bs. 979,0789 por euro), €100 son Bs. 97.907,89."],
  faq: [
    {
      pregunta: "¿Cuánto está el euro BCV hoy?",
      respuesta: "{{ve.tasa-bcv-eur}} por euro, según la última publicación del Banco Central de Venezuela.",
    },
    {
      pregunta: "¿Cada cuánto cambia la tasa del euro?",
      respuesta: "Cada día hábil. El BCV publica la tasa con la fecha valor del día hábil siguiente.",
    },
    {
      pregunta: "¿Usan el euro paralelo?",
      respuesta: "No. Solo usamos la tasa oficial del BCV, que es la que tiene valor legal.",
    },
  ],
  glosario: [
    { termino: "Fecha valor", definicion: "El día en que rige la tasa publicada por el BCV." },
    { termino: "Tasa cruzada", definicion: "El valor del euro en dólares que sale de dividir las dos tasas oficiales en bolívares." },
  ],
});
