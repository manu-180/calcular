import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Dienu pieskaitīšana datumam",
    title: tituloQueEntre(
      `Dienu pieskaitīšana datumam ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Dienu pieskaitīšana un atņemšana: kalkulators",
      "Dienu pieskaitīšana datumam",
    ),
    description: "Pieskaitiet datumam vai atņemiet no tā kalendārās vai darba dienas un uzziniet, kura diena sanāk. Noder termiņiem un maksājumu datumiem.",
    intro: [
      "Izvēlieties datumu, dienu skaitu un to, vai dienas pieskaitīt vai atņemt. Redzēsiet galīgo datumu un nedēļas dienu.",
      "Rēķinot darba dienas, sestdienas un svētdienas tiek izlaistas.",
    ],
    comoSeCalcula: [
      "Kalendāro dienu gadījumā katra ievadītā diena kalendārā pārbīda datumu par vienu dienu.",
      "Darba dienu gadījumā skaita tikai no pirmdienas līdz piektdienai. Sākuma datums netiek ieskaitīts.",
      "Valsts svētku dienas netiek atņemtas, jo tās atšķiras atkarībā no valsts un reģiona.",
    ],
    ejemplo: [
      `Sākuma datums: ${f(inicio)}. Pieskaitot 90 kalendārās dienas, iegūst datumu: ${f(mas90)}.`,
      `Tas pats sākuma datums, pieskaitot 15 darba dienas, dod datumu: ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Vai sākuma datumu skaita kā pirmo dienu?",
        respuesta: "Nē. Ja pirmdienai pieskaita 1 dienu, sanāk otrdiena. Tā rēķina lielāko daļu termiņu.",
      },
      {
        pregunta: "Kas notiek, ja darba dienas pieskaita no sestdienas?",
        respuesta: "Pirmā darba diena ir nākamā pirmdiena. Ja sestdienai pieskaita 1 darba dienu, sanāk pirmdiena.",
      },
      {
        pregunta: "Vai kalkulators ņem vērā garos gadus?",
        respuesta: "Jā. Ja periodā ir 29. februāris, to skaita kā papildu dienu.",
      },
    ],
    glosario: [
      { termino: "Kalendārās dienas", definicion: "Visas kalendāra dienas, neviena netiek izlaista." },
      { termino: "Darba dienas", definicion: "Šajā kalkulatorā dienas no pirmdienas līdz piektdienai." },
    ],
  };
};
