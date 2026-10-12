import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.feriados-pagos",
  h1: "Calculadora de feriados pagos",
  title: "Feriados pagos en Uruguay: cuánto cobrás si trabajás",
  description:
    "Calculá cuánto cobrás por trabajar un feriado pago (1 de enero, 1 de mayo, 18 de julio, 25 de agosto y 25 de diciembre), seas mensual o jornalero.",
  intro: [
    "En Uruguay hay cinco feriados pagos: 1 de enero, 1 de mayo, 18 de julio, 25 de agosto y 25 de diciembre. Ese día cobrás aunque no trabajes, y si trabajás, cobrás doble.",
    "Elegí si sos mensual o jornalero y cuántos feriados trabajaste. Te decimos cuánto te corresponde.",
  ],
  comoSeCalcula: [
    "Mensuales: el feriado ya está pago en el sueldo. Si lo trabajás, se suma un día más: el sueldo dividido entre {{uy.feriado-divisor-mensual}}.",
    "Jornaleros: si no trabajás el feriado, cobrás el jornal igual. Si lo trabajás, cobrás {{uy.feriado-pago-factor}} jornales.",
  ],
  ejemplo: ["Si ganás $ 45.000 por mes y trabajás el 1 de mayo y el 18 de julio, se te suman $ 3.000 (dos días de $ 1.500)."],
  faq: [
    {
      pregunta: "¿Cuáles son los feriados pagos en Uruguay?",
      respuesta: "El 1 de enero, el 1 de mayo, el 18 de julio, el 25 de agosto y el 25 de diciembre. Los demás feriados no tienen esta regla de doble paga en la ley.",
    },
    {
      pregunta: "¿Cuánto cobro si trabajo un feriado pago?",
      respuesta: "Doble paga. Si sos mensual, el mes completo más un día. Si sos jornalero, dos jornales.",
    },
    {
      pregunta: "¿Mi convenio puede pagar más?",
      respuesta: "Sí. Algunos laudos de los Consejos de Salarios mejoran el pago o suman otros feriados. Si tu convenio da más, vale el convenio.",
    },
  ],
  glosario: [
    { termino: "Feriado pago", definicion: "Un feriado que se cobra aunque no se trabaje." },
    { termino: "Jornal", definicion: "Lo que se cobra por un día de trabajo." },
  ],
});
