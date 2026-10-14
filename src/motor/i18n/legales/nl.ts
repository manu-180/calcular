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
            "We bewaren het IP-adres en het land niet. Het antwoord blijft in de browser zolang het bezoek duurt.",
          ],
        },
        {
          titulo: "Wat de browser bewaart",
          parrafos: [
            "Via de sessieopslag van de browser onthouden we het gekozen land en of de melding met dat voorstel gesloten is. Alles wordt gewist bij het sluiten van het tabblad.",
            "We gebruiken geen advertentie- of trackingcookies.",
          ],
        },
        {
          titulo: "Hosting",
          parrafos: ["De site wordt gehost bij Vercel. Zoals elke server legt die technische gegevens van elk bezoek vast (IP-adres en browser), zodat de site werkt en veilig blijft."],
        },
        {
          titulo: "Wijzigingen en vragen",
          parrafos: [
            "Verandert hier iets aan (bijvoorbeeld als er advertenties bijkomen), dan melden we dat op deze pagina voordat het ingaat.",
            `Voor vragen over persoonsgegevens is ons e-mailadres ${mail}.`,
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
          parrafos: ["De site is gratis. Gebruiken en links delen mag. De inhoud massaal kopiëren of je voordoen als CalcularYa mag niet."],
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
