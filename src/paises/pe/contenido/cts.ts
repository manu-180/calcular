import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.cts",
  h1: "Calculadora de CTS noviembre 2026",
  title: "Calculadora de CTS noviembre 2026: cuánto te depositan",
  description:
    "Calcula tu CTS de noviembre o de mayo: sueldo, asignación familiar y un sexto de tu gratificación, por los meses y días trabajados. Fórmula oficial del MTPE.",
  intro: [
    "Si trabajaste el semestre completo, tu CTS es más o menos medio sueldo más un sexto de la gratificación que cobraste. El depósito de noviembre se hace hasta el 15 de noviembre y cubre de mayo a octubre.",
    "La CTS (compensación por tiempo de servicios) es un depósito que tu empleador hace dos veces al año en una cuenta a tu nombre. El de mayo, hasta el 15 de mayo, cubre de noviembre a abril.",
  ],
  comoSeCalcula: [
    "Primero se arma la remuneración computable: tu sueldo de octubre (o de abril), la asignación familiar si la cobras, el promedio de pagos variables y un sexto de la gratificación del semestre.",
    "Por cada mes completo se deposita un dozavo de esa remuneración. Por cada día suelto, un treintavo de ese dozavo (la remuneración entre 360).",
    "En la pequeña empresa inscrita en el REMYPE la CTS es la mitad. En la microempresa no hay CTS.",
  ],
  ejemplo: [
    "Ganas S/ 2,000 al mes, no cobras asignación familiar y en julio recibiste S/ 2,000 de gratificación. Tu remuneración computable es S/ 2,333.33 (el sueldo más un sexto de la gratificación). Si trabajaste de mayo a octubre, en noviembre te depositan S/ 1,166.67.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo depositan la CTS de noviembre?",
      respuesta: "Hasta el 15 de noviembre. Cubre lo que trabajaste de mayo a octubre. La de mayo se deposita hasta el 15 de mayo.",
    },
    {
      pregunta: "¿Cuánto es la CTS si gano el sueldo mínimo?",
      respuesta: "Con la RMV que rige desde octubre de 2026 (S/ 1,230), una gratificación de S/ 1,230 y el semestre completo, te depositan S/ 717.50.",
    },
    {
      pregunta: "¿Puedo retirar toda mi CTS?",
      respuesta: "Sí, hasta el 31 de diciembre de 2026 puedes retirar el 100 %, una sola vez (Ley 32322). Desde 2027 vuelve el límite: puedes sacar hasta el 50 % de lo acumulado.",
    },
    {
      pregunta: "¿Qué gratificación se suma a la CTS de noviembre?",
      respuesta: "Un sexto de la gratificación de julio, sin la bonificación extraordinaria. Para la CTS de mayo se usa la de diciembre.",
    },
    {
      pregunta: "¿Qué pasa si mi empleador no deposita a tiempo?",
      respuesta: "Tiene que pagarte los intereses que perdiste y puede recibir una multa. Puedes denunciarlo ante Sunafil.",
    },
    {
      pregunta: "¿La asignación familiar entra en la CTS?",
      respuesta: "Sí. Es el {{pe.asignacion-familiar}} de la RMV y se suma a tu sueldo para calcular el depósito.",
    },
  ],
  glosario: [
    { termino: "CTS", definicion: "Compensación por tiempo de servicios: depósito semestral que protege a quien trabaja cuando deja su empleo." },
    { termino: "Remuneración computable", definicion: "Lo que se toma como base del cálculo: sueldo, asignación familiar, pagos regulares y un sexto de la gratificación." },
    { termino: "Dozavo", definicion: "Una doceava parte. En la CTS, cada mes trabajado vale un dozavo de la remuneración." },
  ],
});
