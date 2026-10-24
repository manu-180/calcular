import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const vinner = (a: { comprar: number; alquilar: number }, anios: string) =>
    `${a.comprar >= a.alquilar ? "lønner det seg mest å kjøpe" : "lønner det seg mest å leie"}, med ${m(Math.abs(a.comprar - a.alquilar))} i forskjell etter ${anios} år`;
  return {
    h1: "Leie eller kjøpe bolig",
    title: tituloQueEntre(
      `Leie eller kjøpe: regn ut hva som lønner seg | ${ctx.nombrePais}`,
      `Leie eller kjøpe | ${ctx.nombrePais}`,
      "Leie eller kjøpe",
    ),
    description: "Sammenlign å leie med å kjøpe bolig over så mange år du vil. Se hvilket alternativ som gir mest til slutt, fra hvilket år og med hvor mye.",
    intro: [
      "Det holder ikke å sammenligne terminbeløpet på lånet med husleien. Den som kjøper, betaler renter, vedlikehold og skatt, men eier boligen til slutt. Den som leier, kan la egenkapitalen vokse.",
      "Kalkulatoren legger sammen alt år for år og viser hvilket alternativ som gir deg størst formue.",
    ],
    comoSeCalcula: [
      "Kjøpe: hver måned betaler du lånet og eierkostnadene. Formuen din er boligens verdi minus restgjelden på lånet.",
      "Leie: egenkapitalen og kostnadene ved kjøpet investeres i stedet med den andre avkastningen, og husleien øker hvert år.",
      "Hver måned investerer den med lavest kostnader forskjellen, slik at begge alternativene har samme budsjett.",
      "Det beste alternativet er det som gir størst formue til slutt.",
    ],
    ejemplo: [
      `En bolig til ${m(precio)} med 20 % egenkapital og et boliglån med 7 % rente og 25 års nedbetalingstid, sammenlignet med en husleie på ${m(alquiler)} i måneden.`,
      `Over 10 år ${vinner(a10, "10")}. Over 3 år ${vinner(a3, "3")}.`,
    ],
    faq: [
      {
        pregunta: "Er det å kaste bort penger å leie?",
        respuesta:
          "Ikke helt. Den som kjøper, har også kostnader som aldri kommer tilbake, som renter, skatt og vedlikehold. Det som teller, er hvor mye du eier til slutt i hvert tilfelle.",
      },
      {
        pregunta: "Hvorfor endrer svaret seg med antall år?",
        respuesta:
          "Et kjøp har store kostnader i starten (kostnadene ved kjøpet og mye renter de første årene), og det tar tid å tjene dem inn. Regner du med å flytte snart, lønner det seg som regel mer å leie.",
      },
      {
        pregunta: "Hvilket tall betyr mest?",
        respuesta:
          "Forholdet mellom kjøpesum og husleie, renten på boliglånet og hvor raskt boligprisene stiger. Prøv å endre prisveksten og avkastningen, så ser du hvor mye svaret flytter seg.",
      },
    ],
    glosario: [
      { termino: "Formue", definicion: "Det du eier, minus det du skylder." },
      { termino: "Prisvekst", definicion: "Hvor mye boligens verdi øker hvert år." },
      { termino: "Alternativkostnad", definicion: "Det egenkapitalen ville gitt hvis du hadde investert den i stedet." },
    ],
  };
};
