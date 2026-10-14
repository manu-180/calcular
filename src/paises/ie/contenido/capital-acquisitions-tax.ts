import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.capital-acquisitions-tax",
  h1: "Inheritance and gift tax calculator (CAT)",
  title: "Inheritance tax calculator Ireland: CAT thresholds",
  description:
    "Work out Capital Acquisitions Tax on a gift or inheritance in Ireland, with the Group A, B and C thresholds and the {{ie.cat-rate}} rate.",
  intro: [
    "Capital Acquisitions Tax (CAT) is the tax on gifts and inheritances. You only pay it on the part of what you receive that goes over your tax-free threshold.",
    "Your threshold depends on your relationship to the person giving it: {{ie.cat-thresholds[group-a]}} for Group A, {{ie.cat-thresholds[group-b]}} for Group B and {{ie.cat-thresholds[group-c]}} for Group C.",
  ],
  comoSeCalcula: [
    "Add the taxable value of this gift or inheritance to everything you received before in the same group since 5 December 1991.",
    "Anything above your group threshold is taxed at {{ie.cat-rate}}. The part that was already over the threshold before is not taxed again.",
  ],
  ejemplo: ["A child inherits €450,000 with no earlier gifts. The Group A threshold is €420,000, so €30,000 is taxed at 33%: €9,900."],
  faq: [
    {
      pregunta: "Who is in each group?",
      respuesta:
        "Group A is mainly children of the person giving it. Group B covers brothers, sisters, nephews, nieces, grandparents and grandchildren, among others. Group C is everyone else, such as uncles, aunts, cousins, in-laws and friends.",
    },
    {
      pregunta: "Did the thresholds change in October 2026?",
      respuesta: "Yes. For gifts and inheritances on or after 7 October 2026 they are €420,000, €44,000 and €22,000. Before that they were €400,000, €40,000 and €20,000.",
    },
    {
      pregunta: "Do I pay CAT on an inheritance from my spouse?",
      respuesta: "No. Gifts and inheritances taken by a spouse or civil partner are exempt from CAT.",
    },
    {
      pregunta: "Which date decides the threshold?",
      respuesta: "The date of the gift or inheritance. For an inheritance that is usually the date of death of the person leaving it.",
    },
  ],
  glosario: [
    { termino: "Disponer", definicion: "The person who gives the gift or leaves the inheritance." },
    { termino: "Aggregation", definicion: "Adding earlier gifts and inheritances in the same group when working out how much of your threshold is used." },
  ],
});
