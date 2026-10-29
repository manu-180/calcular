import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.sociale-bijdragen-zelfstandige",
  h1: "Sociale bijdragen zelfstandige berekenen",
  title: "Sociale bijdragen zelfstandige {{anio}}: per kwartaal berekenen",
  description:
    "Bereken je sociale bijdragen als zelfstandige in hoofdberoep of bijberoep: {{be.rsvz-tarieven[tarief-1]}} tot {{be.rsvz[grens-1]}} en {{be.rsvz-tarieven[tarief-2]}} daarboven, met minimum en maximum.",
  intro: [
    "Als zelfstandige betaal je elk kwartaal sociale bijdragen aan je sociaal verzekeringsfonds. Ze worden berekend op je netto belastbaar beroepsinkomen.",
    "Vul je inkomen in en kies hoofdberoep of bijberoep. Je ziet je bijdrage per kwartaal en per jaar, zonder de beheerskosten van je fonds.",
  ],
  comoSeCalcula: [
    "{{be.rsvz-tarieven[tarief-1]}} op het deel van je inkomen tot {{be.rsvz[grens-1]}}.",
    "{{be.rsvz-tarieven[tarief-2]}} op het deel tussen {{be.rsvz[grens-1]}} en {{be.rsvz[grens-2]}}. Daarboven betaal je niets meer.",
    "In hoofdberoep geldt een minimuminkomen van {{be.rsvz[minimum-inkomen]}}, of {{be.rsvz[minimum-inkomen-primostarter]}} in je kwartalen als primostarter.",
    "In bijberoep betaal je niets als je inkomen onder {{be.rsvz[drempel-bijberoep]}} blijft.",
    "De jaarbijdrage delen we door 4 voor het bedrag per kwartaal.",
  ],
  ejemplo: [
    "Met € 40.000 netto belastbaar inkomen in hoofdberoep betaal je {{be.rsvz-tarieven[tarief-1]}} of € 8.200 per jaar, dus € 2.050 per kwartaal, plus de beheerskosten van je fonds.",
  ],
  faq: [
    {
      pregunta: "Op welk inkomen worden de bijdragen berekend?",
      respuesta:
        "De definitieve bijdragen worden berekend op je netto belastbaar beroepsinkomen van het jaar zelf. Zolang dat niet gekend is, betaal je voorlopige bijdragen op je geherwaardeerde inkomen van drie jaar eerder, of op een geraamd inkomen als je pas start.",
    },
    {
      pregunta: "Wat zijn beheerskosten?",
      respuesta: "Een bedrag dat je sociaal verzekeringsfonds aanrekent bovenop je bijdragen. Het verschilt per fonds en zit niet in deze berekening.",
    },
    {
      pregunta: "Wat is een primostarter?",
      respuesta:
        "Een zelfstandige in hoofdberoep die voor het eerst start. In de eerste kwartalen geldt een lager minimuminkomen, zodat de minimumbijdrage lager ligt.",
    },
  ],
  glosario: [
    { termino: "Sociaal verzekeringsfonds", definicion: "De organisatie waarbij je als zelfstandige aangesloten bent en die je bijdragen int." },
    { termino: "Hoofdberoep", definicion: "Je zelfstandige activiteit is je belangrijkste beroepsbezigheid." },
    { termino: "Bijberoep", definicion: "Je bent zelfstandige naast een andere hoofdactiviteit, bijvoorbeeld een job als werknemer." },
  ],
});
