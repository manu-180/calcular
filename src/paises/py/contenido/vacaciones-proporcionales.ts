import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.vacaciones-proporcionales",
  h1: "Calculadora de vacaciones proporcionales",
  title: "Vacaciones proporcionales en Paraguay: calculá tus días",
  description: "Calculá los días y el pago de vacaciones del año que no completaste ({{py.vacaciones-dias[hasta-5]}} a {{py.vacaciones-dias[mas-10]}} por año según antigüedad). Gratis, al instante.",
  intro: [
    "Las vacaciones proporcionales son la parte de vacaciones que ganaste en el año que no llegaste a completar. Se pagan cuando el contrato termina por causa del empleador.",
    "Poné tu salario y las fechas. Te mostramos los días y cuánto te corresponde.",
  ],
  comoSeCalcula: [
    "Se mira cuántos días de vacaciones da el año en curso: {{py.vacaciones-dias[hasta-5]}} hasta cinco años, {{py.vacaciones-dias[hasta-10]}} hasta diez y {{py.vacaciones-dias[mas-10]}} con más de diez.",
    "Se calcula la parte del año que trabajaste desde tu último aniversario.",
    "Esa parte por los días del año da los días proporcionales.",
    "Se pagan con tu salario diario: el mensual dividido {{py.divisor-salario-diario}}.",
  ],
  ejemplo: ["Con Gs. 4.500.000 de salario y medio año trabajado desde tu último aniversario, te corresponden unos 6 días: Gs. 907.397."],
  faq: [
    {
      pregunta: "¿Cuándo me pagan vacaciones proporcionales?",
      respuesta: "La ley las paga cuando el contrato termina antes de cumplir el año por causa del empleador. En un despido sin causa se suelen pagar también las del año en curso a quien ya tiene más antigüedad.",
    },
    {
      pregunta: "¿Cuántos días de vacaciones me corresponden por año?",
      respuesta: "{{py.vacaciones-dias[hasta-5]}} hasta cinco años de antigüedad, {{py.vacaciones-dias[hasta-10]}} de cinco a diez y {{py.vacaciones-dias[mas-10]}} con más de diez.",
    },
    {
      pregunta: "¿Y las vacaciones de años anteriores que no tomé?",
      respuesta: "Se pagan enteras. Si te despiden después de los seis meses que tenía el empleador para dártelas, se pagan el doble.",
    },
  ],
  glosario: [
    { termino: "Vacaciones causadas", definicion: "Las que ganaste al cumplir un año de trabajo y todavía no tomaste." },
    { termino: "Vacaciones proporcionales", definicion: "La parte de vacaciones del año que no llegaste a completar (artículo 221 del Código del Trabajo)." },
  ],
});
