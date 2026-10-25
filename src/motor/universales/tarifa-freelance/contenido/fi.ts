import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Tuntihintalaskuri freelancerille ja yrittäjälle",
    title: tituloQueEntre(
      `Tuntihintalaskuri: laske tuntihinta freelancerina | ${ctx.nombrePais}`,
      `Tuntihintalaskuri freelancerille | ${ctx.nombrePais}`,
      `Tuntihintalaskuri | ${ctx.nombrePais}`,
      "Tuntihintalaskuri",
    ),
    description: "Laske tuntihintasi ja päivähintasi freelancerina sen perusteella, mitä haluat ansaita, sekä kulujen, verojen, lomien ja laskutettavien tuntien mukaan.",
    intro: [
      "Freelancerin yleisin virhe on ottaa palkka, jonka haluaisi työsuhteessa, ja jakaa se 160 tunnilla. Silloin unohtuvat verot, kulut, lomat ja kaikki tunnit, joita ei voi laskuttaa.",
      "Tämä laskuri lähtee siitä, mitä haluat jäävän käteen, ja näyttää, mitä sinun pitää laskuttaa päästäksesi siihen.",
    ],
    comoSeCalcula: [
      "Tarvittava laskutus = käteen jäävä summa ÷ (1 − veroprosentti) + yritystoiminnan kulut.",
      "Työpäivät = 52 viikkoa × työpäivät viikossa − vapaapäivät.",
      "Laskutettavat tunnit vuodessa = työpäivät × laskutettavat tunnit päivässä.",
      "Tuntihinta = tarvittava laskutus ÷ laskutettavat tunnit vuodessa.",
    ],
    ejemplo: [
      `Jotta käteen jää ${m(ingreso)} vuodessa, kun kulut ovat ${m(gastos)} ja verot 25 %, sinun pitää laskuttaa ${m(r.facturado)}.`,
      `Kun vapaapäiviä on 30 ja laskutettavia tunteja 25 viikossa, vuodessa on ${formatearNumero(ctx, r.horas)} laskutettavaa tuntia. Tuntihinnaksi tulee ${m(r.hora)} ja päivähinnaksi ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Montako tuntia viikossa voin laskuttaa?",
        respuesta: "Vähemmän kuin teet töitä. Asiakashankinta, sähköpostit, laskutus ja kouluttautuminen vievät aikaa, josta kukaan ei maksa. Tavallista on 20 tai 30 laskutettavaa tuntia 40:stä.",
      },
      {
        pregunta: "Laskutanko tuntihinnalla vai urakkahinnalla?",
        respuesta: "Molemmat toimivat. Vaikka sopisit kiinteän hinnan koko työstä, arvioi siihen menevät tunnit ja kerro ne tällä tuntihinnalla, niin et tee työtä tappiolla.",
      },
      {
        pregunta: "Mitä veroprosenttia minun kannattaa käyttää?",
        respuesta: "Se riippuu maasta ja yritysmuodosta. Ota mukaan sekä tulovero että sosiaalimaksut. Jos et ole varma, kysy kirjanpitäjältä.",
      },
    ],
    glosario: [
      { termino: "Laskutettavat tunnit", definicion: "Työtunnit, joista laskutat asiakasta." },
      { termino: "Käteen jäävä summa", definicion: "Se, mitä jää jäljelle verojen ja yritystoiminnan kulujen jälkeen." },
    ],
  };
};
