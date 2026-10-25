import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Regn ut lønnsøkningen din",
    title: tituloQueEntre(
      `Lønnsøkning: regn ut ny lønn og reallønnsvekst | ${ctx.nombrePais}`,
      `Lønnsøkning | ${ctx.nombrePais}`,
      "Lønnsøkning",
    ),
    description: "Regn ut ny lønn etter en lønnsøkning, forskjellen per måned og per år, og om du slår prisveksten med reallønnsveksten din.",
    intro: [
      "Du har fått et lønnstilbud eller skal snart i lønnssamtale. Fyll inn lønnen og lønnsøkningen, i prosent eller som beløp, og se hvor mye som endrer seg per måned og per år.",
      "Legg til prisveksten i perioden, så ser du om du faktisk får mer kjøpekraft eller bare holder tritt.",
    ],
    comoSeCalcula: [
      "Ny lønn = lønn i dag × (1 + lønnsøkning ÷ 100).",
      "Forskjell per år = forskjell per måned × antall lønnsutbetalinger per år.",
      "Reallønnsvekst = (1 + lønnsøkning) ÷ (1 + prisvekst) − 1.",
    ],
    ejemplo: [
      `En månedslønn på ${m(sueldo)} med 5 % lønnsøkning blir ${m(sueldo * 1.05)}. Det er ${m(sueldo * 0.05)} mer i måneden og ${m(sueldo * 0.05 * 12)} mer i året.`,
      `Var prisveksten 3 % i perioden, er reallønnsveksten ${p(aumentoReal(5, 3))}. Med 6 % prisvekst er den ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Hva er reallønnsvekst?",
        respuesta: "Det er lønnsøkningen etter prisvekst. Den viser om den nye lønnen rekker til mer eller mindre enn før.",
      },
      {
        pregunta: "Hvorfor kan jeg ikke bare trekke prisveksten fra lønnsøkningen?",
        respuesta: `Fordi prosentene ganges, de legges ikke sammen. Med 5 % lønnsøkning og 3 % prisvekst er reallønnsveksten ${p(aumentoReal(5, 3))}, ikke ${formatearCifra(ctx, 5 - 3)} %. Når prisveksten er høy, blir forskjellen mye større.`,
      },
      {
        pregunta: "Hvor stor lønnsøkning bør jeg be om?",
        respuesta: "Minst prisveksten siden forrige lønnsøkning, så du ikke sakker akterut. Utover det kan du ta utgangspunkt i hva andre arbeidsgivere betaler for lignende jobber, og hvordan rollen din har vokst.",
      },
    ],
    glosario: [
      { termino: "Nominell lønnsøkning", definicion: "Lønnsøkningen slik den står på lønnsslippen, før prisvekst." },
      { termino: "Kjøpekraft", definicion: "Hva lønnen din rekker til." },
    ],
  };
};
