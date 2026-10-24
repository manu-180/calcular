import type { DiccionarioLegal } from "./tipos";

export const sv: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Om oss | CalcularYa",
      description: "CalcularYa gör kalkylatorer för jobb, pengar och vardag i varje land, med uppgifter från officiella källor.",
      h1: "Om oss",
      bajada: "Kalkylatorer för varje land, var och en med sina egna officiella uppgifter.",
      bloques: [
        {
          parrafos: [
            "CalcularYa är en webbplats med kalkylatorer för vardagens frågor: lön, lån, skatter, datum och mycket mer.",
            "Webbplatsen görs av Manuel Navarro, som också gör calcular.ar, en webbplats med kalkylatorer för Argentina.",
          ],
        },
        {
          titulo: "Så arbetar vi",
          parrafos: [
            "När en beräkning beror på en regel (en minimilön, en avgiftssats, ett tak) hämtar vi värdet från landets officiella källa: författningssamlingen, departementet, centralbanken eller skattemyndigheten.",
            "Vi sparar länken och datumet för vår kontroll och visar dem vid varje kalkylator.",
            "Om ett värde inte kan bekräftas i den officiella källan publiceras inte kalkylatorn som använder det.",
            "När en regel ändras ändras kalkylatorn också, och ändringen hamnar i landets ändringslogg.",
          ],
        },
        { titulo: "Kostnadsfritt", parrafos: ["Kalkylatorerna är gratis och fungerar utan konto."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Mejla oss om ett värde är inaktuellt, ett resultat inte stämmer eller om du saknar en kalkylator eller ett land.",
      h1: "Kontakt",
      bajada: `Vår e-postadress är ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Vi vill gärna veta om ett värde är inaktuellt, ett resultat skiljer sig från vad du väntade dig eller om det saknas en kalkylator eller ett land.",
            "Gäller det ett värde, skriv vilket land och vilken sida du såg det på.",
            "Det är en riktig människa som svarar. Det kan ta några dagar.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Integritet | CalcularYa",
      description: "Vilka uppgifter CalcularYa använder: det du skriver i en kalkylator behandlas i webbläsaren och sparas inte av oss.",
      h1: "Integritet",
      bajada: `Senast uppdaterad: ${actualizado}.`,
      bloques: [
        {
          titulo: "Det du skriver i en kalkylator",
          parrafos: ["Beräkningen sker i webbläsaren. Värdena du skriver skickas inte till någon server och vi sparar dem inte."],
        },
        {
          titulo: "Besökets land",
          parrafos: [
            "För att föreslå rätt lands kalkylatorer tittar vi på vilket land ett besök kommer från. Vår webbhotelleverantör räknar ut det från IP-adressen.",
            "Vi sparar inte IP-adressen. Svaret stannar i webbläsaren så länge besöket varar.",
          ],
        },
        {
          titulo: "Det webbläsaren sparar",
          parrafos: [
            "I webbläsarens sessionslagring, som töms när fliken stängs, kommer vi ihåg besökets land, om meddelandet med förslaget har stängts och, om du kom via en delad länk, länkens kod.",
            "I den lokala lagringen, som finns kvar tills du rensar den i webbläsaren, ligger landet du själv valt, ett slumptal för att räkna besök och vilken version av ett designtest du ser, så att webbplatsen ser likadan ut varje gång. Inget av det säger vem du är.",
            "Vi använder inga kakor för annonser eller spårning.",
          ],
        },
        {
          titulo: "Webbhotell",
          parrafos: ["Webbplatsen ligger hos Vercel. Som alla servrar registrerar de tekniska uppgifter om varje besök (IP-adress och webbläsare) för att webbplatsen ska fungera och vara säker."],
        },
        {
          titulo: "Så räknar vi besök",
          parrafos: [
            "Vi mäter hur webbplatsen används med ett eget verktyg: vilka sidor som öppnas och hur mycket de används, vilken webbplats besöket kommer från, typ av enhet och land. Slumptalet i webbläsaren skiljer ett nytt besök från ett återkommande. Vi sparar inte IP-adressen och inget av det du skriver i en kalkylator.",
            "Länkar som delas från webbplatsen har en slumpkod som är ny varje gång något delas. Med den räknar vi hur många besök varje länk ger. Koden identifierar ingen.",
            "Belopp du skriver i en kalkylator lämnar aldrig webbläsaren i en länk.",
          ],
        },
        {
          titulo: "Ändringar och frågor",
          parrafos: [
            "Om något här ändras (till exempel om det kommer annonser) skriver vi det på den här sidan innan det börjar gälla.",
            `För frågor om personuppgifter är vår e-postadress ${mail}.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Användarvillkor | CalcularYa",
      description: "CalcularYas kalkylatorer ger en uppskattning med gällande officiella uppgifter. De är ett verktyg och ersätter inte rådgivning.",
      h1: "Användarvillkor",
      bajada: `Senast uppdaterad: ${actualizado}.`,
      bloques: [
        {
          titulo: "Vad kalkylatorerna är till för",
          parrafos: [
            "Resultaten är en uppskattning utifrån gällande officiella uppgifter. De är vägledande.",
            "De ersätter inte beräkningen från en arbetsgivare, revisor eller advokat, och inte heller besked från den ansvariga myndigheten.",
          ],
        },
        {
          titulo: "Var uppgifterna kommer ifrån",
          parrafos: [
            "Varje kalkylator visar den officiella källan till sina värden och datumet då vi kontrollerade dem.",
            "Vi håller allt så aktuellt vi kan, men en regel kan ändras innan vi hinner lägga in den.",
          ],
        },
        {
          titulo: "Användning av webbplatsen",
          parrafos: ["Webbplatsen är gratis. Du får använda den och dela länkar. Du får inte kopiera innehållet i stor skala eller utge dig för att vara CalcularYa."],
        },
        {
          titulo: "Ansvar",
          parrafos: ["Vi ansvarar inte för beslut som bara bygger på ett resultat från den här webbplatsen. Låt rätt person eller myndighet bekräfta beräkningen innan du skriver under, betalar eller kräver något."],
        },
        { titulo: "Kontakt", parrafos: [`Vår e-postadress är ${mail}.`] },
      ],
    },
  },
});
