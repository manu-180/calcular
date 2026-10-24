import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.lon-efter-skatt",
  h1: "Räkna ut lön efter skatt",
  title: "Lön efter skatt 2026: räkna ut nettolönen i din kommun",
  description:
    "Räkna ut din lön efter skatt med skattesatsen i din kommun. Samma skattetabell som på lönebeskedet, med jobbskatteavdrag och statlig skatt.",
  intro: [
    "Skriv in din bruttolön och välj kommunen där du är folkbokförd. Du får se vad som blir kvar efter skatt varje månad och vilken skattetabell arbetsgivaren använder.",
    "Skatten beror mest på kommunalskatten, som skiljer flera procentenheter mellan kommunerna. Har du hög lön tillkommer statlig inkomstskatt på den del av årsinkomsten som ligger över brytpunkten.",
  ],
  comoSeCalcula: [
    "Din skattesats är kommunalskatten och regionskatten i din kommun plus begravningsavgiften, och kyrkoavgiften om du är medlem i Svenska kyrkan. Satsen avrundas till ett heltal, och det talet är din skattetabell.",
    "Arbetsgivaren räknar om månadslönen till en årsinkomst och drar av grundavdraget. Det beror på inkomsten och på prisbasbeloppet, som är {{se.prisbasbelopp}} för 2026.",
    "På det som blir kvar räknas kommunal skatt. Statlig skatt, {{se.statlig-inkomstskatt}}, tas ut på den beskattningsbara inkomst som överstiger {{se.skiktgrans}} per år.",
    "Jobbskatteavdraget och skattereduktionen för förvärvsinkomst sänker den kommunala skatten. Den allmänna pensionsavgiften på {{se.allman-pensionsavgift[sats]}} procent av lönen dras av igen som en skattereduktion.",
    "Public service-avgiften ({{se.public-service-avgift[sats]}} procent av den beskattningsbara inkomsten, med ett tak) läggs till. Årsskatten delas med tolv och blir skatteavdraget per månad.",
  ],
  ejemplo: [
    "I Stockholm är kommunal- och regionskatten {{se.kommunalskatt[stockholm]}} och begravningsavgiften {{se.begravningsavgift[stockholm]}}, så lönen dras enligt tabell 31. Med 35 000 kronor i månaden blir skatteavdraget 6 709 kronor och du får 28 291 kronor efter skatt.",
  ],
  faq: [
    {
      pregunta: "Varför stämmer inte skatten exakt med mitt lönebesked?",
      respuesta:
        "Lönebeskedet följer skattetabellen, som räknar med inkomstintervall och en avrundad skattesats. Har du förmåner, en jämkning eller ett annat skattebeslut kan avdraget skilja. Den slutliga skatten räknas fram i deklarationen.",
    },
    {
      pregunta: "Hur vet jag vilken skattetabell jag har?",
      respuesta:
        "Lägg ihop kommunalskatten, regionskatten och begravningsavgiften, och kyrkoavgiften om du är medlem i Svenska kyrkan. Avrunda till heltal: 32,50 blir tabell 32 och 32,51 blir tabell 33. Tabellen står också på ditt beslut om A-skatt.",
    },
    {
      pregunta: "När börjar man betala statlig skatt?",
      respuesta:
        "När den beskattningsbara förvärvsinkomsten är högre än skiktgränsen, {{se.skiktgrans}} för 2026. Eftersom grundavdraget dras först ligger brytpunkten för lönen lite högre.",
    },
    {
      pregunta: "Vad är jobbskatteavdraget?",
      respuesta:
        "En skattereduktion för dig som arbetar. Den räknas av mot den kommunala skatten och är större ju högre arbetsinkomst du har, upp till ett tak. Arbetsgivaren tar med den direkt i skattetabellen.",
    },
    {
      pregunta: "Gäller kalkylatorn om jag är pensionär?",
      respuesta:
        "Nej. Den räknar som kolumn 1 i skattetabellen, alltså lön till den som inte har fyllt 66 år vid årets början. Den som är äldre har ett högre grundavdrag och ett annat jobbskatteavdrag.",
    },
  ],
  glosario: [
    { termino: "Bruttolön", definicion: "Lönen före skatt, som det står i ditt anställningsavtal." },
    { termino: "Nettolön", definicion: "Det som betalas ut till ditt konto efter skatteavdraget." },
    { termino: "Grundavdrag", definicion: "Ett belopp av årsinkomsten som du inte betalar inkomstskatt på." },
    { termino: "Skiktgräns", definicion: "Den beskattningsbara inkomst där statlig skatt börjar: {{se.skiktgrans}} per år 2026." },
  ],
});
