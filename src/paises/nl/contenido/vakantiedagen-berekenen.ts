import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.vakantiedagen-berekenen",
  h1: "Vakantiedagen berekenen",
  title: "Vakantiedagen berekenen: hoeveel vrije dagen krijg je?",
  description:
    "Bereken je wettelijke vakantiedagen en -uren: {{nl.vakantie-weken}} keer je werkuren per week. Ook voor parttime, een deel van het jaar en bovenwettelijke dagen.",
  intro: [
    "Volgens het Burgerlijk Wetboek krijg je per jaar minstens {{nl.vakantie-weken}} keer het aantal uren dat je per week werkt aan vakantie. Werk je fulltime 40 uur in 5 dagen, dan zijn dat 160 uur, dus 20 dagen.",
    "Veel werkgevers geven meer, de zogenoemde bovenwettelijke vakantiedagen. Die staan in je contract of cao. Vul ze in en je ziet je totaal.",
  ],
  comoSeCalcula: [
    "Wettelijke vakantie-uren = {{nl.vakantie-weken}} × je uren per week.",
    "Ben je maar een deel van het jaar in dienst, dan krijg je een evenredig deel. Bij zes maanden is dat de helft.",
    "Voor het aantal dagen delen we de uren door je gemiddelde uren per werkdag.",
    "Bovenwettelijke dagen tellen we er apart bij op, ook naar verhouding van de maanden in dienst.",
  ],
  ejemplo: ["Werk je 24 uur in 3 dagen per week, dan heb je recht op 4 × 24 = 96 vakantie-uren. Met 8 uur per dag zijn dat 12 vakantiedagen."],
  faq: [
    {
      pregunta: "Heb je als parttimer minder vakantiedagen?",
      respuesta: "In uren wel, in weken niet. Je krijgt {{nl.vakantie-weken}} keer je eigen arbeidsduur per week. Werk je minder uren, dan heb je minder vakantie-uren, maar je kunt er net zo veel weken mee vrij nemen als een fulltimer.",
    },
    {
      pregunta: "Wat is het verschil tussen wettelijke en bovenwettelijke vakantiedagen?",
      respuesta: "Wettelijke dagen zijn het minimum uit de wet. Bovenwettelijke dagen geeft je werkgever extra, bijvoorbeeld via je cao. Voor bovenwettelijke dagen kunnen andere afspraken gelden, zoals hoelang je ze mag bewaren.",
    },
    {
      pregunta: "Bouw je vakantie op als je maar een deel van het jaar werkt?",
      respuesta: "Ja. Heb je maar een deel van het jaar recht op loon gehad, dan krijg je over dat deel een evenredig deel van je vakantie.",
    },
  ],
  glosario: [
    { termino: "Arbeidsduur", definicion: "Het aantal uren dat je volgens je contract per week werkt." },
    { termino: "Bovenwettelijke vakantiedagen", definicion: "Vakantiedagen die je bovenop het wettelijk minimum krijgt, via je contract of cao." },
  ],
});
