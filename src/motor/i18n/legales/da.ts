import type { DiccionarioLegal } from "./tipos";

export const da: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Om os | CalcularYa",
      description: "CalcularYa laver beregnere til job, penge og hverdag i hvert land, med tal fra officielle kilder.",
      h1: "Om os",
      bajada: "Beregnere for hvert land, hver med sine egne officielle tal.",
      bloques: [
        {
          parrafos: [
            "CalcularYa er et website med beregnere til hverdagens spørgsmål: løn, lån, skat, datoer og meget mere.",
            "Sitet laves af Manuel Navarro, som også laver calcular.ar, et website med beregnere til Argentina.",
          ],
        },
        {
          titulo: "Sådan arbejder vi",
          parrafos: [
            "Når en beregning afhænger af en regel (en mindsteløn, en bidragssats, et loft), henter vi værdien fra landets officielle kilde: lovtidende, ministeriet, centralbanken eller skattemyndigheden.",
            "Vi gemmer linket og datoen for vores kontrol og viser dem ved hver beregner.",
            "Kan en værdi ikke bekræftes i den officielle kilde, bliver beregneren, der bruger den, ikke offentliggjort.",
            "Når en regel ændres, ændres beregneren også, og ændringen kommer i landets ændringslog.",
          ],
        },
        { titulo: "Uden beregning", parrafos: ["Beregnerne er gratis og virker uden konto."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Skriv til os, hvis en værdi er forældet, et resultat ikke passer, eller hvis du mangler en beregner eller et land.",
      h1: "Kontakt",
      bajada: `Vores e-mailadresse er ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Vi vil gerne høre, hvis en værdi er forældet, et resultat er anderledes end forventet, eller hvis der mangler en beregner eller et land.",
            "Handler det om en værdi, så skriv landet og den side, hvor du så den.",
            "Det er et rigtigt menneske, der svarer. Det kan tage et par dage.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privatliv | CalcularYa",
      description: "Hvilke oplysninger CalcularYa bruger: det, du skriver i en beregner, behandles i browseren, og vi gemmer det ikke.",
      h1: "Privatliv",
      bajada: `Senest opdateret: ${actualizado}.`,
      bloques: [
        {
          titulo: "Det, du skriver i en beregner",
          parrafos: ["Beregningen sker i browseren. De værdier, du skriver, sendes ikke til nogen server, og vi gemmer dem ikke."],
        },
        {
          titulo: "Besøgets land",
          parrafos: [
            "For at foreslå det rigtige lands beregnere ser vi, hvilket land et besøg kommer fra. Vores hostingudbyder udleder det af IP-adressen.",
            "Vi gemmer ikke IP-adressen. Svaret bliver i browseren, så længe besøget varer.",
          ],
        },
        {
          titulo: "Det, browseren gemmer",
          parrafos: [
            "I browserens sessionslager, som tømmes, når fanen lukkes, husker vi besøgets land, om beskeden med forslaget er lukket, og, hvis du kom via et delt link, linkets kode.",
            "I det lokale lager, som bliver, til du sletter det i browseren, ligger det land, du selv har valgt, et tilfældigt tal til at tælle besøg og den version af en designtest, du ser, så sitet ser ens ud hver gang. Intet af det siger, hvem du er.",
            "Vi bruger ingen cookies til annoncer eller sporing.",
          ],
        },
        {
          titulo: "Webhotel",
          parrafos: ["Sitet ligger hos Vercel. Som alle servere registrerer de tekniske oplysninger om hvert besøg (IP-adresse og browser), så sitet virker og er sikkert."],
        },
        {
          titulo: "Sådan tæller vi besøg",
          parrafos: [
            "Vi måler brugen af sitet med vores eget værktøj: hvilke sider der åbnes, og hvor meget de bruges, hvilket site besøget kommer fra, typen af enhed og landet. Det tilfældige tal i browseren skelner et nyt besøg fra et, der vender tilbage. Vi gemmer ikke IP-adressen og intet af det, du skriver i en beregner.",
            "Links, der deles fra sitet, har en tilfældig kode, som er ny, hver gang noget deles. Med den tæller vi, hvor mange besøg hvert link giver. Koden identificerer ingen.",
            "Beløb, du skriver i en beregner, forlader aldrig browseren i et link.",
          ],
        },
        {
          titulo: "Ændringer og spørgsmål",
          parrafos: [
            "Ændrer noget sig her (for eksempel hvis der kommer annoncer), skriver vi det på denne side, før det træder i kraft.",
            `Har du spørgsmål om personoplysninger, er vores e-mailadresse ${mail}.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Vilkår for brug | CalcularYa",
      description: "CalcularYas beregnere giver et skøn med de gældende officielle tal. De er et værktøj og erstatter ikke rådgivning.",
      h1: "Vilkår for brug",
      bajada: `Senest opdateret: ${actualizado}.`,
      bloques: [
        {
          titulo: "Hvad beregnerne er til",
          parrafos: [
            "Resultaterne er et skøn ud fra de gældende officielle tal. De er vejledende.",
            "De erstatter ikke beregningen fra en arbejdsgiver, revisor eller advokat, og heller ikke det, den ansvarlige myndighed siger.",
          ],
        },
        {
          titulo: "Hvor tallene kommer fra",
          parrafos: [
            "Hver beregner viser den officielle kilde til sine værdier og datoen, hvor vi tjekkede dem.",
            "Vi holder alt så opdateret som muligt, men en regel kan ændre sig, før vi når at lægge den ind.",
          ],
        },
        {
          titulo: "Brug af sitet",
          parrafos: ["Sitet er gratis. Du må bruge det og dele links. Du må ikke kopiere indholdet i stort omfang eller udgive dig for at være CalcularYa."],
        },
        {
          titulo: "Ansvar",
          parrafos: ["Vi er ikke ansvarlige for beslutninger, der alene bygger på et resultat fra dette site. Få den rette person eller myndighed til at bekræfte beregningen, før du skriver under, betaler eller kræver noget."],
        },
        { titulo: "Kontakt", parrafos: [`Vores e-mailadresse er ${mail}.`] },
      ],
    },
  },
});
