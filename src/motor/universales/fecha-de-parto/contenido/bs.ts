import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  // Intl da «10. januara 2026.» con punto final: se quita para que no quede doble al cerrar la oración.
  const f = (iso: string) => fechaLarga(ctx.locale, iso).replace(/\.$/, "");
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Kalkulator termina poroda",
    title: tituloQueEntre(
      `Termin poroda i sedmica trudnoće (${ctx.nombrePais})`,
      "Termin poroda: kalkulator i sedmica trudnoće",
      "Kalkulator termina poroda",
    ),
    description:
      "Izračunajte očekivani termin poroda prema posljednjoj menstruaciji ili datumu začeća i saznajte koja je danas sedmica trudnoće.",
    intro: [
      "Unesite prvi dan posljednje menstruacije (ili datum začeća, ako ga znate). Vidjet ćete očekivani termin poroda, sedmicu trudnoće i trimestar.",
      "Ovo je okvirna procjena. Najtočniji termin određuju pregledi kod ljekara ili babice i ultrazvuk; ovaj izračun ne zamjenjuje stručnu pomoć.",
    ],
    comoSeCalcula: [
      "Koristi se Naegeleovo pravilo: prvom danu posljednje menstruacije dodaje se 280 dana (40 sedmica).",
      "Ako je ciklus duži ili kraći od 28 dana, termin se pomiče za tu razliku.",
      "Od datuma začeća dodaje se 266 dana (38 sedmica).",
      "Sedmice trudnoće računaju se od posljednje menstruacije, a ne od začeća.",
    ],
    ejemplo: [
      `Prvi dan posljednje menstruacije: ${f(fum)}. Uz ciklus od 28 dana, očekivani termin poroda je ${f(fpp)}.`,
      `Uz ciklus od 32 dana termin se pomiče za 4 dana: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa termin poroda?",
        respuesta:
          "Prvom danu posljednje menstruacije doda se 280 dana. Jednostavan način koji daje gotovo isti datum: danu dodajte 7, od mjeseca oduzmite 3, a godini dodajte 1.",
      },
      {
        pregunta: "Zašto se sedmice računaju od posljednje menstruacije?",
        respuesta: "Zato što taj datum zna gotovo svaka žena. Zbog toga u 2. sedmici do začeća još nije došlo.",
      },
      {
        pregunta: "Koliko se beba rodi tačno na termin?",
        respuesta: "Vrlo malo. Većina se rodi između 37. i 42. sedmice, pa je termin okviran, a ne tačan dan.",
      },
    ],
    glosario: [
      { termino: "Posljednja menstruacija", definicion: "Prvi dan posljednjeg menstrualnog krvarenja." },
      { termino: "Naegeleovo pravilo", definicion: "Način određivanja očekivanog termina poroda dodavanjem 280 dana prvom danu posljednje menstruacije." },
    ],
  };
};
