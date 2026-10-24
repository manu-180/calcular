import type { DiccionarioLegal } from "./tipos";

// Bijna overal onpersoonlijk geformuleerd: dezelfde tekst past bij je en u, alleen de contactpagina
// verschilt.
export const nl: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Over ons | CalcularYa",
      description: "CalcularYa maakt rekenhulpen voor werk, geld en het dagelijks leven in elk land, met gegevens uit officiële bronnen.",
      h1: "Over ons",
      bajada: "Rekenhulpen voor elk land, elk met de eigen officiële gegevens.",
      bloques: [
        {
          parrafos: [
            "CalcularYa is een site met rekenhulpen voor dagelijkse vragen: salaris, leningen, belastingen, datums en nog veel meer.",
            "De site wordt gemaakt door Manuel Navarro, die ook calcular.ar maakt, een site met rekenhulpen voor Argentinië.",
          ],
        },
        {
          titulo: "Zo werken we",
          parrafos: [
            "Hangt een berekening af van een regel (een minimumloon, een premiepercentage, een plafond), dan halen we de waarde uit de officiële bron van het land: het staatsblad, het ministerie, de centrale bank of de belastingdienst.",
            "We bewaren de link en de datum van onze controle, en tonen die bij elke rekenhulp.",
            "Kan een waarde niet in de officiële bron worden bevestigd, dan wordt de rekenhulp die haar gebruikt niet gepubliceerd.",
            "Verandert een regel, dan verandert de rekenhulp mee, en de wijziging komt in het overzicht van wijzigingen van dat land.",
          ],
        },
        { titulo: "Gratis", parrafos: ["De rekenhulpen zijn gratis en werken zonder account."] },
      ],
    },
    contacto: {
      title: "Contact | CalcularYa",
      description: "Mail ons als een waarde verouderd is, een uitkomst niet klopt of je een rekenhulp of land mist.",
      h1: "Contact",
      bajada: `Ons e-mailadres is ${mail}.`,
      bloques: [
        {
          parrafos: [
            "We horen het graag als een waarde verouderd is, een uitkomst anders is dan je verwachtte of er een rekenhulp of land ontbreekt.",
            "Gaat het om een waarde, vermeld dan het land en de pagina waar je die zag.",
            "Er antwoordt een echt mens. Dat kan een paar dagen duren.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privacy | CalcularYa",
      description: "Welke gegevens CalcularYa gebruikt: wat in een rekenhulp wordt ingevuld, verwerkt de browser en bewaren we niet.",
      h1: "Privacy",
      bajada: `Laatst bijgewerkt: ${actualizado}.`,
      bloques: [
        {
          titulo: "Wat in een rekenhulp wordt ingevuld",
          parrafos: ["De berekening gebeurt in de browser. Ingevulde waarden gaan naar geen enkele server en we bewaren ze niet."],
        },
        {
          titulo: "Het land van het bezoek",
          parrafos: [
            "Om de rekenhulpen van het juiste land voor te stellen, kijken we uit welk land een bezoek komt. Onze hostingprovider leidt dat af uit het IP-adres.",
            "We bewaren het IP-adres niet. Het antwoord blijft in de browser zolang het bezoek duurt.",
          ],
        },
        {
          titulo: "Wat de browser bewaart",
          parrafos: [
            "In de sessieopslag van de browser, die gewist wordt bij het sluiten van het tabblad, onthouden we het land van het bezoek, of de melding met dat voorstel gesloten is en, als het bezoek via een gedeelde link kwam, de code van die link.",
            "In de lokale opslag, die blijft tot hij in de browser gewist wordt, bewaren we het zelf gekozen land, een willekeurig getal om bezoeken te tellen en de getoonde versie van een ontwerptest, zodat de site er bij elk bezoek hetzelfde uitziet. Niets daarvan zegt wie iemand is.",
            "We gebruiken geen advertentie- of trackingcookies.",
          ],
        },
        {
          titulo: "Hosting",
          parrafos: ["De site wordt gehost bij Vercel. Zoals elke server legt die technische gegevens van elk bezoek vast (IP-adres en browser), zodat de site werkt en veilig blijft."],
        },
        {
          titulo: "Hoe we bezoeken tellen",
          parrafos: [
            "We meten het gebruik van de site met een eigen hulpmiddel: welke pagina's worden geopend en hoeveel ze worden gebruikt, van welke site het bezoek komt, het soort apparaat en het land. Met het willekeurige getal in de browser onderscheiden we een nieuw bezoek van een terugkerend. We bewaren het IP-adres niet en ook niet wat in een rekenhulp wordt ingevuld.",
            "Links die vanaf de site worden gedeeld, krijgen een willekeurige code die bij elke keer delen anders is, om te tellen hoeveel bezoeken elke link oplevert. Die code identificeert niemand.",
            "Bedragen die in een rekenhulp worden ingevuld, verlaten de browser nooit in een link.",
          ],
        },
        {
          titulo: "Wijzigingen en vragen",
          parrafos: [
            "Verandert hier iets aan (bijvoorbeeld als er advertenties bijkomen), dan melden we dat op deze pagina voordat het ingaat.",
            `Voor vragen over persoonsgegevens is ons e-mailadres ${mail}.`,
          ],
        },
        {
          titulo: "Gedeelde salarissen",
          parrafos: [
            "Bij ‘Echte salarissen’ kan iedereen anoniem en vrijwillig een salaris toevoegen, alleen na uitdrukkelijke toestemming. We bewaren het land, het beroep (uit een vaste lijst), de ervaringsgroep, het bruto maandsalaris afgerond op twee significante cijfers en de maand. We bewaren geen IP-adres, browser of account. Tot de update van de volgende dag bewaren we ook de dag van de bijdrage en een vingerafdruk van de verbinding, versleuteld met een sleutel die elke dag verandert en waarmee het IP-adres niet te achterhalen is; aan het eind van de dag worden beide gewist.",
            "De cijfers worden één keer per dag gepubliceerd. Een beroep verschijnt vanaf 10 bijdragen, gedaan op meerdere dagen en in minstens twee verschillende maanden. We tonen alleen de mediaan en de spreiding, afgerond, en het aantal bijdragen in bereiken. Zo kan niemand het salaris van een persoon afleiden door de pagina op twee dagen te vergelijken. Een individueel salaris wordt nooit getoond.",
            "Om te voorkomen dat hetzelfde land twee keer in dezelfde maand wordt toegevoegd, onthoudt de browser in de lokale opslag het land en de maand van de bijdrage, nooit het bedrag.",
            "Omdat een bijdrage aan niemand gekoppeld is, is ze later niet terug te vinden om te verwijderen.",
          ],
        },
      ],
    },
    terminos: {
      title: "Gebruiksvoorwaarden | CalcularYa",
      description: "De rekenhulpen van CalcularYa geven een schatting met de geldende officiële gegevens. Ze zijn een hulpmiddel en geen vervanging van advies.",
      h1: "Gebruiksvoorwaarden",
      bajada: `Laatst bijgewerkt: ${actualizado}.`,
      bloques: [
        {
          titulo: "Waar de rekenhulpen voor zijn",
          parrafos: [
            "De uitkomsten zijn een schatting op basis van de geldende officiële gegevens. Ze dienen als indicatie.",
            "Ze vervangen niet de berekening van een werkgever, boekhouder of advocaat, en ook niet wat de officiële instantie zegt.",
          ],
        },
        {
          titulo: "Waar de gegevens vandaan komen",
          parrafos: [
            "Elke rekenhulp toont de officiële bron van zijn waarden en de datum waarop we die controleerden.",
            "We houden alles zo actueel mogelijk, maar een regel kan veranderen voordat we hem verwerken.",
          ],
        },
        {
          titulo: "Gebruik van de site",
          parrafos: ["De site is gratis. Gebruiken en links delen mag. De inhoud massaal kopiëren of zich als CalcularYa voordoen mag niet."],
        },
        {
          titulo: "Aansprakelijkheid",
          parrafos: ["We zijn niet aansprakelijk voor beslissingen die alleen op een uitkomst van deze site zijn gebaseerd. Laat de berekening bevestigen door de juiste persoon of instantie voordat er iets wordt getekend, betaald of geclaimd."],
        },
        { titulo: "Contact", parrafos: [`Ons e-mailadres is ${mail}.`] },
      ],
    },
  },
  usted: {
    contacto: {
      description: "Mail ons als een waarde verouderd is, een uitkomst niet klopt of u een rekenhulp of land mist.",
      bloques: [
        {
          parrafos: [
            "We horen het graag als een waarde verouderd is, een uitkomst anders is dan u verwachtte of er een rekenhulp of land ontbreekt.",
            "Gaat het om een waarde, vermeld dan het land en de pagina waar u die zag.",
            "Er antwoordt een echt mens. Dat kan een paar dagen duren.",
          ],
        },
      ],
    },
  },
});
