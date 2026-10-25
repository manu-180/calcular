import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  // Intl da «5. mart 2026.» con punto final: se quita para que no quede doble.
  const f = (iso: string) => fechaLarga(ctx.locale, iso).replace(/\.$/, "");
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Kalkulator ovulacije i plodnih dana",
    title: tituloQueEntre(
      `Kalkulator ovulacije i plodnih dana (${ctx.nombrePais})`,
      "Kalkulator ovulacije i plodnih dana",
      "Kalkulator ovulacije",
    ),
    description: "Izračunajte dan ovulacije, plodne dane i datum sledeće menstruacije, uz tri naredna ciklusa.",
    intro: [
      "Unesite prvi dan poslednje menstruacije i dužinu ciklusa. Videćete procenjeni dan ovulacije, plodne dane i sledeću menstruaciju.",
      "Ovo je procena za redovan ciklus. Nije metoda kontracepcije i ne zamenjuje savet lekara ili ginekologa.",
    ],
    comoSeCalcula: [
      `Ovulacija obično nastupa ${FASE_LUTEA} dana pre sledeće menstruacije: prvi dan poslednje menstruacije + dužina ciklusa − ${FASE_LUTEA}.`,
      "Plodni dani traju od 5 dana pre ovulacije do dana posle nje, jer spermatozoidi mogu da prežive do 5 dana.",
      "Sledeća menstruacija se očekuje jedan ciklus posle poslednje.",
    ],
    ejemplo: [
      `Poslednja menstruacija: ${f(fum)}. Uz ciklus od 28 dana, procenjena ovulacija pada na ${f(aFecha(v.ovulacion))}.`,
      `Plodni dani traju od ${f(aFecha(v.desde))} do ${f(aFecha(v.hasta))}, a sledeća menstruacija se očekuje oko ovog datuma: ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Koji dani su najplodniji?",
        respuesta: "Dva do tri dana pre ovulacije i sam dan ovulacije. Ceo plodni period traje oko 6 dana.",
      },
      {
        pregunta: "Da li obračun važi i kod neredovnog ciklusa?",
        respuesta: "Daje okvirnu sliku, ali manje tačnu. Kod neredovnog ciklusa ovulacija može iz meseca u mesec da se pomeri za nekoliko dana.",
      },
      {
        pregunta: "Može li ovo da se koristi za sprečavanje trudnoće?",
        respuesta: "Ne. Procena je približna, a ovulacija može da dođe ranije ili kasnije. Za zaštitu od trudnoće koristite kontracepciju i posavetujte se sa lekarom.",
      },
    ],
    glosario: [
      { termino: "Ovulacija", definicion: "Oslobađanje jajne ćelije iz jajnika." },
      { termino: "Plodni dani", definicion: "Dani ciklusa u kojima je moguće zatrudneti." },
    ],
  };
};
