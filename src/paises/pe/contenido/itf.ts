import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.itf",
  h1: "Calculadora del ITF (impuesto a las transacciones financieras)",
  title: "ITF 2026: calcula el impuesto de {{pe.tasa-itf}} de tu operación",
  description:
    "Calcula el ITF de un depósito, retiro o transferencia: {{pe.tasa-itf}} del monto, con el redondeo especial que manda la ley. Gratis y con la norma vigente.",
  intro: [
    "El ITF es un impuesto pequeño que cobran los bancos cada vez que entra o sale plata de tu cuenta: {{pe.tasa-itf}} del monto de la operación.",
    "Pon el monto y te decimos cuánto te van a cobrar, con el redondeo que usa la ley.",
  ],
  comoSeCalcula: [
    "Se multiplica el monto de la operación por {{pe.tasa-itf}}.",
    "El resultado se deja con dos decimales, sin redondear el tercero.",
    "El segundo decimal se ajusta: si es menor que 5 pasa a 0, y si es 5 o más pasa a 5. Por eso el ITF siempre termina en 0 o en 5 céntimos.",
  ],
  ejemplo: ["Transfieres S/ 15,800. El ITF exacto es S/ 0.79, pero con el redondeo de la ley te cobran S/ 0.75."],
  faq: [
    {
      pregunta: "¿Cuánto es el ITF en Perú?",
      respuesta: "{{pe.tasa-itf}} del monto de cada operación. Por cada S/ 1,000 son 5 céntimos.",
    },
    {
      pregunta: "¿Mi cuenta sueldo paga ITF?",
      respuesta: "No. Los abonos y cargos en la cuenta que tu empleador abrió para pagarte el sueldo están exonerados. También las cuentas CTS.",
    },
    {
      pregunta: "¿Por qué me cobraron cero de ITF?",
      respuesta: "En operaciones de menos de S/ 1,000 el impuesto sale menos de 5 céntimos y, con el redondeo de la ley, queda en cero.",
    },
  ],
  glosario: [
    { termino: "ITF", definicion: "Impuesto a las transacciones financieras: grava los cargos y abonos en cuentas bancarias (Ley 28194)." },
    { termino: "Bancarización", definicion: "Obligación de pagar ciertos montos por medio de bancos. El ITF nació junto con esa ley." },
  ],
});
