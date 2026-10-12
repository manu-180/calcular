import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.trabajo-nocturno",
  h1: "Calculadora de trabajo nocturno",
  title: "Trabajo nocturno en Uruguay: cuánto se paga de más",
  description:
    "Calculá la sobretasa por trabajo nocturno: al menos {{uy.nocturno-sobretasa}} sobre las horas entre las 22 y las 6, si trabajás más de {{uy.nocturno-horas-minimas}} seguidas.",
  intro: [
    "Si trabajás de noche, la ley te da un recargo sobre esas horas. Es de al menos {{uy.nocturno-sobretasa}} y rige desde 2015 (Ley 19.313).",
    "Poné tu sueldo o tu valor hora y cuántas horas nocturnas hacés. Te decimos cuánto se suma por mes.",
  ],
  comoSeCalcula: [
    "Se considera trabajo nocturno el que se hace entre las 22 y las 6 del día siguiente.",
    "La sobretasa corresponde si trabajás más de {{uy.nocturno-horas-minimas}} seguidas en ese horario.",
    "Cada hora nocturna se paga con un recargo de al menos {{uy.nocturno-sobretasa}} sobre tu valor hora. Tu convenio puede fijar más, o darte menos horas en lugar del recargo.",
  ],
  ejemplo: ["Si tu hora vale $ 250 y hacés 8 horas por noche durante 20 noches, se te suman $ 8.000 en el mes."],
  faq: [
    {
      pregunta: "¿Cuánto se paga el trabajo nocturno en Uruguay?",
      respuesta: "Al menos un {{uy.nocturno-sobretasa}} más sobre las horas trabajadas entre las 22 y las 6, si son más de {{uy.nocturno-horas-minimas}} seguidas.",
    },
    {
      pregunta: "¿Qué horario es nocturno?",
      respuesta: "De las 22 a las 6 de la mañana siguiente.",
    },
    {
      pregunta: "¿Si estoy embarazada puedo pedir horario de día?",
      respuesta: "Sí. Durante el embarazo y hasta un año después del parto podés pedir horario diurno, sin perder la compensación nocturna.",
    },
  ],
  glosario: [
    { termino: "Sobretasa", definicion: "Un porcentaje extra que se suma al valor de la hora." },
    { termino: "Laudo", definicion: "El mínimo y las condiciones que fija el Consejo de Salarios para cada sector." },
  ],
});
