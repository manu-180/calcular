import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Betal ned kredittkortgjelden",
    title: tituloQueEntre(
      `Nedbetale kredittkort: regn ut tid og renter | ${ctx.nombrePais}`,
      `Nedbetale kredittkort | ${ctx.nombrePais}`,
      "Nedbetale kredittkort",
    ),
    description: "Regn ut hvor mange måneder det tar å betale ned kredittkortet, og hvor mye du betaler i renter, med et fast beløp eller med minstebeløpet.",
    intro: [
      "Kredittkortet er som regel den dyreste gjelden du har. Betaler du bare minstebeløpet, drar det ut i flere år, og rentene vokser.",
      "Fyll inn gjelden, renten per år og hvor mye du kan betale hver måned. Du ser når du er ferdig, hvor mye du betaler i renter og planen måned for måned.",
    ],
    comoSeCalcula: [
      "Hver måned legges renten til: gjeld × rente per år ÷ 12.",
      "Deretter trekkes innbetalingen fra. Med minstebeløp er innbetalingen en prosentandel av det du skylder, med en nedre grense.",
      "Det gjentas til gjelden er null. Er innbetalingen ikke større enn renten, går gjelden aldri ned.",
    ],
    ejemplo: [
      `En gjeld på ${m(saldo)} med 22 % rente per år, der du betaler ${m(fijo)} i måneden, er nedbetalt etter ${formatearCifra(ctx, conFijo.meses, 0)} måneder og koster ${m(conFijo.intereses)} i renter.`,
      `Betaler du bare et minstebeløp på 3 %, tar det ${formatearCifra(ctx, conMinimo.meses, 0)} måneder, og rentene øker til ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Hva skjer hvis jeg bare betaler minstebeløpet?",
        respuesta:
          "Minstebeløpet går ned når gjelden går ned, så du betaler mindre hver måned, og gjelden blir hengende i årevis. Betal heller et høyere fast beløp hvis du kan, selv om det bare er litt mer.",
      },
      {
        pregunta: "Bør jeg refinansiere gjelden med et forbrukslån?",
        respuesta: "Er renten på lånet klart lavere enn renten på kortet, lønner det seg som regel. Sammenlign effektiv rente og totale renter for begge alternativene, med gebyrer.",
      },
      {
        pregunta: "Hvilket kort skal jeg betale ned først?",
        respuesta: "Betal minstebeløpet på alle, og legg resten på kortet med høyest rente. Da betaler du minst renter totalt.",
      },
    ],
    glosario: [
      { termino: "Minstebeløp", definicion: "Det minste du kan betale en måned uten purregebyr. Det betaler ikke ned gjelden." },
      { termino: "Nominell rente per år", definicion: "Renten per år som kortet krever på gjelden du har igjen." },
    ],
  };
};
