import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.non-resident-tax",
  h1: "Non-resident tax calculator for Singapore",
  title: "Non-resident tax Singapore: {{sg.no-residente-empleo}} or resident rates",
  description: "Work out Singapore tax as a non-resident: {{sg.no-residente-empleo}} or the resident rates on employment income, whichever is higher, and {{sg.no-residente-otros}} on director's fees and other income.",
  intro: [
    "If you are not a tax resident, Singapore taxes your employment income differently: you pay the higher of a flat rate or the progressive resident rates, and you cannot claim reliefs.",
    "Enter your employment income and any other income, such as director's fees or rent, to see the tax and which method applies.",
  ],
  comoSeCalcula: [
    "Employment income is taxed at {{sg.no-residente-empleo}} flat, or at the progressive resident rates without reliefs, whichever gives more tax.",
    "Director's fees, rental income and most other income are taxed at {{sg.no-residente-otros}}.",
    "The two amounts are added together.",
  ],
  ejemplo: [
    "On $60,000 of salary, the flat rate gives $9,000 and the resident rates give $1,950, so a non-resident pays $9,000.",
  ],
  faq: [
    {
      pregunta: "When am I a non-resident for tax?",
      respuesta:
        "As a foreigner, you are usually a non-resident if you stayed or worked in Singapore for less than 183 days in the calendar year, unless you meet one of the other IRAS residency conditions.",
    },
    {
      pregunta: "Since when is the non-resident rate 24%?",
      respuesta: "From the Year of Assessment 2024. Before that, the rate on income other than employment income was 22%.",
    },
    {
      pregunta: "Can I claim reliefs as a non-resident?",
      respuesta: "No. Only tax residents can claim personal reliefs, including Earned Income Relief.",
    },
  ],
  glosario: [
    { termino: "Tax resident", definicion: "Someone taxed at the progressive resident rates and allowed to claim reliefs." },
    { termino: "Director's fees", definicion: "Pay received as a company director. For non-residents it is taxed at {{sg.no-residente-otros}}." },
  ],
});
