import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Bolånekalkyl",
    title: tituloQueEntre(
      `Bolånekalkyl: räkna ut månadskostnad för bolån | ${ctx.nombrePais}`,
      `Bolånekalkyl | ${ctx.nombrePais}`,
      "Bolånekalkyl",
    ),
    description: "Räkna ut månadskostnaden för ditt bolån utifrån pris, kontantinsats, ränta och löptid. Se den totala räntan och hur skulden minskar år för år.",
    intro: [
      "Bolånet är den största skulden de flesta hushåll någonsin tar. Det lönar sig att se hela kalkylen innan du pratar med banken.",
      "Fyll i pris, kontantinsats, ränta och löptid. Betalar du månadsavgift eller driftkostnad, lägg till den så ser du din verkliga boendekostnad per månad.",
    ],
    comoSeCalcula: [
      "Lånebelopp = bostadens pris − kontantinsats.",
      "Månadskostnaden räknas som ett annuitetslån, med årsräntan delad med 12 och löptiden i månader.",
      "För varje år summeras betald ränta och amortering, och du ser hur mycket som är kvar att betala.",
    ],
    ejemplo: [
      `En bostad för ${m(precio)} med 20 % kontantinsats ger ett lån på ${m(prestado)}. Med 7 % ränta och 30 års löptid blir månadskostnaden ${m(cuota30)}.`,
      `På 30 år betalar du ${m(interesesTotales(prestado, 7, 360))} i ränta. Med 15 års löptid stiger månadskostnaden till ${m(cuota15)}, men räntan sjunker till ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Hur stor kontantinsats behöver jag?",
        respuesta:
          "Det beror på banken och på reglerna där du köper. Ju större kontantinsats, desto mindre lånar du, desto lägre blir månadskostnaden och desto mindre ränta betalar du. Spara också till kostnaderna vid köpet.",
      },
      {
        pregunta: "Varför minskar skulden så lite de första åren?",
        respuesta:
          "Räntan räknas på det du är skyldig. I början är skulden stor, så det mesta av varje betalning är ränta. Med tiden blir amorteringen den större delen.",
      },
      {
        pregunta: "Är en kortare löptid bättre?",
        respuesta:
          "Klarar du den högre månadskostnaden, ja. Du betalar betydligt mindre ränta. Annars fungerar en längre löptid med extra amortering när du har råd.",
      },
      {
        pregunta: "Räknar banken på samma sätt?",
        respuesta:
          "Inte alltid. Många banker använder rak amortering, där du amorterar lika mycket varje månad och räntekostnaden sjunker med tiden. Kalkylen här räknar med annuitet och samma ränta hela löptiden. Med rörlig ränta kan månadskostnaden ändras.",
      },
    ],
    glosario: [
      { termino: "Kontantinsats", definicion: "Den del av priset som du betalar med egna pengar." },
      { termino: "Amortering", definicion: "Den del av betalningen som minskar skulden." },
      { termino: "Annuitet", definicion: "Ett lån där varje månadsbetalning är lika stor, med ränta och amortering tillsammans." },
    ],
  };
};
