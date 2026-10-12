import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.actualizacion-ufv",
  h1: "Calculadora de actualización por UFV",
  title: "Actualizar un monto con UFV: mantenimiento de valor",
  description: "Actualice una deuda, un contrato o un monto en bolivianos con la UFV del Banco Central: cuánto vale hoy y cuánto es el mantenimiento de valor.",
  intro: [
    "La UFV (Unidad de Fomento de Vivienda) sube cada día con la inflación. Sirve para que una deuda o un contrato no pierdan valor con el tiempo.",
    "Escriba el monto y la UFV del día en que nació la deuda. Lo actualizamos con la UFV de hoy.",
  ],
  comoSeCalcula: [
    "El monto se pasa a UFV dividiéndolo por la UFV de la fecha inicial.",
    "Esas UFV se vuelven a bolivianos con la UFV de hoy, que publica el Banco Central de Bolivia.",
    "La diferencia es el mantenimiento de valor.",
  ],
  faq: [
    {
      pregunta: "¿Para qué sirve actualizar con UFV?",
      respuesta: "Para deudas tributarias, beneficios sociales pagados tarde, contratos y créditos pactados en UFV. Así el monto conserva su valor frente a la inflación.",
    },
    {
      pregunta: "¿Dónde encuentro la UFV de una fecha?",
      respuesta: "El Banco Central de Bolivia publica la UFV de cada día en su tabla de cotizaciones. La de hoy la tomamos de ahí y se actualiza sola.",
    },
    {
      pregunta: "¿Es lo mismo que actualizar por inflación?",
      respuesta: "Es parecido. La UFV se calcula con el índice de precios del INE, pero va día a día. Para comparar meses completos puede usar nuestra calculadora de inflación.",
    },
  ],
  glosario: [
    { termino: "UFV", definicion: "Unidad de Fomento de Vivienda: índice diario del Banco Central que sigue a la inflación." },
    { termino: "Mantenimiento de valor", definicion: "Lo que se suma a una deuda para que no pierda valor con la inflación." },
  ],
});
