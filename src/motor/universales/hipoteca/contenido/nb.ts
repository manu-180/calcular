import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Boliglånskalkulator",
    title: tituloQueEntre(
      `Boliglånskalkulator: regn ut terminbeløpet | ${ctx.nombrePais}`,
      `Boliglånskalkulator | ${ctx.nombrePais}`,
      "Boliglånskalkulator",
    ),
    description: "Regn ut hva boliglånet koster per måned ut fra kjøpesum, egenkapital, rente og nedbetalingstid. Se rentene totalt og hvordan gjelden går ned år for år.",
    intro: [
      "Boliglånet er den største gjelden de fleste husholdninger noen gang tar opp. Det lønner seg å se hele regnestykket før du snakker med banken.",
      "Fyll inn kjøpesum, egenkapital, rente og nedbetalingstid. Betaler du felleskostnader eller kommunale avgifter, legger du dem til, så ser du hva det faktisk koster å bo per måned.",
    ],
    comoSeCalcula: [
      "Lånebeløp = kjøpesum − egenkapital.",
      "Terminbeløpet regnes som et annuitetslån, med renten per år delt på 12 og nedbetalingstiden i måneder.",
      "For hvert år summeres betalte renter og avdrag, og du ser hvor mye som gjenstår å betale.",
    ],
    ejemplo: [
      `En bolig til ${m(precio)} med 20 % egenkapital gir et lån på ${m(prestado)}. Med 7 % rente og 30 års nedbetalingstid blir terminbeløpet ${m(cuota30)} i måneden.`,
      `På 30 år betaler du ${m(interesesTotales(prestado, 7, 360))} i renter. Med 15 års nedbetalingstid øker terminbeløpet til ${m(cuota15)}, men rentene går ned til ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Hvor mye egenkapital trenger jeg?",
        respuesta:
          "Det avhenger av banken og av reglene der du kjøper. Jo mer egenkapital, desto mindre låner du, desto lavere blir terminbeløpet og desto mindre betaler du i renter. Sett også av penger til kostnadene ved kjøpet.",
      },
      {
        pregunta: "Hvorfor går gjelden så lite ned de første årene?",
        respuesta:
          "Renten regnes av det du skylder. I starten er gjelden stor, så det meste av hvert terminbeløp er renter. Etter hvert blir avdraget den største delen.",
      },
      {
        pregunta: "Er kortere nedbetalingstid bedre?",
        respuesta:
          "Ja, hvis du klarer det høyere terminbeløpet. Du betaler en god del mindre i renter. Ellers kan en lengre nedbetalingstid fungere med ekstra innbetalinger når du har råd.",
      },
      {
        pregunta: "Regner banken på samme måte?",
        respuesta:
          "Ikke alltid. Mange tilbyr også serielån, der avdraget er likt hver måned og terminbeløpet går ned over tid. Kalkulatoren her bruker annuitetslån med samme rente hele nedbetalingstiden. Med flytende rente kan terminbeløpet endre seg.",
      },
    ],
    glosario: [
      { termino: "Egenkapital", definicion: "Den delen av kjøpesummen du betaler med egne penger." },
      { termino: "Avdrag", definicion: "Den delen av terminbeløpet som reduserer gjelden." },
      { termino: "Annuitetslån", definicion: "Et lån der hvert terminbeløp er like stort, med renter og avdrag sammen." },
    ],
  };
};
