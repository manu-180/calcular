import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.bedrijfsvoorheffing-berekenen",
  h1: "Bedrijfsvoorheffing berekenen met de sleutelformule",
  title: "Bedrijfsvoorheffing berekenen 2026 met de sleutelformule",
  description:
    "Bereken de bedrijfsvoorheffing op je maandloon met de officiële sleutelformule: forfaitaire beroepskosten, schijven, belastingvrije som en kinderen ten laste.",
  intro: [
    "De bedrijfsvoorheffing is het voorschot op je personenbelasting dat je werkgever elke maand van je loon inhoudt. De FOD Financiën legt de berekening vast in de sleutelformule.",
    "Vul je belastbaar maandloon in (bruto min RSZ), je gezinssituatie en het aantal kinderen ten laste. Je ziet de bedrijfsvoorheffing per maand en hoe ze tot stand komt.",
  ],
  comoSeCalcula: [
    "Je belastbaar maandloon maal 12 is het bruto jaarinkomen.",
    "Daar gaan forfaitaire beroepskosten af: 30 % van dat bedrag, met een maximum van {{be.bv-gezin[forfait-max]}}.",
    "Op het resultaat passen we de basisschaal toe. Die bevat al 7 % aanvullende gemeentebelasting. Van die belasting gaat de belasting op de belastingvrije som af: {{be.bv-gezin[belasting-vrije-som]}} per jaar.",
    "Heeft je partner geen beroepsinkomen, dan wordt eerst 30 % van je inkomen aan je partner toegekend, met een maximum van {{be.bv-gezin[hq-max]}}. Dat is het huwelijksquotiënt.",
    "Daarna gaan de verminderingen voor kinderen ten laste af, bijvoorbeeld {{be.bv-kinderen[2]}} per jaar voor twee kinderen. De jaarbelasting delen we door 12.",
  ],
  ejemplo: [
    "Met € 2.500 belastbaar per maand, alleenstaand en één kind: 30.000 − 6.070 beroepskosten = 23.930. De belasting volgens de schaal is 7.560,09. Na de belastingvrije som en de vermindering voor één kind blijft er 3.948,11 per jaar over, of € 329,01 per maand (regels tot eind oktober 2026).",
  ],
  faq: [
    {
      pregunta: "Waarom verandert de bedrijfsvoorheffing op 1 november 2026?",
      respuesta:
        "De wet van 15 juli 2026 tot hervorming van de personenbelasting verhoogt de belastingvrije som al voor de inkomsten van 2026. De FOD Financiën past de bedrijfsvoorheffing daarom aan vanaf 1 november 2026, met hogere belastingvrije som en nieuwe bedragen voor kinderen ten laste.",
    },
    {
      pregunta: "Wie is alleenstaand voor de bedrijfsvoorheffing?",
      respuesta:
        "Wie niet gehuwd is en niet wettelijk samenwoont. Gehuwden en wettelijk samenwonenden kiezen de optie die past bij het inkomen van hun partner.",
    },
    {
      pregunta: "Hoe tellen kinderen met een handicap?",
      respuesta: "Een kind ten laste met een handicap telt voor twee kinderen. Vul dus één kind extra in.",
    },
    {
      pregunta: "Is de bedrijfsvoorheffing gelijk aan mijn personenbelasting?",
      respuesta:
        "Niet precies. Het is een voorschot. Bij je belastingaangifte wordt alles afgerekend, met je echte gemeentebelasting, aftrekposten en belastingverminderingen.",
    },
  ],
  glosario: [
    { termino: "Sleutelformule", definicion: "De officiële rekenregels van de FOD Financiën voor de bedrijfsvoorheffing op maandlonen." },
    { termino: "Forfaitaire beroepskosten", definicion: "Een vast bedrag aan kosten dat automatisch van je inkomen afgaat, zonder dat je bewijzen moet voorleggen." },
    { termino: "Huwelijksquotiënt", definicion: "Een deel van je inkomen dat aan je partner wordt toegekend als die geen eigen beroepsinkomen heeft. Zo valt je inkomen in lagere schijven." },
    { termino: "Belastingvrije som", definicion: "Het deel van je inkomen waarop je geen belasting betaalt." },
  ],
});
