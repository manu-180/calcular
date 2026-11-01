import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Dodavanje dana datumu",
    title: tituloQueEntre(
      `Dodavanje dana datumu: kalkulator ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      "Dodavanje i oduzimanje dana od datuma",
      "Dodavanje dana datumu",
    ),
    description: "Dodajte ili oduzmite kalendarske ili radne dane od datuma i saznajte na koji dan pada rezultat. Korisno za rokove i datume dospijeća.",
    intro: [
      "Izaberite datum, broj dana i dodajete li ih ili oduzimate. Dobijate novi datum i dan u sedmici.",
      "Kod radnih dana kalkulator preskače subote i nedjelje.",
    ],
    comoSeCalcula: [
      "Kod kalendarskih dana svaki uneseni dan pomiče datum za jedan dan u kalendaru.",
      "Kod radnih dana računaju se samo dani od ponedjeljka do petka. Početni datum se ne računa.",
      "Praznici se ne oduzimaju, jer se razlikuju od države do države i od regije do regije.",
    ],
    ejemplo: [
      `Ako datumu ${f(inicio)} dodate 90 kalendarskih dana, dobijate datum ${f(mas90)}`,
      `Ako datumu ${f(inicio)} dodate 15 radnih dana, dobijate datum ${f(aFecha(habil))}`,
    ],
    faq: [
      {
        pregunta: "Računa li se početni datum kao prvi dan?",
        respuesta: "Ne. Ako ponedjeljku dodate 1 dan, dobijate utorak. Tako se računa većina rokova.",
      },
      {
        pregunta: "Šta ako radne dane dodajem od subote?",
        respuesta: "Prvi radni dan je sljedeći ponedjeljak. Ako suboti dodate 1 radni dan, dobijate ponedjeljak.",
      },
      {
        pregunta: "Uzima li kalkulator u obzir prijestupne godine?",
        respuesta: "Da. Ako period obuhvata 29. februara, on se računa kao dodatni dan.",
      },
    ],
    glosario: [
      { termino: "Kalendarski dani", definicion: "Svi dani u kalendaru, nijedan se ne preskače." },
      { termino: "Radni dani", definicion: "U ovom kalkulatoru, dani od ponedjeljka do petka." },
    ],
  };
};
