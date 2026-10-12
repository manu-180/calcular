import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.sueldo-en-bolivares",
  h1: "Sueldo en dólares a bolívares con la tasa BCV",
  title: "Tu sueldo en dólares a bolívares hoy (tasa BCV)",
  description:
    "Pasa tu sueldo en dólares a bolívares con la tasa oficial del BCV de hoy: mensual, quincena y diario. La tasa se actualiza sola cada día hábil.",
  intro: [
    "Muchos sueldos en Venezuela se fijan en dólares y se pagan en bolívares a la tasa oficial del Banco Central de Venezuela. Escribe tu sueldo en dólares y te mostramos cuánto es hoy en bolívares.",
    "Te damos el monto del mes, de la quincena y del día. La tasa sale de la web del BCV y se actualiza sola.",
  ],
  comoSeCalcula: [
    "Sueldo mensual en bolívares: tu sueldo en dólares por la tasa oficial del BCV vigente.",
    "Quincena: la mitad del mensual.",
    "Diario: el mensual entre {{ve.dias-mes-salario}}.",
  ],
  ejemplo: ["Con un sueldo de $240 y la tasa del 8 de octubre de 2026 (Bs. 874,7321), cobras Bs. 209.935,70 al mes."],
  faq: [
    {
      pregunta: "¿Qué tasa se usa para pagar un sueldo en dólares?",
      respuesta: "La oficial del BCV, salvo que tu contrato diga otra cosa. Usamos la tasa vigente hoy; si te pagan otro día, el monto cambia.",
    },
    {
      pregunta: "¿Por qué cambia mi sueldo en bolívares cada día?",
      respuesta: "Porque la tasa del BCV se publica cada día hábil y el bolívar se devalúa. Tu sueldo en dólares es el mismo, pero en bolívares sube.",
    },
    {
      pregunta: "¿Usan el dólar paralelo?",
      respuesta: "No. Solo usamos la tasa oficial del BCV, que es la que tiene valor legal.",
    },
  ],
  glosario: [
    { termino: "Tasa BCV", definicion: "Tipo de cambio oficial que publica el Banco Central de Venezuela cada día hábil." },
    { termino: "Quincena", definicion: "La mitad del sueldo mensual, que se paga cada 15 días." },
  ],
});
