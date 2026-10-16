import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.registratierechten-berekenen",
  h1: "Registratierechten berekenen in Vlaanderen",
  title: "Registratierechten Vlaanderen: {{be.verkooprecht-vlaanderen-tarieven[enige-eigen-woning]}} of {{be.verkooprecht-vlaanderen-tarieven[algemeen]}}",
  description:
    "Bereken het verkooprecht bij de aankoop van een woning in Vlaanderen: {{be.verkooprecht-vlaanderen-tarieven[enige-eigen-woning]}} voor je enige eigen woning, {{be.verkooprecht-vlaanderen-tarieven[algemeen]}} voor andere aankopen.",
  intro: [
    "Koop je een woning, een appartement of een bouwgrond in Vlaanderen, dan betaal je registratiebelasting op de aankoopprijs. Voor een aankoop heet die belasting verkooprecht.",
    "Voor je enige eigen woning betaal je {{be.verkooprecht-vlaanderen-tarieven[enige-eigen-woning]}}. Voor andere aankopen is het algemene tarief {{be.verkooprecht-vlaanderen-tarieven[algemeen]}}. Bij een bescheiden woning gaat er nog een vermindering af.",
  ],
  comoSeCalcula: [
    "Verkooprecht = aankoopprijs × tarief.",
    "Bescheiden woning: kost je enige eigen woning hoogstens {{be.verkooprecht-vlaanderen[max-bescheiden]}}, of {{be.verkooprecht-vlaanderen[max-bescheiden-kern]}} in een kernstad of de Vlaamse Rand, dan gaat er {{be.verkooprecht-vlaanderen[vermindering]}} af.",
    "Het tarief hangt af van de datum van de authentieke akte bij de notaris.",
  ],
  ejemplo: [
    "Je koopt je enige eigen woning voor € 200.000 buiten een kernstad. Het verkooprecht is {{be.verkooprecht-vlaanderen-tarieven[enige-eigen-woning]}} of € 4.000, min de vermindering van {{be.verkooprecht-vlaanderen[vermindering]}}: je betaalt € 2.133.",
  ],
  faq: [
    {
      pregunta: "Wat zijn de voorwaarden voor het verlaagde tarief?",
      respuesta:
        "Het verlaagde tarief geldt alleen voor aankopen door natuurlijke personen. Je moet je binnen drie jaar na de aankoop op dat adres laten inschrijven in het bevolkingsregister.",
    },
    {
      pregunta: "Betaal ik registratierechten op een nieuwbouwwoning?",
      respuesta: "Nee, niet als er btw verschuldigd is op de verkoop, zoals bij de aankoop van veel nieuwe woningen en appartementen. Dan betaal je btw in de plaats van verkooprecht.",
    },
    {
      pregunta: "Wanneer is het algemene tarief van toepassing?",
      respuesta: "Bij elke aankoop die niet je enige eigen woning is, zoals een tweede verblijf of een woning om te verhuren. Voor sommige aankopen, zoals onbebouwde landbouwgrond, gelden nog andere tarieven.",
    },
  ],
  glosario: [
    { termino: "Verkooprecht", definicion: "De registratiebelasting die je betaalt bij de aankoop van onroerend goed." },
    { termino: "Enige eigen woning", definicion: "De woning die je koopt om er zelf te wonen, terwijl je geen andere woning bezit." },
    { termino: "Authentieke akte", definicion: "De akte die bij de notaris verleden wordt en de verkoop officieel maakt." },
  ],
});
