import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  const c = {
    h1: "Geburtstermin berechnen",
    title: tituloQueEntre(
      `Geburtstermin berechnen: Rechner mit SSW | ${ctx.nombrePais}`,
      `Geburtstermin berechnen | ${ctx.nombrePais}`,
      "Geburtstermin berechnen",
    ),
    description:
      "Berechnen Sie Ihren voraussichtlichen Geburtstermin aus der letzten Periode oder dem Tag der Empfängnis und sehen Sie Ihre aktuelle Schwangerschaftswoche.",
    intro: [
      "Tragen Sie den ersten Tag Ihrer letzten Periode ein (oder den Tag der Empfängnis, wenn Sie ihn kennen). Sie sehen den errechneten Termin, die Schwangerschaftswoche und das Trimester.",
      "Das Ergebnis ist eine Schätzung. Vorsorgeuntersuchungen und Ultraschall liefern den genauesten Termin.",
    ],
    comoSeCalcula: [
      "Der Rechner nutzt die Naegele-Regel: Geburtstermin = erster Tag der letzten Periode plus 280 Tage (40 Wochen).",
      "Ist Ihr Zyklus länger oder kürzer als 28 Tage, verschiebt sich der Termin um diese Differenz.",
      "Ab dem Tag der Empfängnis rechnet er 266 Tage (38 Wochen) dazu.",
      "Die Schwangerschaftswochen zählen ab der letzten Periode, nicht ab der Empfängnis.",
    ],
    ejemplo: [
      `War der erste Tag der letzten Periode der ${f(fum)} und der Zyklus 28 Tage lang, ist der errechnete Termin der ${f(fpp)}.`,
      `Bei einem Zyklus von 32 Tagen verschiebt er sich um 4 Tage auf den ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Wie wird der Geburtstermin berechnet?",
        respuesta: "Zum ersten Tag der letzten Periode kommen 280 Tage dazu. Eine Faustregel mit fast demselben Ergebnis: plus 7 Tage, minus 3 Monate, plus 1 Jahr.",
      },
      {
        pregunta: "Warum zählen die Wochen ab der letzten Periode?",
        respuesta: "Weil fast jede Frau dieses Datum kennt. Deshalb hat in der 2. Schwangerschaftswoche die Befruchtung noch gar nicht stattgefunden.",
      },
      {
        pregunta: "Was bedeutet eine Angabe wie SSW 12+3?",
        respuesta: "Sie sind 12 volle Wochen und 3 Tage schwanger, also in der 13. Schwangerschaftswoche.",
      },
      {
        pregunta: "Wie viele Babys kommen am errechneten Termin?",
        respuesta: "Nur wenige. Die meisten kommen zwischen der 37. und der 42. Woche zur Welt. Der Termin ist deshalb ein Richtwert, kein fester Tag.",
      },
    ],
    glosario: [
      { termino: "SSW", definicion: "Schwangerschaftswoche, gezählt ab dem ersten Tag der letzten Periode." },
      { termino: "Naegele-Regel", definicion: "Eine Methode, den Geburtstermin zu schätzen: erster Tag der letzten Periode plus 280 Tage." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
