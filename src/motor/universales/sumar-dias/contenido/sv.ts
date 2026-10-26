import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Lägg till dagar till ett datum",
    title: tituloQueEntre(
      `Lägg till dagar: räkna datum framåt eller bakåt | ${ctx.nombrePais}`,
      `Lägg till dagar till ett datum | ${ctx.nombrePais}`,
      "Lägg till dagar till ett datum",
    ),
    description: "Lägg till eller dra av kalenderdagar eller vardagar från ett datum och se vilken dag det blir. Praktiskt för tidsfrister och förfallodagar.",
    intro: [
      "Välj ett datum, ett antal dagar och om du vill lägga till eller dra av. Du ser det nya datumet och veckodagen.",
      "Med vardagar hoppar kalkylatorn över lördagar och söndagar.",
    ],
    comoSeCalcula: [
      "Med kalenderdagar flyttas datumet en dag i kalendern för varje dag du fyller i.",
      "Med vardagar räknas bara måndag till fredag. Själva startdatumet räknas inte.",
      "Helgdagar dras inte av, eftersom de skiljer sig mellan länder och regioner.",
    ],
    ejemplo: [
      `Om du lägger till 90 kalenderdagar till ${f(inicio)} blir det ${f(mas90)}.`,
      `Om du lägger till 15 vardagar till ${f(inicio)} blir det ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Räknas startdatumet som dag ett?",
        respuesta: "Nej. Lägger du till 1 dag på en måndag blir det tisdag. Så räknas de flesta tidsfrister.",
      },
      {
        pregunta: "Vad händer om jag lägger till vardagar från en lördag?",
        respuesta: "Den första vardagen är måndagen efter. Lägger du till 1 vardag på en lördag blir det måndag.",
      },
      {
        pregunta: "Räknar kalkylatorn med skottår?",
        respuesta: "Ja. Går perioden över den 29 februari räknas den som en dag till.",
      },
    ],
    glosario: [
      { termino: "Kalenderdagar", definicion: "Alla dagar i kalendern, utan att någon hoppas över." },
      { termino: "Vardagar", definicion: "I den här kalkylatorn måndag till fredag." },
    ],
  };
};
