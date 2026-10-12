import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.retiro-de-cts",
  h1: "¿Cuánto de mi CTS puedo retirar?",
  title: "Retiro de CTS 2026: cuánto puedes sacar hoy",
  description:
    "Hoy puedes retirar el {{pe.cts-libre-disposicion}} de tu CTS. Calcula cuánto puedes sacar según tu saldo y tu situación, con la Ley 32322.",
  intro: [
    "La CTS es un ahorro para cuando te quedes sin trabajo, por eso normalmente solo se puede retirar una parte. La Ley 32322 permite retirar el 100 % hasta el 31 de diciembre de 2026.",
    "Pon el saldo de tu cuenta CTS y tu situación. Te decimos cuánto puedes retirar hoy y cuánto queda.",
  ],
  comoSeCalcula: [
    "Si sigues trabajando, hoy puedes retirar el {{pe.cts-libre-disposicion}} de tu saldo (depósitos más intereses).",
    "Desde el 1 de enero de 2027 vuelve la regla del artículo 42 de la ley de CTS: retiros de hasta el 50 %.",
    "Si te diagnosticaron cáncer o una enfermedad terminal, o si ya dejaste de trabajar, puedes retirar el 100 %.",
  ],
  ejemplo: ["Tienes S/ 8,000 en tu cuenta CTS y sigues trabajando. En octubre de 2026 puedes sacar los S/ 8,000. Si esperas a 2027, solo podrás sacar S/ 4,000."],
  faq: [
    {
      pregunta: "¿Hasta cuándo puedo retirar el 100 % de mi CTS?",
      respuesta: "Hasta el 31 de diciembre de 2026, una sola vez. Lo autoriza la Ley 32322.",
    },
    {
      pregunta: "¿Dónde pido el retiro de mi CTS?",
      respuesta: "En el banco, caja o financiera donde tu empleador te deposita la CTS. Pregúntales qué documentos te piden.",
    },
    {
      pregunta: "¿Qué pasa con la CTS en 2027?",
      respuesta: "Vuelve el tope: solo podrás retirar hasta el 50 % de tus depósitos e intereses, salvo que dejes de trabajar o tengas cáncer o una enfermedad terminal.",
    },
    {
      pregunta: "¿Mi CTS se puede embargar?",
      respuesta: "Solo por deudas de alimentos y hasta el 50 %. Para cualquier otra deuda es intangible e inembargable.",
    },
  ],
  glosario: [
    { termino: "CTS", definicion: "Compensación por tiempo de servicios: depósito que hace tu empleador en mayo y noviembre como ahorro para cuando dejes de trabajar." },
    { termino: "Libre disposición", definicion: "La parte de tu CTS que puedes retirar sin dejar de trabajar." },
  ],
});
