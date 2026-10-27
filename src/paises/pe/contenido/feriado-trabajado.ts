import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.feriado-trabajado",
  h1: "Calculadora de pago por feriado trabajado",
  title: "Feriado trabajado {{anio}}: cuánto te deben pagar",
  description:
    "Si trabajas un feriado o tu día de descanso sin otro día libre, cobras la jornada más {{pe.sobretasa-descanso-trabajado}} de sobretasa. Calcula el pago triple.",
  intro: [
    "Si trabajas un feriado o tu día de descanso semanal y no te dan otro día libre a cambio, te tienen que pagar ese día con una sobretasa de {{pe.sobretasa-descanso-trabajado}}.",
    "Como el feriado ya está pagado dentro de tu sueldo, en total cobras ese día tres veces. Por eso se le dice pago triple.",
  ],
  comoSeCalcula: [
    "Tu sueldo mensual (con la asignación familiar si la cobras) se divide entre 30: ese es el valor de un día.",
    "Por cada feriado o descanso trabajado se paga el día trabajado más una sobretasa de {{pe.sobretasa-descanso-trabajado}}, o sea dos días adicionales.",
    "Ese pago se suma a tu sueldo normal del mes.",
  ],
  ejemplo: ["Ganas S/ 3,000 y trabajaste el 8 de diciembre. Tu día vale S/ 100, así que te deben S/ 200 adicionales a tu sueldo de diciembre."],
  faq: [
    {
      pregunta: "¿Cuánto me pagan si trabajo un feriado?",
      respuesta: "El día trabajado más {{pe.sobretasa-descanso-trabajado}} de sobretasa, además de tu sueldo que ya incluye el feriado. En total, tres veces el valor del día.",
    },
    {
      pregunta: "¿Y si me dan otro día libre a cambio?",
      respuesta: "Entonces no hay pago adicional: el descanso se cambió de día y lo cobras como cualquier otro.",
    },
    {
      pregunta: "¿Trabajar en mi día de descanso semanal se paga igual?",
      respuesta: "Sí. Si trabajas tu día de descanso y no te lo cambian por otro en la misma semana, se paga con la misma sobretasa de {{pe.sobretasa-descanso-trabajado}}.",
    },
    {
      pregunta: "¿El 1 de mayo se paga aunque falte al trabajo?",
      respuesta: "Sí. El Día del Trabajo se paga sin ninguna condición, aunque no hayas trabajado los días anteriores.",
    },
  ],
  glosario: [
    { termino: "Descanso sustitutorio", definicion: "Otro día libre que te dan a cambio del feriado o descanso que trabajaste." },
    { termino: "Pago triple", definicion: "Forma de decir que el feriado trabajado se cobra tres veces: el día ya pagado, el trabajado y la sobretasa." },
  ],
});
