import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.cuota-autonomos",
  h1: "Calculadora de la cuota de autónomos 2026",
  title: "Cuota de autónomos 2026: calcula tu tramo y lo que pagas",
  description:
    "Calcula tu cuota de autónomos en 2026 según tus rendimientos netos: tramo, base mínima y máxima y cuota mensual, con las tablas de la orden de cotización.",
  intro: [
    "Desde 2023 los autónomos cotizan según lo que ganan de verdad. Tus rendimientos netos te colocan en un tramo, y cada tramo tiene una base mínima y una máxima.",
    "Con esta calculadora ves en qué tramo estás en 2026 y cuánto pagas al mes según la base que elijas.",
  ],
  comoSeCalcula: [
    "Parte de tu rendimiento neto anual (ingresos menos gastos de la actividad). Se le resta un {{es.autonomos-gastos-genericos[general]}} por gastos genéricos, o un {{es.autonomos-gastos-genericos[societario]}} si eres autónomo societario.",
    "Divide el resultado entre 12. Ese rendimiento mensual te coloca en un tramo de la tabla reducida (hasta {{es.autonomos-limite-tramo[r3]}}) o de la tabla general.",
    "Eliges una base de cotización entre la mínima y la máxima de tu tramo. Por ejemplo, en el tramo 1 general va de {{es.autonomos-base-minima[g1]}} a {{es.autonomos-base-maxima[g1]}}.",
    "A la base se le aplica el tipo total: {{es.autonomos-tipos[contingencias-comunes]}} de contingencias comunes, {{es.autonomos-tipos[contingencias-profesionales]}} de profesionales, {{es.autonomos-tipos[cese-actividad]}} de cese de actividad, {{es.autonomos-tipos[formacion]}} de formación y {{es.autonomos-tipos[mei]}} de MEI.",
  ],
  ejemplo: [
    "Con 24.000 euros de rendimiento neto al año, después del 7 % quedan 1.860 euros al mes. Estás en el tramo 5 general y la cuota mínima es de 380,88 euros al mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto paga un autónomo en 2026?",
      respuesta: "Depende de lo que gane. Con la base mínima, desde unos 205 euros al mes en el tramo más bajo hasta unos 607 euros en el más alto.",
    },
    {
      pregunta: "¿Qué pasa si gano más o menos de lo que calculé?",
      respuesta: "Al año siguiente la Seguridad Social cruza tus datos con Hacienda y regulariza: te reclama la diferencia o te la devuelve.",
    },
    {
      pregunta: "¿Puedo cambiar de base a lo largo del año?",
      respuesta: "Sí. Puedes pedir a la Seguridad Social que la cambie varias veces al año para ajustarla a lo que vas ganando.",
    },
    {
      pregunta: "¿Qué es un autónomo societario?",
      respuesta: "Quien trabaja para una sociedad de la que es socio o administrador con control efectivo. Su deducción por gastos genéricos es menor.",
    },
  ],
  glosario: [
    { termino: "Rendimiento neto", definicion: "Lo que te queda de la actividad después de restar los gastos deducibles." },
    { termino: "Base de cotización", definicion: "Cantidad sobre la que se aplica el porcentaje de la cuota. La eliges dentro de tu tramo." },
    { termino: "Cese de actividad", definicion: "El paro de los autónomos. Se financia con parte de la cuota." },
  ],
});
