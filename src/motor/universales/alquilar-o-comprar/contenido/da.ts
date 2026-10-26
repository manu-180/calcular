import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const vinder = (a: { comprar: number; alquilar: number }, anios: string) =>
    `${a.comprar >= a.alquilar ? "betaler det sig bedst at købe" : "betaler det sig bedst at leje"}, med ${m(Math.abs(a.comprar - a.alquilar))} i forskel efter ${anios} år`;
  return {
    h1: "Leje eller købe bolig",
    title: tituloQueEntre(
      `Leje eller købe: regn ud, hvad der betaler sig | ${ctx.nombrePais}`,
      `Leje eller købe | ${ctx.nombrePais}`,
      "Leje eller købe",
    ),
    description: "Sammenlign at leje med at købe bolig over de år, du vælger. Se, hvilken mulighed der giver mest til sidst, fra hvilket år og med hvor meget.",
    intro: [
      "Det er ikke nok at sammenligne ydelsen på lånet med huslejen. Den, der køber, betaler renter, vedligeholdelse og skat, men ejer til sidst boligen. Den, der lejer, kan lade udbetalingen vokse.",
      "Beregneren lægger det hele sammen år for år og viser, hvilken mulighed der efterlader dig med den største formue.",
    ],
    comoSeCalcula: [
      "Købe: hver måned betaler du lånet og ejerudgifterne. Din formue er boligens værdi minus restgælden på lånet.",
      "Leje: udbetalingen og omkostningerne ved købet investeres i stedet med det andet afkast, og huslejen stiger hvert år.",
      "Hver måned investerer den med de laveste udgifter forskellen, så begge muligheder tager udgangspunkt i samme budget.",
      "Den bedste mulighed er den, der giver den største formue til sidst.",
    ],
    ejemplo: [
      `En bolig til ${m(precio)} med 20 % i udbetaling og et boliglån med 7 % i rente og 25 års løbetid, sammenlignet med en husleje på ${m(alquiler)} om måneden.`,
      `Over 10 år ${vinder(a10, "10")}. Over 3 år ${vinder(a3, "3")}.`,
    ],
    faq: [
      {
        pregunta: "Er det at smide penge ud at leje?",
        respuesta:
          "Ikke helt. Den, der køber, har også udgifter, der aldrig kommer igen, som renter, skat og vedligeholdelse. Det, der tæller, er, hvor meget du ejer til sidst i hvert tilfælde.",
      },
      {
        pregunta: "Hvorfor ændrer svaret sig med antallet af år?",
        respuesta:
          "Et køb har store udgifter i starten (omkostninger ved købet og mange renter de første år), som tager tid at tjene ind. Regner du med at flytte snart, betaler det sig som regel bedre at leje.",
      },
      {
        pregunta: "Hvilket tal betyder mest?",
        respuesta:
          "Forholdet mellem pris og husleje, renten på boliglånet og hvor hurtigt boligpriserne stiger. Prøv at ændre prisstigningen og afkastet, så ser du, hvor meget svaret flytter sig.",
      },
    ],
    glosario: [
      { termino: "Formue", definicion: "Det, du ejer, minus det, du skylder." },
      { termino: "Prisstigning", definicion: "Hvor meget boligens værdi stiger hvert år." },
      { termino: "Alternativomkostning", definicion: "Det, udbetalingen havde givet, hvis du havde investeret den i stedet." },
    ],
  };
};
