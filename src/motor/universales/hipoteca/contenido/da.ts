import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Boliglånsberegner",
    title: tituloQueEntre(
      `Boliglånsberegner: beregn ydelsen på dit boliglån | ${ctx.nombrePais}`,
      `Boliglånsberegner | ${ctx.nombrePais}`,
      "Boliglånsberegner",
    ),
    description: "Beregn den månedlige ydelse på dit boliglån ud fra pris, udbetaling, rente og løbetid. Se de samlede renter, og hvordan gælden falder år for år.",
    intro: [
      "Boliglånet er den største gæld, de fleste husstande nogensinde optager. Det betaler sig at se hele regnestykket, før du taler med banken.",
      "Skriv pris, udbetaling, rente og løbetid. Betaler du fællesudgifter eller ejendomsskat, så læg dem til, så ser du din reelle boligudgift om måneden.",
    ],
    comoSeCalcula: [
      "Lånebeløb = boligens pris − udbetaling.",
      "Ydelsen beregnes som et annuitetslån med den årlige rente delt med 12 og løbetiden i måneder.",
      "For hvert år lægges betalte renter og afdrag sammen, og du ser, hvor meget der er tilbage at betale.",
    ],
    ejemplo: [
      `En bolig til ${m(precio)} med 20 % i udbetaling giver et lån på ${m(prestado)}. Med 7 % i rente og 30 års løbetid bliver ydelsen ${m(cuota30)} om måneden.`,
      `På 30 år betaler du ${m(interesesTotales(prestado, 7, 360))} i renter. Med 15 års løbetid stiger ydelsen til ${m(cuota15)}, men renterne falder til ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Hvor stor en udbetaling skal jeg have?",
        respuesta:
          "Det afhænger af banken og af reglerne, der hvor du køber. Jo større udbetaling, jo mindre låner du, jo lavere bliver ydelsen, og jo færre renter betaler du. Spar også op til omkostningerne ved købet.",
      },
      {
        pregunta: "Hvorfor falder gælden så lidt de første år?",
        respuesta:
          "Renten regnes af det, du skylder. I starten er gælden stor, så det meste af hver ydelse er renter. Med tiden bliver afdraget den største del.",
      },
      {
        pregunta: "Er en kortere løbetid bedre?",
        respuesta:
          "Ja, hvis du kan klare den højere ydelse. Du betaler en del færre renter. Ellers kan en længere løbetid fungere med ekstra afdrag, når du har råd.",
      },
      {
        pregunta: "Regner banken på samme måde?",
        respuesta:
          "Ikke altid. Lån kan have afdragsfrihed, variabel rente eller bidrag, der lægges oven i renten. Beregningen her bruger et annuitetslån med samme rente i hele løbetiden. Med variabel rente kan ydelsen ændre sig.",
      },
    ],
    glosario: [
      { termino: "Udbetaling", definicion: "Den del af prisen, du betaler med dine egne penge." },
      { termino: "Afdrag", definicion: "Den del af ydelsen, der nedbringer gælden." },
      { termino: "Annuitetslån", definicion: "Et lån, hvor hver ydelse er lige stor, med renter og afdrag samlet." },
    ],
  };
};
