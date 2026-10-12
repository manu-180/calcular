import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.despido-trabajador-de-confianza",
  h1: "Despido de un trabajador de confianza en Nicaragua",
  title: "Trabajador de confianza en Nicaragua: indemnización",
  description: "Si te despiden de un cargo de confianza en Nicaragua, la indemnización va de {{ni.confianza-minimo-meses}} a {{ni.confianza-maximo-meses}} de salario. Calculá el rango que te corresponde.",
  intro: [
    "Gerentes, administradores y otros cargos de confianza no pueden pedir el reintegro si los despiden. A cambio, la ley les da una indemnización especial.",
    "Va de {{ni.confianza-minimo-meses}} a {{ni.confianza-maximo-meses}} de salario, si tenés al menos {{ni.confianza-antiguedad-minima}} de trabajo continuo.",
  ],
  comoSeCalcula: [
    "Se revisa que tengas al menos {{ni.confianza-antiguedad-minima}} continuo de trabajo.",
    "Mínimo: {{ni.confianza-minimo-meses}} de salario. Máximo: {{ni.confianza-maximo-meses}}.",
    "El monto final dentro de ese rango se acuerda o lo decide un juez.",
  ],
  ejemplo: ["Un gerente que gana C$40,000 y trabajó tres años tiene una indemnización de entre C$80,000 y C$240,000."],
  faq: [
    {
      pregunta: "¿Quién es trabajador de confianza en Nicaragua?",
      respuesta: "Depende de lo que hacés, no del nombre del puesto. Siempre lo son los directores o administradores que dirigen en nombre del empleador y pueden representarlo.",
    },
    {
      pregunta: "¿Cuánto me corresponde si me despiden de un cargo de confianza?",
      respuesta: "Entre {{ni.confianza-minimo-meses}} y {{ni.confianza-maximo-meses}} de salario, más tus otras prestaciones, si trabajaste al menos {{ni.confianza-antiguedad-minima}} seguido.",
    },
    {
      pregunta: "¿Puedo pedir que me reintegren?",
      respuesta: "No. El artículo 47 del Código del Trabajo excluye el reintegro para los cargos de confianza.",
    },
    {
      pregunta: "¿Y si trabajé menos de un año?",
      respuesta: "No aplica esta indemnización especial. Igual te pagan el aguinaldo y las vacaciones proporcionales.",
    },
  ],
  glosario: [
    { termino: "Trabajador de confianza", definicion: "Quien dirige, administra o representa al empleador." },
    { termino: "Reintegro", definicion: "Volver al puesto de trabajo después de un despido declarado ilegal." },
  ],
});
