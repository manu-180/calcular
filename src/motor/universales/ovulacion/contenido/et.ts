import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ovulatsiooni kalkulaator",
    title: tituloQueEntre(
      `Ovulatsiooni kalkulaator: sinu viljakad päevad | ${ctx.nombrePais}`,
      `Ovulatsiooni kalkulaator | ${ctx.nombrePais}`,
      "Ovulatsiooni kalkulaator",
    ),
    description: "Arvuta, millal on sinu ovulatsioon, millised on viljakad päevad ja millal algab järgmine menstruatsioon. Näed ka kolme järgmist tsüklit.",
    intro: [
      "Sisesta viimase menstruatsiooni esimene päev ja tsükli pikkus. Näed eeldatavat ovulatsiooni, viljakaid päevi ja järgmist menstruatsiooni.",
      "Tulemus on hinnang korrapärase tsükli kohta. See ei ole rasestumisvastane meetod ega asenda ämmaemanda või arsti hinnangut.",
    ],
    comoSeCalcula: [
      `Ovulatsioon toimub tavaliselt ${FASE_LUTEA} päeva enne järgmist menstruatsiooni: viimase menstruatsiooni esimene päev + tsükli pikkus − ${FASE_LUTEA}.`,
      "Viljakad päevad algavad 5 päeva enne ovulatsiooni ja lõpevad ovulatsioonile järgneval päeval, sest seemnerakud võivad elada kuni 5 päeva.",
      "Järgmist menstruatsiooni oodatakse ühe tsükli kaugusel eelmisest.",
    ],
    ejemplo: [
      `Kui viimase menstruatsiooni esimene päev on ${f(fum)} ja tsükkel 28 päeva, on eeldatav ovulatsioon ${f(aFecha(v.ovulacion))}.`,
      `Viljakate päevade algus: ${f(aFecha(v.desde))}. Viljakate päevade lõpp: ${f(aFecha(v.hasta))}. Järgmine menstruatsioon: ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Millised päevad on kõige viljakamad?",
        respuesta: "2-3 päeva enne ovulatsiooni ja ovulatsioonipäev ise. Kogu viljakas periood kestab umbes 6 päeva.",
      },
      {
        pregunta: "Kas kalkulaator töötab, kui mu tsükkel on ebakorrapärane?",
        respuesta: "Saad suunava tulemuse, kuid see on ebatäpsem. Ebakorrapärase tsükli puhul võib ovulatsioon nihkuda kuust kuusse mitu päeva.",
      },
      {
        pregunta: "Kas saan kalkulaatorit kasutada raseduse vältimiseks?",
        respuesta: "Ei. Hinnang on ligikaudne ja ovulatsioon võib tulla varem või hiljem. Raseduse vältimiseks vajad rasestumisvastast meetodit.",
      },
    ],
    glosario: [
      { termino: "Ovulatsioon", definicion: "Hetk, mil munasari vabastab munaraku." },
      { termino: "Viljakad päevad", definicion: "Tsükli päevad, mil on võimalik rasestuda." },
    ],
  };
};
