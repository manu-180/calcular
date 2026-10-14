import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Lening berekenen",
    title: tituloQueEntre(`Lening berekenen in ${ctx.nombrePais}`, "Lening berekenen"),
    description: "Bereken het maandbedrag van een lening, de totale rente en het volledige aflossingsschema. Zie ook hoeveel extra aflossen je oplevert.",
    intro: [
      "Voordat je een lening afsluit, zijn twee bedragen belangrijk: wat je elke maand betaalt en wat de lening je in totaal aan rente kost.",
      "Vul het bedrag, de rente per jaar en de looptijd in. Wil je elke maand iets extra aflossen? Vul dat ook in en zie hoeveel eerder je klaar bent.",
    ],
    comoSeCalcula: [
      "De rekenhulp gaat uit van een vast maandbedrag (annuïteit). Zo werken de meeste persoonlijke leningen, autoleningen en hypotheken.",
      "Rente per maand = rente per jaar ÷ 12.",
      "Maandbedrag = leenbedrag × maandrente ÷ (1 − (1 + maandrente) tot de macht min het aantal termijnen).",
      "Elke maand betaal je rente over wat je nog schuldig bent. De rest van het maandbedrag gaat van je schuld af.",
    ],
    ejemplo: [
      `Een lening van ${m(monto)} tegen 12% per jaar met een looptijd van 36 maanden heeft een maandbedrag van ${m(cuota36)}. In totaal betaal je ${m(interesesTotales(monto, 12, 36))} aan rente.`,
      `Spreid je het over 60 maanden, dan zakt het maandbedrag naar ${m(cuota60)}. De rente stijgt dan wel naar ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Hoe wordt het maandbedrag van een lening berekend?",
        respuesta:
          "Met de annuïteitenformule. Elk maandbedrag is even hoog, maar in het begin betaal je vooral rente en aan het eind vooral aflossing. Daarom daalt je schuld eerst langzaam.",
      },
      {
        pregunta: "Loont het om een lening eerder af te lossen?",
        respuesta:
          "Meestal wel, zolang er geen hoge boete op vervroegd aflossen staat. Extra geld gaat meteen van je schuld af en daarover betaal je geen rente meer. Hoe eerder, hoe meer je bespaart.",
      },
      {
        pregunta: "Is een langere looptijd beter?",
        respuesta: "Je maandbedrag is lager, maar je betaalt in totaal veel meer rente. Vergelijk beide bedragen voordat je kiest.",
      },
      {
        pregunta: "Waarom noemt de geldverstrekker een ander maandbedrag?",
        respuesta:
          "Geldverstrekkers rekenen soms verzekeringen, kosten of belastingen mee, of gebruiken een andere rente dan in de reclame. Vergelijk offertes op de totale kosten, niet alleen op de rente.",
      },
    ],
    glosario: [
      { termino: "Restschuld", definicion: "Het deel van de lening dat je nog niet hebt terugbetaald." },
      { termino: "Nominale rente", definicion: "De rente per jaar die je door 12 deelt om de rente per maand te krijgen." },
      { termino: "Aflossing", definicion: "Het deel van elk maandbedrag dat van je schuld af gaat." },
    ],
  };
};
