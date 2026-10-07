import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.cts",
  h1: "Calculadora de CTS",
  title: "CTS noviembre 2026: calcula tu depósito",
  description: "Calcula tu CTS de mayo o noviembre con la RMV de {{pe.rmv}}, la asignación familiar y el sexto de tu gratificación. Fórmula oficial del MTPE.",
  intro: [
    "La CTS (compensación por tiempo de servicios) es un depósito que tu empleador hace dos veces al año en una cuenta a tu nombre. Sirve como ahorro para cuando dejes el trabajo.",
    "El depósito de noviembre se hace hasta el 15 de noviembre y cubre de mayo a octubre. El de mayo, hasta el 15 de mayo, cubre de noviembre a abril.",
    "Si trabajaste el semestre completo, te depositan más o menos medio sueldo, más un sexto de la gratificación que cobraste.",
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
