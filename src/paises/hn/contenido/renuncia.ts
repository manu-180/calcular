import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.renuncia",
  h1: "Cuánto me toca si renuncio en Honduras",
  title: "Renuncia en Honduras: calcule lo que le deben pagar",
  description: "Calcule lo que cobra al renunciar: décimos proporcionales, vacaciones pendientes y la cesantía del {{hn.cesantia-renuncia-porcentaje}} si tiene {{hn.cesantia-renuncia-anios}} o más.",
  intro: [
    "Renunciar no le quita lo que ya ganó. El patrono le debe el décimo tercer y cuarto mes proporcionales y las vacaciones que no tomó.",
    "Con {{hn.cesantia-renuncia-anios}} o más de trabajo continuo, también cobra el {{hn.cesantia-renuncia-porcentaje}} de la cesantía.",
  ],
  comoSeCalcula: [
    "Décimo tercer mes: salario × días trabajados desde el 1 de enero / 365.",
    "Décimo cuarto mes: salario × días trabajados desde el 1 de julio / 365.",
    "Vacaciones pendientes: salario / 30 × días ganados sin tomar.",
    "Cesantía (solo con {{hn.cesantia-renuncia-anios}} o más y fuera de una microempresa): un mes por año trabajado × {{hn.cesantia-renuncia-porcentaje}}.",
  ],
  ejemplo: ["Gana L18,000, renuncia el 30 de septiembre de 2026 y tiene 5 días de vacaciones pendientes. Cobra L13,463.01 + L4,536.99 + L3,000 = L21,000."],
  faq: [
    {
      pregunta: "¿Si renuncio me pagan prestaciones?",
      respuesta: "Le pagan lo ya ganado: décimos proporcionales y vacaciones pendientes. El preaviso y la cesantía completa son para el despido sin causa.",
    },
    {
      pregunta: "¿Desde cuántos años me pagan cesantía si renuncio?",
      respuesta: "Desde {{hn.cesantia-renuncia-anios}} de trabajo continuo con el mismo patrono. En ese caso cobra el {{hn.cesantia-renuncia-porcentaje}} de lo que le tocaría por despido. En una microempresa no aplica.",
    },
    {
      pregunta: "¿Tengo que avisar antes de renunciar?",
      respuesta: "Sí. El preaviso va de {{hn.preaviso-dias[menos-de-3-meses]}} a {{hn.preaviso-dias[mas-de-2-anios]}} según su antigüedad. Si no lo da, el patrono puede reclamarle la mitad del salario de ese tiempo.",
    },
    {
      pregunta: "¿Pierdo las vacaciones si renuncio?",
      respuesta: "No pierde las que ya ganó: se las pagan en dinero. La parte del año en curso solo se paga si el contrato termina por causa del patrono.",
    },
  ],
  glosario: [
    { termino: "Renuncia", definicion: "Cuando el trabajador decide terminar el contrato por su voluntad." },
    { termino: "Microempresa", definicion: "Para la cesantía, la que tiene como máximo 10 empleados remunerados." },
  ],
});
