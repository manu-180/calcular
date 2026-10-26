import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Calculator sarcină: data probabilă a nașterii",
    title: tituloQueEntre(`Calculator sarcină și data nașterii: ${ctx.nombrePais}`, "Calculator sarcină: data probabilă a nașterii", "Calculator sarcină"),
    description: "Aflați data probabilă a nașterii după ultima menstruație sau data concepției și în câte săptămâni de sarcină sunteți azi.",
    intro: [
      "Introduceți prima zi a ultimei menstruații (sau data concepției, dacă o știți). Vedeți data probabilă a nașterii (DPN), vârsta sarcinii și trimestrul.",
      "Este o estimare și nu înlocuiește consultul medical. Controalele la medic și ecografia dau data cea mai precisă.",
    ],
    comoSeCalcula: [
      "Se folosește regula lui Naegele: data probabilă a nașterii este ultima menstruație plus 280 de zile (40 de săptămâni).",
      "Dacă ciclul este mai lung sau mai scurt de 28 de zile, data se mută cu diferența.",
      "De la data concepției se adună 266 de zile (38 de săptămâni).",
      "Săptămânile de sarcină se numără de la ultima menstruație, nu de la concepție.",
    ],
    ejemplo: [
      `Cu ultima menstruație pe ${f(fum)} și un ciclu de 28 de zile, data probabilă a nașterii este ${f(fpp)}.`,
      `Cu un ciclu de 32 de zile, data se mută cu 4 zile, pe ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Cum se calculează data probabilă a nașterii?",
        respuesta: "Se adună 280 de zile la prima zi a ultimei menstruații. O regulă rapidă care dă aproape aceeași dată: adunați 7 zile, scădeți 3 luni și adunați un an.",
      },
      {
        pregunta: "De ce se numără săptămânile de la ultima menstruație?",
        respuesta: "Pentru că este o dată pe care aproape oricine o cunoaște. De aceea, în săptămâna 2 concepția încă nu a avut loc.",
      },
      {
        pregunta: "Câți copii se nasc la data probabilă?",
        respuesta: "Puțini. Cei mai mulți se nasc între săptămânile 37 și 42, așa că data este un reper, nu o zi exactă. Pentru orice decizie, discutați cu medicul care vă urmărește sarcina.",
      },
    ],
    glosario: [
      { termino: "DPN", definicion: "Data probabilă a nașterii, estimată de la ultima menstruație sau de la concepție." },
      { termino: "Regula lui Naegele", definicion: "Un mod de a estima data nașterii adunând 280 de zile la prima zi a ultimei menstruații." },
    ],
  };
};
