import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Afbetal din kreditkortgæld",
    title: tituloQueEntre(
      `Afbetal kreditkortgæld: beregn tid og renter | ${ctx.nombrePais}`,
      `Afbetal kreditkortgæld | ${ctx.nombrePais}`,
      "Afbetal kreditkortgæld",
    ),
    description: "Beregn, hvor mange måneder det tager at betale kreditkortet af, og hvor mange renter du betaler, med et fast beløb eller minimumsbetaling.",
    intro: [
      "Kreditkortet er som regel den dyreste gæld, du har. Betaler du kun minimumsbetalingen, trækker det ud i flere år, og renterne vokser.",
      "Skriv gælden, den årlige rente, og hvor meget du kan betale hver måned. Du ser, hvornår du er færdig, hvor mange renter du betaler, og planen måned for måned.",
    ],
    comoSeCalcula: [
      "Hver måned lægges renten til: gæld × årlig rente ÷ 12.",
      "Derefter trækkes betalingen fra. Med minimumsbetaling er betalingen en procentdel af det, du skylder, med en nedre grænse.",
      "Det gentages, til gælden er nul. Er betalingen ikke større end renten, falder gælden aldrig.",
    ],
    ejemplo: [
      `En gæld på ${m(saldo)} med 22 % i årlig rente, hvor du betaler ${m(fijo)} om måneden, er betalt efter ${formatearCifra(ctx, conFijo.meses, 0)} måneder og koster ${m(conFijo.intereses)} i renter.`,
      `Betaler du kun en minimumsbetaling på 3 %, tager det ${formatearCifra(ctx, conMinimo.meses, 0)} måneder, og renterne stiger til ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Hvad sker der, hvis jeg kun betaler minimumsbetalingen?",
        respuesta:
          "Minimumsbetalingen falder, når gælden falder, så du betaler mindre hver måned, og gælden hænger ved i årevis. Betal hellere et højere fast beløb, hvis du kan, også selvom det kun er lidt mere.",
      },
      {
        pregunta: "Skal jeg flytte gælden over i et forbrugslån?",
        respuesta: "Er renten på lånet tydeligt lavere end kortets rente, betaler det sig som regel. Sammenlign ÅOP og de samlede renter for begge muligheder, gebyrer medregnet.",
      },
      {
        pregunta: "Hvilket kort skal jeg betale af først?",
        respuesta: "Betal minimumsbetalingen på dem alle, og læg resten på kortet med den højeste rente. Så betaler du færrest renter i alt.",
      },
    ],
    glosario: [
      { termino: "Minimumsbetaling", definicion: "Det mindste, du kan betale en måned uden rykkergebyr. Det betaler ikke gælden af." },
      { termino: "Nominel årlig rente", definicion: "Den rente om året, som kortet opkræver af den gæld, du har tilbage." },
    ],
  };
};
