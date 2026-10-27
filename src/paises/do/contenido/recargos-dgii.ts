import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.recargos-dgii",
  h1: "Calculadora de recargos e intereses de la DGII",
  title: "Recargos DGII {{anio}}: calcula mora e interés por atraso",
  description: "Calcula el recargo por mora de {{do.recargo-mora}} y el interés indemnizatorio de {{do.interes-indemnizatorio}} por cada mes o fracción de atraso en un impuesto.",
  intro: [
    "Si pagas un impuesto después de la fecha límite, la DGII suma un recargo por mora y un interés indemnizatorio por cada mes o fracción de atraso.",
    "Desde el 1 de julio de 2026 el recargo es de {{do.recargo-mora}} por mes, con la Ley 30-26. Pon el monto y las fechas, y ves cuánto pagas.",
  ],
  comoSeCalcula: [
    "Se cuentan los meses de atraso. Cualquier fracción de mes cuenta como un mes entero.",
    "Recargo por mora: {{do.recargo-mora}} del impuesto por cada mes, sin pasar del {{do.recargo-mora-tope}} del impuesto.",
    "Interés indemnizatorio: {{do.interes-indemnizatorio}} del impuesto por cada mes.",
    "El total es el impuesto más el recargo más el interés.",
  ],
  ejemplo: [
    "Un ITBIS de RD$50,000 que vencía el 20 de julio y pagas el 25 de septiembre tiene 3 meses de atraso: RD$4,500 de recargo y RD$1,650 de interés. Total, RD$56,150.",
  ],
  faq: [
    { pregunta: "¿Cuánto es el recargo por mora de la DGII en 2026?", respuesta: "{{do.recargo-mora}} por cada mes o fracción de mes desde el 1 de julio de 2026. Antes era 10 % el primer mes y 4 % los siguientes." },
    { pregunta: "¿El recargo tiene tope?", respuesta: "Sí. Sumado, no puede pasar del {{do.recargo-mora-tope}} del impuesto adeudado. El interés no tiene ese tope." },
    { pregunta: "¿Me pueden rebajar los recargos?", respuesta: "Sí. Si rectificas por tu cuenta, sin requerimiento de la DGII, y pagas de inmediato, el recargo baja 90 %. Hay otros descuentos menores si ya empezó una auditoría." },
    { pregunta: "¿El interés cambia cada año?", respuesta: "Sí. La DGII lo fija cada enero con la tasa activa promedio de los bancos más 30 puntos básicos." },
  ],
  glosario: [
    { termino: "Recargo por mora", definicion: "Sanción por pagar un impuesto después de la fecha límite." },
    { termino: "Interés indemnizatorio", definicion: "Interés por el tiempo en que el Estado no tuvo ese dinero. No es una sanción." },
  ],
});
