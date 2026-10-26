import type { DiccionarioLegal } from "./tipos";

export const nb: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Om oss | CalcularYa",
      description: "CalcularYa lager kalkulatorer for jobb, penger og hverdag i hvert land, med tall fra offisielle kilder.",
      h1: "Om oss",
      bajada: "Kalkulatorer for hvert land, hver med sine egne offisielle tall.",
      bloques: [
        {
          parrafos: [
            "CalcularYa er et nettsted med kalkulatorer for hverdagens spørsmål: lønn, lån, skatt, datoer og mye mer.",
            "Nettstedet lages av Manuel Navarro, som også lager calcular.ar, et nettsted med kalkulatorer for Argentina.",
          ],
        },
        {
          titulo: "Slik jobber vi",
          parrafos: [
            "Når en beregning avhenger av en regel (en minstelønn, en avgiftssats, et tak), henter vi verdien fra landets offisielle kilde: lovsamlingen, departementet, sentralbanken eller skattemyndigheten.",
            "Vi lagrer lenken og datoen for kontrollen vår og viser dem ved hver kalkulator.",
            "Kan en verdi ikke bekreftes i den offisielle kilden, blir kalkulatoren som bruker den, ikke publisert.",
            "Når en regel endres, endres kalkulatoren også, og endringen havner i landets endringslogg.",
          ],
        },
        { titulo: "Kostnadsfritt", parrafos: ["Kalkulatorene er gratis og fungerer uten konto."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Send oss en e-post hvis en verdi er utdatert, et resultat ikke stemmer eller du savner en kalkulator eller et land.",
      h1: "Kontakt",
      bajada: `E-postadressen vår er ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Vi vil gjerne vite om en verdi er utdatert, et resultat er annerledes enn du ventet, eller om det mangler en kalkulator eller et land.",
            "Gjelder det en verdi, skriv hvilket land og hvilken side du så den på.",
            "Det er et ekte menneske som svarer. Det kan ta noen dager.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Personvern | CalcularYa",
      description: "Hvilke opplysninger CalcularYa bruker: det du skriver i en kalkulator, behandles i nettleseren, og vi lagrer det ikke.",
      h1: "Personvern",
      bajada: `Sist oppdatert: ${actualizado}.`,
      bloques: [
        {
          titulo: "Det du skriver i en kalkulator",
          parrafos: ["Beregningen skjer i nettleseren. Verdiene du skriver, sendes ikke til noen server, og vi lagrer dem ikke."],
        },
        {
          titulo: "Besøkets land",
          parrafos: [
            "For å foreslå kalkulatorene for riktig land ser vi hvilket land et besøk kommer fra. Leverandøren av nettstedet vårt utleder det fra IP-adressen.",
            "Vi lagrer ikke IP-adressen. Svaret blir i nettleseren så lenge besøket varer.",
          ],
        },
        {
          titulo: "Det nettleseren lagrer",
          parrafos: [
            "I nettleserens øktlagring, som tømmes når fanen lukkes, husker vi besøkets land, om meldingen med forslaget er lukket og, hvis du kom via en delt lenke, koden til lenken.",
            "I den lokale lagringen, som blir liggende til du sletter den i nettleseren, ligger landet du selv har valgt, et tilfeldig tall for å telle besøk og hvilken versjon av en designtest du ser, slik at nettstedet ser likt ut hver gang. Ingenting av dette sier hvem du er.",
            "Vi bruker ingen informasjonskapsler for reklame eller sporing.",
          ],
        },
        {
          titulo: "Drift av nettstedet",
          parrafos: ["Nettstedet driftes hos Vercel. Som alle servere registrerer de tekniske opplysninger om hvert besøk (IP-adresse og nettleser), slik at nettstedet fungerer og er sikkert."],
        },
        {
          titulo: "Slik teller vi besøk",
          parrafos: [
            "Vi måler bruken av nettstedet med vårt eget verktøy: hvilke sider som åpnes og hvor mye de brukes, hvilket nettsted besøket kommer fra, typen enhet og landet. Det tilfeldige tallet i nettleseren skiller et nytt besøk fra et som kommer tilbake. Vi lagrer ikke IP-adressen og ingenting av det du skriver i en kalkulator.",
            "Lenker som deles fra nettstedet, har en tilfeldig kode som er ny hver gang noe deles. Med den teller vi hvor mange besøk hver lenke gir. Koden identifiserer ingen.",
            "Beløp du skriver i en kalkulator, forlater aldri nettleseren i en lenke.",
          ],
        },
        {
          titulo: "Endringer og spørsmål",
          parrafos: [
            "Endres noe her (for eksempel hvis det kommer reklame), skriver vi det på denne siden før det trer i kraft.",
            `Har du spørsmål om personopplysninger, er e-postadressen vår ${mail}.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Vilkår for bruk | CalcularYa",
      description: "Kalkulatorene på CalcularYa gir et anslag med gjeldende offisielle tall. De er et verktøy og erstatter ikke rådgivning.",
      h1: "Vilkår for bruk",
      bajada: `Sist oppdatert: ${actualizado}.`,
      bloques: [
        {
          titulo: "Hva kalkulatorene er til",
          parrafos: [
            "Resultatene er et anslag basert på gjeldende offisielle tall. De er veiledende.",
            "De erstatter ikke beregningen fra en arbeidsgiver, regnskapsfører eller advokat, og heller ikke det ansvarlig myndighet sier.",
          ],
        },
        {
          titulo: "Hvor tallene kommer fra",
          parrafos: [
            "Hver kalkulator viser den offisielle kilden til verdiene sine og datoen da vi sjekket dem.",
            "Vi holder alt så oppdatert vi kan, men en regel kan endres før vi rekker å legge den inn.",
          ],
        },
        {
          titulo: "Bruk av nettstedet",
          parrafos: ["Nettstedet er gratis. Du kan bruke det og dele lenker. Du kan ikke kopiere innholdet i stor skala eller gi deg ut for å være CalcularYa."],
        },
        {
          titulo: "Ansvar",
          parrafos: ["Vi er ikke ansvarlige for beslutninger som bare bygger på et resultat fra dette nettstedet. La riktig person eller myndighet bekrefte beregningen før du skriver under, betaler eller krever noe."],
        },
        { titulo: "Kontakt", parrafos: [`E-postadressen vår er ${mail}.`] },
      ],
    },
  },
});
