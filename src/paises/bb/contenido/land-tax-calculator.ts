import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.land-tax-calculator",
  h1: "Barbados land tax calculator {{anio}}",
  title: "Land tax calculator {{anio}}: residential bands from {{bb.land-tax-residential[1].tasa}} to {{bb.land-tax-residential[-1].tasa}}",
  description:
    "Work out your Barbados land tax bill: nothing on the first {{bb.land-tax-residential[0].hasta}} of a home, then {{bb.land-tax-residential[1].tasa}}, {{bb.land-tax-residential[2].tasa}} and {{bb.land-tax-residential[3].tasa}} on each band above it.",
  intro: [
    "Land tax in Barbados is set by the Barbados Revenue Authority and charged on the value assigned to the property. For a home the first {{bb.land-tax-residential[0].hasta}} of improved value is taxed at {{bb.land-tax-residential[0].tasa}}, and the rate then rises through three bands.",
    "The bands apply from {{bb.land-tax-residential#desde}}, after the Government widened the zero band from $300,000 to $400,000. Non-residential property and vacant land pay a single rate on their value.",
  ],
  comoSeCalcula: [
    "Residential: {{bb.land-tax-residential[0].tasa}} up to {{bb.land-tax-residential[0].hasta}}, {{bb.land-tax-residential[1].tasa}} from there to {{bb.land-tax-residential[1].hasta}}, {{bb.land-tax-residential[2].tasa}} to {{bb.land-tax-residential[2].hasta}} and {{bb.land-tax-residential[3].tasa}} above that. Each rate applies only to the slice in its band.",
    "Land with a building other than a residence: {{bb.land-tax-non-residential[building]}} of the improved value.",
    "Vacant land under 4,000 sq ft: {{bb.land-tax-non-residential[vacant-small]}} of the site value.",
    "Vacant land over 4,000 sq ft: {{bb.land-tax-non-residential[vacant-large]}} up to $450,000 of site value and {{bb.land-tax-non-residential[vacant-large-high]}} above that.",
  ],
  ejemplo: [
    "A house is assessed at Bds$1,000,000. The first Bds$400,000 pays nothing. The next Bds$150,000 pays 0.1%, which is Bds$150.00. The next Bds$400,000 pays 0.7%, which is Bds$2,800.00. The last Bds$50,000 pays 1%, which is Bds$500.00. The bill for the year is Bds$3,450.00.",
  ],
  faq: [
    {
      pregunta: "How is residential land tax worked out in Barbados?",
      respuesta:
        "The BRA land tax FAQ and its press release on the 2026 to 2027 bills set {{bb.land-tax-residential[0].tasa}} on the first {{bb.land-tax-residential[0].hasta}} of value, {{bb.land-tax-residential[1].tasa}} to {{bb.land-tax-residential[1].hasta}}, {{bb.land-tax-residential[2].tasa}} to {{bb.land-tax-residential[2].hasta}} and {{bb.land-tax-residential[3].tasa}} above.",
    },
    {
      pregunta: "What rate applies to a commercial building?",
      respuesta: "The BRA FAQ gives {{bb.land-tax-non-residential[building]}} of the improved value for land with a building other than a residence.",
    },
    {
      pregunta: "What rate applies to vacant land?",
      respuesta: "{{bb.land-tax-non-residential[vacant-small]}} for lots under 4,000 sq ft, and {{bb.land-tax-non-residential[vacant-large]}} or {{bb.land-tax-non-residential[vacant-large-high]}} for larger lots depending on a site value of $450,000.",
    },
  ],
  glosario: [
    { termino: "Land tax", definicion: "An annual tax on land and buildings, collected by the Barbados Revenue Authority." },
    { termino: "Improved value", definicion: "The assessed value of land together with the buildings on it." },
    { termino: "Site value", definicion: "The assessed value of the land alone, used for vacant lots." },
    { termino: "Band", definicion: "A slice of value taxed at its own rate." },
  ],
});
