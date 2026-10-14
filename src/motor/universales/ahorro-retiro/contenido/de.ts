import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 67, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 67, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const c = {
    h1: "Altersvorsorge berechnen",
    title: tituloQueEntre(
      `Altersvorsorge-Rechner: private Rente berechnen | ${ctx.nombrePais}`,
      `Altersvorsorge-Rechner | ${ctx.nombrePais}`,
      "Altersvorsorge-Rechner",
    ),
    description:
      "Sehen Sie, wie viel Vermögen Sie mit einer monatlichen Sparrate für die Rente aufbauen und welche Zusatzrente es bringt, in heutiger Kaufkraft.",
    intro: [
      "Die gesetzliche Rente reicht oft nicht, um den Lebensstandard zu halten. Eigene Vorsorge macht einen großen Unterschied, auch mit kleinen Beträgen, wenn Sie früh anfangen.",
      "Geben Sie Ihr Alter ein, wann Sie in Rente gehen möchten, was Sie schon haben und was Sie monatlich sparen können. Sie sehen Ihr Vermögen bei Rentenbeginn und wie viel Sie daraus jeden Monat entnehmen könnten.",
    ],
    comoSeCalcula: [
      "Das Vermögen wächst jeden Monat mit der realen Rendite, also der Rendite abzüglich Inflation. So bleibt das Ergebnis in heutiger Kaufkraft.",
      "Ab Rentenbeginn wird das Vermögen in gleichen Monatsbeträgen über die gewählten Jahre ausgezahlt. Was noch übrig ist, bringt in der Zeit weiter Rendite.",
      "Gesetzliche Rente, Steuern und Gebühren der Anlage sind nicht berücksichtigt.",
    ],
    ejemplo: [
      `Mit ${m(actual)} Vermögen mit 30 und ${m(aporte)} im Monat bei 4 % realer Rendite haben Sie mit 67 Jahren ${m(capital30)}. Das ergibt 25 Jahre lang ${m(rentaMensual(capital30, 4, 25))} im Monat.`,
      `Fangen Sie mit denselben Zahlen erst mit 40 an, kommen Sie auf ${m(capital40)}. Zehn Jahre machen einen großen Unterschied.`,
    ],
    faq: [
      {
        pregunta: "Was ist die reale Rendite?",
        respuesta: "Das, was eine Anlage nach Abzug der Inflation bringt. Bringt eine Anlage 7 % und liegt die Inflation bei 3 %, beträgt die reale Rendite etwa 4 %.",
      },
      {
        pregunta: "Ersetzt das meine gesetzliche Rente?",
        respuesta: "Nein. Es geht um Ihr eigenes Vermögen zusätzlich zur gesetzlichen Rente oder einer Betriebsrente. Ihre gesetzliche Rente erfahren Sie aus der Renteninformation Ihres Rentenversicherungsträgers.",
      },
      {
        pregunta: "Wie viel sollte ich für die Rente sparen?",
        respuesta: "Eine feste Zahl gibt es nicht. Eine verbreitete Faustregel sind 10 bis 15 % des Nettoeinkommens. Am wichtigsten ist, so früh wie möglich anzufangen.",
      },
    ],
    glosario: [
      { termino: "Reale Rendite", definicion: "Was eine Anlage über der Inflation bringt." },
      { termino: "Rentenlücke", definicion: "Die Differenz zwischen Ihrem letzten Einkommen und dem, was die gesetzliche Rente zahlt." },
      { termino: "Heutige Kaufkraft", definicion: "Ein zukünftiger Betrag, ausgedrückt in dem, was man heute dafür kaufen könnte." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
