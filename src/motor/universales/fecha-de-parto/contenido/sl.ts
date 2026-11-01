import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Izračun datuma poroda",
    title: tituloQueEntre(
      `Datum poroda in teden nosečnosti (${ctx.nombrePais})`,
      "Datum poroda: izračun in teden nosečnosti",
      "Izračun datuma poroda",
    ),
    description:
      "Izračunajte pričakovani datum poroda glede na zadnjo menstruacijo ali datum spočetja in preverite, kateri teden nosečnosti je danes.",
    intro: [
      "Vnesite prvi dan zadnje menstruacije (ali datum spočetja, če ga poznate). Videli boste pričakovani datum poroda, teden nosečnosti in trimesečje.",
      "To je okvirna ocena. Najbolj natančen datum določijo pregledi pri zdravniku ali babici in ultrazvok. Ta izračun ne nadomešča strokovne oskrbe.",
    ],
    comoSeCalcula: [
      "Uporablja se Naegelejevo pravilo: prvemu dnevu zadnje menstruacije se prišteje 280 dni (40 tednov).",
      "Če je cikel daljši ali krajši od 28 dni, se datum premakne za to razliko.",
      "Od datuma spočetja se prišteje 266 dni (38 tednov).",
      "Tedni nosečnosti se štejejo od zadnje menstruacije, ne od spočetja.",
    ],
    ejemplo: [
      `Prvi dan zadnje menstruacije: ${f(fum)}. Pri ciklu, dolgem 28 dni, je pričakovani datum poroda: ${f(fpp)}.`,
      `Pri ciklu, dolgem 32 dni, se datum premakne za 4 dni: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se izračuna datum poroda?",
        respuesta:
          "Prvemu dnevu zadnje menstruacije se prišteje 280 dni. Preprost način, ki da skoraj enak datum: dnevu prištejte 7, od meseca odštejte 3, letu pa prištejte 1.",
      },
      {
        pregunta: "Zakaj se tedni štejejo od zadnje menstruacije?",
        respuesta: "Ker ta datum pozna skoraj vsaka ženska. Zato v 2. tednu do spočetja običajno še ni prišlo.",
      },
      {
        pregunta: "Koliko otrok se rodi točno na pričakovani datum?",
        respuesta: "Zelo malo. Večina se jih rodi med 37. in 42. tednom, zato je datum okviren in ne natančen dan.",
      },
    ],
    glosario: [
      { termino: "Zadnja menstruacija", definicion: "Prvi dan zadnje menstrualne krvavitve." },
      { termino: "Naegelejevo pravilo", definicion: "Način določanja pričakovanega datuma poroda: prvemu dnevu zadnje menstruacije se prišteje 280 dni." },
    ],
  };
};
