import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Dodavanje dana datumu",
    title: tituloQueEntre(
      `Dodavanje dana datumu: kalkulator ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      "Dodavanje i oduzimanje dana od datuma",
      "Dodavanje dana datumu",
    ),
    description: "Dodajte ili oduzmite kalendarske ili radne dane od datuma i saznajte na koji dan pada rezultat. Korisno za rokove i datume dospijeća.",
    intro: [
      "Odaberite datum, broj dana i dodajete li ih ili oduzimate. Dobivate novi datum i dan u tjednu.",
      "Kod radnih dana kalkulator preskače subote i nedjelje.",
    ],
    comoSeCalcula: [
      "Kod kalendarskih dana svaki uneseni dan pomiče datum za jedan dan u kalendaru.",
      "Kod radnih dana računaju se samo dani od ponedjeljka do petka. Početni datum se ne računa.",
      "Blagdani se ne oduzimaju, jer se razlikuju od države do države i od regije do regije.",
    ],
    ejemplo: [
      `Ako datumu ${f(inicio)} dodate 90 kalendarskih dana, dobivate datum ${f(mas90)}`,
      `Ako datumu ${f(inicio)} dodate 15 radnih dana, dobivate datum ${f(aFecha(habil))}`,
    ],
    faq: [
      {
        pregunta: "Računa li se početni datum kao prvi dan?",
        respuesta: "Ne. Ako ponedjeljku dodate 1 dan, dobivate utorak. Tako se računa većina rokova.",
      },
      {
        pregunta: "Što ako radne dane dodajem od subote?",
        respuesta: "Prvi radni dan je sljedeći ponedjeljak. Ako suboti dodate 1 radni dan, dobivate ponedjeljak.",
      },
      {
        pregunta: "Uzima li kalkulator u obzir prijestupne godine?",
        respuesta: "Da. Ako razdoblje obuhvaća 29. veljače, on se računa kao dodatni dan.",
      },
    ],
    glosario: [
      { termino: "Kalendarski dani", definicion: "Svi dani u kalendaru, nijedan se ne preskače." },
      { termino: "Radni dani", definicion: "U ovom kalkulatoru, dani od ponedjeljka do petka." },
    ],
  };
};
