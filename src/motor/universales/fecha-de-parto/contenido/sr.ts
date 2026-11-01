import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  // Intl da «10. januar 2026.» con punto final: se quita para que no quede doble al cerrar la oración.
  const f = (iso: string) => fechaLarga(ctx.locale, iso).replace(/\.$/, "");
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Kalkulator termina porođaja",
    title: tituloQueEntre(
      `Termin porođaja i nedelja trudnoće (${ctx.nombrePais})`,
      "Termin porođaja: kalkulator i nedelja trudnoće",
      "Kalkulator termina porođaja",
    ),
    description:
      "Izračunajte očekivani termin porođaja prema poslednjoj menstruaciji ili datumu začeća i saznajte koja je danas nedelja trudnoće.",
    intro: [
      "Unesite prvi dan poslednje menstruacije (ili datum začeća, ako ga znate). Videćete očekivani termin porođaja, nedelju trudnoće i tromesečje.",
      "Ovo je okvirna procena. Najtačniji termin određuju pregledi kod lekara ili babice i ultrazvuk; ovaj obračun ne zamenjuje stručnu negu.",
    ],
    comoSeCalcula: [
      "Koristi se Negeleovo pravilo: prvom danu poslednje menstruacije dodaje se 280 dana (40 nedelja).",
      "Ako je ciklus duži ili kraći od 28 dana, termin se pomera za tu razliku.",
      "Od datuma začeća dodaje se 266 dana (38 nedelja).",
      "Nedelje trudnoće računaju se od poslednje menstruacije, a ne od začeća.",
    ],
    ejemplo: [
      `Prvi dan poslednje menstruacije: ${f(fum)}. Uz ciklus od 28 dana, očekivani termin porođaja je ${f(fpp)}.`,
      `Uz ciklus od 32 dana termin se pomera za 4 dana: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa termin porođaja?",
        respuesta:
          "Prvom danu poslednje menstruacije doda se 280 dana. Jednostavan način koji daje skoro isti datum: danu dodajte 7, od meseca oduzmite 3, a godini dodajte 1.",
      },
      {
        pregunta: "Zašto se nedelje računaju od poslednje menstruacije?",
        respuesta: "Zato što taj datum zna skoro svaka žena. Zbog toga u 2. nedelji do začeća još nije došlo.",
      },
      {
        pregunta: "Koliko beba se rodi tačno na termin?",
        respuesta: "Vrlo malo. Većina se rodi između 37. i 42. nedelje, pa je termin okviran, a ne tačan dan.",
      },
    ],
    glosario: [
      { termino: "Poslednja menstruacija", definicion: "Prvi dan poslednjeg menstrualnog krvarenja." },
      { termino: "Negeleovo pravilo", definicion: "Način da se odredi očekivani termin porođaja dodavanjem 280 dana prvom danu poslednje menstruacije." },
    ],
  };
};
