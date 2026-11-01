import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Dodavanje dana datumu",
    title: tituloQueEntre(
      `Dodavanje dana datumu: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Dodavanje i oduzimanje dana od datuma",
      "Dodavanje dana datumu",
    ),
    description: "Dodajte ili oduzmite kalendarske ili radne dane od datuma i saznajte na koji dan pada rezultat. Korisno za rokove i datume dospeća.",
    intro: [
      "Izaberite datum, broj dana i da li ih dodajete ili oduzimate. Dobijate novi datum i dan u nedelji.",
      "Kod radnih dana kalkulator preskače subote i nedelje.",
    ],
    comoSeCalcula: [
      "Kod kalendarskih dana svaki uneti dan pomera datum za jedan dan u kalendaru.",
      "Kod radnih dana računaju se samo dani od ponedeljka do petka. Početni datum se ne računa.",
      "Praznici se ne oduzimaju, jer se razlikuju od zemlje do zemlje i od regiona do regiona.",
    ],
    ejemplo: [
      `Ako na ${f(inicio)} dodate 90 kalendarskih dana, dobijate datum ${f(mas90)}`,
      `Ako na ${f(inicio)} dodate 15 radnih dana, dobijate datum ${f(aFecha(habil))}`,
    ],
    faq: [
      {
        pregunta: "Da li se početni datum računa kao prvi dan?",
        respuesta: "Ne. Ako ponedeljku dodate 1 dan, dobijate utorak. Tako se računa većina rokova.",
      },
      {
        pregunta: "Šta ako radne dane dodajem od subote?",
        respuesta: "Prvi radni dan je naredni ponedeljak. Ako suboti dodate 1 radni dan, dobijate ponedeljak.",
      },
      {
        pregunta: "Da li kalkulator uzima u obzir prestupne godine?",
        respuesta: "Da. Ako period obuhvata 29. februar, on se računa kao dodatni dan.",
      },
    ],
    glosario: [
      { termino: "Kalendarski dani", definicion: "Svi dani u kalendaru, nijedan se ne preskače." },
      { termino: "Radni dani", definicion: "U ovom kalkulatoru, dani od ponedeljka do petka." },
    ],
  };
};
