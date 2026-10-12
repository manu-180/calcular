import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.pagos-a-cuenta",
  h1: "Calculadora de pagos a cuenta del ISR en Honduras",
  title: "Pagos a cuenta del ISR en Honduras: cuotas y fechas",
  description: "Calcule sus cuotas trimestrales de pagos a cuenta del ISR con el impuesto del año anterior y el saldo que le queda para abril.",
  intro: [
    "Las empresas y personas con ingresos que no son de salario adelantan su ISR en {{hn.pagos-a-cuenta-cuotas}} cuotas trimestrales. Son los pagos a cuenta.",
    "Cada cuota es el ISR del año anterior dividido entre {{hn.pagos-a-cuenta-cuotas}}. La última es el saldo que queda al declarar.",
  ],
  comoSeCalcula: [
    "Cuota = ISR del año anterior / {{hn.pagos-a-cuenta-cuotas}}.",
    "Las tres primeras se pagan a más tardar el 30 de junio, el 30 de septiembre y el 31 de diciembre.",
    "La cuarta es el saldo: el ISR del año menos las tres cuotas pagadas, a más tardar el 30 de abril del año siguiente.",
  ],
  ejemplo: ["Su ISR del año pasado fue L120,000. Paga L30,000 en junio, septiembre y diciembre. Si el impuesto del año da L150,000, en abril paga L60,000."],
  faq: [
    {
      pregunta: "¿Quiénes hacen pagos a cuenta?",
      respuesta: "Las personas naturales y jurídicas que pagan ISR, salvo quienes solo tienen ingresos de su trabajo con retención mensual en la fuente.",
    },
    {
      pregunta: "¿Cuándo vencen los pagos a cuenta?",
      respuesta: "El 30 de junio, el 30 de septiembre y el 31 de diciembre. Si alguna fecha cae en día inhábil, se paga el siguiente día hábil.",
    },
    {
      pregunta: "¿Qué pasa si pagué de más?",
      respuesta: "Si las cuotas suman más que el impuesto del año, la diferencia queda como crédito a su favor.",
    },
    {
      pregunta: "¿Y si el año anterior no pagué ISR?",
      respuesta: "Las cuotas se estiman con los ingresos que espera tener en el año.",
    },
  ],
  glosario: [
    { termino: "Pagos a cuenta", definicion: "Las cuotas trimestrales con las que se adelanta el ISR durante el año (artículo 34 de la Ley del ISR)." },
    { termino: "Propio cómputo", definicion: "El cálculo del impuesto que hace el propio contribuyente en su declaración." },
  ],
});
