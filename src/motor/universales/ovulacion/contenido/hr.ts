import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  // Intl da «5. ožujka 2026.» con punto final: se quita para que no quede doble.
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
    description: "Izračunajte dan ovulacije, plodne dane i datum sljedeće menstruacije, uz tri naredna ciklusa.",
    intro: [
      "Unesite prvi dan posljednje menstruacije i duljinu ciklusa. Vidjet ćete procijenjeni dan ovulacije, plodne dane i sljedeću menstruaciju.",
      "Ovo je procjena za redovit ciklus. Nije metoda kontracepcije i ne zamjenjuje savjet liječnika ili ginekologa.",
    ],
    comoSeCalcula: [
      `Ovulacija obično nastupa ${FASE_LUTEA} dana prije sljedeće menstruacije: prvi dan posljednje menstruacije + duljina ciklusa − ${FASE_LUTEA}.`,
      "Plodni dani traju od 5 dana prije ovulacije do dana nakon nje, jer spermiji mogu preživjeti do 5 dana.",
      "Sljedeća menstruacija očekuje se jedan ciklus nakon posljednje.",
    ],
    ejemplo: [
      `Posljednja menstruacija: ${f(fum)}. Uz ciklus od 28 dana, procijenjena ovulacija pada na ${f(aFecha(v.ovulacion))}.`,
      `Plodni dani traju od ${f(aFecha(v.desde))} do ${f(aFecha(v.hasta))}, a sljedeća menstruacija očekuje se oko ovog datuma: ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Koji su dani najplodniji?",
        respuesta: "Dva do tri dana prije ovulacije i sam dan ovulacije. Cijelo plodno razdoblje traje oko 6 dana.",
      },
      {
        pregunta: "Vrijedi li izračun i kod neredovitog ciklusa?",
        respuesta: "Daje okvirnu sliku, ali manje točnu. Kod neredovitog ciklusa ovulacija se iz mjeseca u mjesec može pomaknuti za nekoliko dana.",
      },
      {
        pregunta: "Može li se ovo koristiti za sprječavanje trudnoće?",
        respuesta: "Ne. Procjena je približna, a ovulacija može nastupiti ranije ili kasnije. Za zaštitu od trudnoće koristite kontracepciju i posavjetujte se s liječnikom.",
      },
    ],
    glosario: [
      { termino: "Ovulacija", definicion: "Oslobađanje jajne stanice iz jajnika." },
      { termino: "Plodni dani", definicion: "Dani ciklusa u kojima je moguće zatrudnjeti." },
    ],
  };
};
