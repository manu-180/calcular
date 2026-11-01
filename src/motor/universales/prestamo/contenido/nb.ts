import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Lånekalkulator",
    title: tituloQueEntre(
      `Lånekalkulator: regn ut terminbeløp og renter | ${ctx.nombrePais}`,
      `Lånekalkulator | ${ctx.nombrePais}`,
      "Lånekalkulator",
    ),
    description: "Regn ut hva lånet koster per måned, hvor mye du betaler i renter og hele nedbetalingsplanen. Se hva ekstra avdrag sparer deg for.",
    intro: [
      "Før du tar opp et lån, er det to tall som teller. Hva du betaler hver måned, og hva lånet koster deg i renter.",
      "Fyll inn beløp, rente og nedbetalingstid. Vil du betale litt ekstra hver måned, fyller du inn det også, så ser du hvor mye raskere du blir ferdig.",
    ],
    comoSeCalcula: [
      "Kalkulatoren bruker annuitetslån, altså samme terminbeløp hver måned. Det er vanlig for forbrukslån, billån og boliglån.",
      "Månedlig rente = nominell rente per år ÷ 12.",
      "Terminbeløp = lånebeløp × månedlig rente ÷ (1 − (1 + månedlig rente) opphøyd i minus antall terminer).",
      "Hver måned regnes renten av restgjelden. Resten av terminbeløpet er avdrag og reduserer gjelden.",
    ],
    ejemplo: [
      `Et lån på ${m(monto)} med 12 % rente og 36 måneders nedbetalingstid koster ${m(cuota36)} i måneden. Totalt betaler du ${m(interesesTotales(monto, 12, 36))} i renter.`,
      `Forlenger du nedbetalingstiden til 60 måneder, går terminbeløpet ned til ${m(cuota60)}, men rentene øker til ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg ut terminbeløpet på et lån?",
        respuesta:
          "Med annuitetsformelen. Alle terminbeløpene er like store, men i starten er de mest renter og mot slutten mest avdrag. Derfor går gjelden sakte ned i begynnelsen.",
      },
      {
        pregunta: "Lønner det seg å betale ned lånet raskere?",
        respuesta:
          "Som regel ja. Ekstra innbetalinger går rett til gjelden, og den delen koster ikke lenger renter. Jo tidligere du betaler, desto mer sparer du.",
      },
      {
        pregunta: "Er lengre nedbetalingstid bedre?",
        respuesta: "Terminbeløpet blir lavere, men du betaler en god del mer i renter totalt. Sammenlign begge tallene før du bestemmer deg.",
      },
      {
        pregunta: "Hvorfor får banken et annet terminbeløp?",
        respuesta:
          "Långivere legger ofte til gebyrer, forsikringer eller avgifter, eller bruker en annen rente enn den som annonseres. Sammenlign tilbud på effektiv rente og totalkostnad, ikke bare på nominell rente.",
      },
    ],
    glosario: [
      { termino: "Restgjeld", definicion: "Den delen av lånet du ennå ikke har betalt tilbake." },
      { termino: "Nominell rente", definicion: "Renten per år som deles på 12 for å finne renten for hver måned." },
      { termino: "Avdrag", definicion: "Den delen av terminbeløpet som reduserer gjelden." },
      { termino: "Effektiv rente", definicion: "Renter og gebyrer samlet i én prosentsats per år, slik at tilbud kan sammenlignes." },
    ],
  };
};
