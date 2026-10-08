import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.utilidades",
  h1: "Calculadora de utilidades 2026",
  title: "Utilidades 2026 Ecuador: calcula tu parte del {{ec.utilidades}}",
  description: "Calcula cuánto te toca de utilidades: el {{ec.utilidades-partes-iguales}} en partes iguales y el {{ec.utilidades-cargas}} según tus cargas familiares, en proporción al tiempo trabajado.",
  intro: [
    "Las utilidades son el {{ec.utilidades}} de la utilidad líquida (la ganancia) de la empresa, que se reparte entre el personal: el {{ec.utilidades-partes-iguales}} en partes iguales y el {{ec.utilidades-cargas}} según las cargas familiares. Te corresponden aunque no hayas trabajado el año completo.",
    "Necesitas la utilidad de la empresa, cuántas personas trabajaron y cuántas cargas familiares tienen en total. Esos datos te los da tu empleador.",
  ],
  comoSeCalcula: [
    "Del total de la utilidad líquida, el {{ec.utilidades}} es para el personal.",
    "El {{ec.utilidades-partes-iguales}} se divide en partes iguales, sin importar cuánto gana cada persona. Solo cuenta el tiempo trabajado.",
    "El {{ec.utilidades-cargas}} se reparte según las cargas familiares de cada persona (y el tiempo trabajado).",
    "Si trabajaste menos del año completo, recibes la parte proporcional al tiempo.",
  ],
  ejemplo: [
    "La empresa ganó $100.000 y son 10 personas con 8 cargas en total. Tú tienes 2 cargas y trabajaste todo el año: cobras $1.000 de la parte igual y $1.250 por cargas, $2.250 en total.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calculan las utilidades de un trabajador?",
      respuesta: "Del {{ec.utilidades}} de la utilidad líquida, el {{ec.utilidades-partes-iguales}} se divide en partes iguales según el tiempo trabajado y el {{ec.utilidades-cargas}} según las cargas familiares de cada persona.",
    },
    {
      pregunta: "¿Cuándo se pagan las utilidades?",
      respuesta: "La empresa tiene que liquidarlas hasta el 31 de marzo y pagarlas dentro de los quince días siguientes. En la práctica, hasta mediados de abril.",
    },
    {
      pregunta: "¿Quiénes cuentan como cargas familiares?",
      respuesta: "Tu cónyuge o conviviente en unión de hecho, tus hijos menores de 18 años y tus hijos con discapacidad de cualquier edad.",
    },
    {
      pregunta: "Trabajé solo unos meses, ¿me toca?",
      respuesta: "Sí. Recibes la parte proporcional al tiempo que trabajaste en el año.",
    },
    {
      pregunta: "¿Por qué mi cálculo no coincide exacto con el de la empresa?",
      respuesta: "La empresa calcula con los días trabajados de cada persona. Acá suponemos que el resto trabajó el año completo, así que el resultado es una buena aproximación.",
    },
  ],
  glosario: [
    { termino: "Utilidad líquida", definicion: "La ganancia de la empresa en el año, antes de repartir a los trabajadores." },
    { termino: "Cargas familiares", definicion: "Las personas que dependen de ti y que cuentan para el reparto del {{ec.utilidades-cargas}}." },
  ],
});
