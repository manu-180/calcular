import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Låneberegner",
    title: tituloQueEntre(
      `Låneberegner: beregn ydelse og renter | ${ctx.nombrePais}`,
      `Låneberegner | ${ctx.nombrePais}`,
      "Låneberegner",
    ),
    description: "Beregn den månedlige ydelse på et lån, de samlede renter og hele afdragsplanen. Se, hvor meget ekstra afdrag sparer dig.",
    intro: [
      "Før du optager et lån, er to tal vigtige. Hvad du betaler hver måned, og hvad lånet koster dig i renter.",
      "Skriv beløb, årlig rente og løbetid. Vil du betale lidt ekstra hver måned, så skriv det også, så ser du, hvor meget før du er færdig.",
    ],
    comoSeCalcula: [
      "Beregningen bruger et annuitetslån, altså samme ydelse hver måned. Det er almindeligt for forbrugslån, billån og boliglån.",
      "Månedlig rente = årlig rente ÷ 12.",
      "Ydelse = beløb × månedlig rente ÷ (1 − (1 + månedlig rente) opløftet i minus antal betalinger).",
      "Hver måned regnes renten af restgælden. Resten af ydelsen er afdrag og nedbringer gælden.",
    ],
    ejemplo: [
      `Et lån på ${m(monto)} med 12 % i årlig rente og 36 måneders løbetid koster ${m(cuota36)} om måneden. I alt betaler du ${m(interesesTotales(monto, 12, 36))} i renter.`,
      `Forlænger du løbetiden til 60 måneder, falder ydelsen til ${m(cuota60)}, men renterne stiger til ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan beregnes ydelsen på et lån?",
        respuesta:
          "Med annuitetsformlen. Alle ydelser er lige store, men i starten er de mest renter og mod slutningen mest afdrag. Derfor falder gælden langsomt i begyndelsen.",
      },
      {
        pregunta: "Kan det betale sig at indfri lånet før tid?",
        respuesta:
          "Som regel ja, så længe gebyret for at indfri før tid ikke er højt. Ekstra penge går direkte til gælden, og den del koster ikke længere renter. Jo før du betaler, jo mere sparer du.",
      },
      {
        pregunta: "Er en længere løbetid bedre?",
        respuesta: "Ydelsen bliver lavere, men du betaler en del flere renter i alt. Sammenlign begge tal, før du beslutter dig.",
      },
      {
        pregunta: "Hvorfor regner banken en anden ydelse ud?",
        respuesta:
          "Långivere lægger ofte gebyrer, forsikringer eller afgifter oven i, eller bruger en anden rente end den annoncerede. Sammenlign tilbud på ÅOP og de samlede omkostninger, ikke kun på den nominelle rente.",
      },
    ],
    glosario: [
      { termino: "Restgæld", definicion: "Den del af lånet, du endnu ikke har betalt tilbage." },
      { termino: "Nominel rente", definicion: "Den årlige rente, der deles med 12 for at finde renten for hver måned." },
      { termino: "Afdrag", definicion: "Den del af ydelsen, der nedbringer gælden." },
      { termino: "ÅOP", definicion: "Årlige omkostninger i procent. Renter og gebyrer samlet i én procentsats, så tilbud kan sammenlignes." },
    ],
  };
};
