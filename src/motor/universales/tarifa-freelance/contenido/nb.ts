import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Beregn timeprisen din som frilanser",
    title: tituloQueEntre(
      `Beregn timepris som frilanser og konsulent | ${ctx.nombrePais}`,
      `Beregn timepris | ${ctx.nombrePais}`,
      "Beregn timepris",
    ),
    description: "Regn ut timepris og dagspris som frilanser ut fra hva du vil tjene, kostnadene dine, skatt, fridager og fakturerbare timer.",
    intro: [
      "Den vanligste feilen som frilanser er å ta lønnen du ville hatt som ansatt og dele den på 160 timer. Da glemmer du skatt, kostnader, ferie og alle timene som ikke kan faktureres.",
      "Kalkulatoren tar utgangspunkt i hva du vil sitte igjen med, og viser hva du må ta betalt for å komme dit.",
    ],
    comoSeCalcula: [
      "Nødvendig fakturering = det du vil sitte igjen med ÷ (1 − skattesats) + kostnader i firmaet.",
      "Arbeidsdager = 52 uker × arbeidsdager per uke − fridager.",
      "Fakturerbare timer per år = arbeidsdager × fakturerbare timer per dag.",
      "Timepris = nødvendig fakturering ÷ fakturerbare timer per år.",
    ],
    ejemplo: [
      `For å sitte igjen med ${m(ingreso)} i året, med ${m(gastos)} i kostnader og 25 % skatt, må du fakturere ${m(r.facturado)}.`,
      `Med 30 fridager og 25 fakturerbare timer i uken blir det ${formatearNumero(ctx, r.horas)} timer i året. Det tilsvarer en timepris på ${m(r.hora)} eller en dagspris på ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Hvor mange timer i uken kan jeg fakturere?",
        respuesta: "Færre enn du jobber. Kundejakt, e-post, fakturering og etterutdanning tar tid som ingen betaler for. 20 til 30 fakturerbare timer av 40 er vanlig.",
      },
      {
        pregunta: "Bør jeg ta betalt per time eller per oppdrag?",
        respuesta: "Begge deler fungerer. Selv om du setter fast pris på et oppdrag, kan du anslå timene og gange med denne timeprisen, så du ikke går med tap.",
      },
      {
        pregunta: "Hvilken skattesats bør jeg bruke?",
        respuesta: "Det avhenger av land og selskapsform. Regn med både inntektsskatt og trygdeavgift eller andre sosiale avgifter. Er du usikker, spør en regnskapsfører.",
      },
    ],
    glosario: [
      { termino: "Fakturerbare timer", definicion: "Arbeidstimer som en kunde betaler deg for." },
      { termino: "Det du sitter igjen med", definicion: "Det som er igjen etter skatt og kostnader i firmaet." },
    ],
  };
};
