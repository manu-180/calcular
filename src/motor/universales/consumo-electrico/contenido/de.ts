import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.4);
  const kwhMes = (1000 * 4 * 30) / 1000;
  const c = {
    h1: "Stromkosten berechnen",
    title: tituloQueEntre(
      `Stromkostenrechner: Verbrauch pro Gerät berechnen | ${ctx.nombrePais}`,
      `Stromkostenrechner | ${ctx.nombrePais}`,
      "Stromkostenrechner",
    ),
    description:
      "Berechnen Sie, wie viel Strom ein Gerät verbraucht und was es pro Tag, Monat und Jahr kostet. Aus Watt, Nutzungsdauer und kWh-Preis.",
    intro: [
      "Geben Sie die Leistung des Geräts, die Nutzungsdauer und den Preis pro kWh von Ihrer Stromrechnung ein. Sie sehen Verbrauch und Kosten.",
      "So finden Sie heraus, welches Gerät Ihre Rechnung am meisten belastet: Heizlüfter, Wäschetrockner, Kühlschrank oder Computer.",
    ],
    comoSeCalcula: [
      "kWh pro Tag = Watt × Stunden pro Tag ÷ 1000.",
      "kWh pro Monat = kWh pro Tag × Nutzungstage. Für das Jahr den Monat mal 12.",
      "Kosten = kWh × Preis pro kWh.",
    ],
    ejemplo: [
      `Ein Gerät mit ${formatearNumero(ctx, 1000)} W, das 4 Stunden am Tag läuft, verbraucht 4 kWh am Tag und ${formatearNumero(ctx, kwhMes)} kWh im Monat.`,
      `Bei ${m(precio)} pro kWh kostet das ${m(kwhMes * precio)} im Monat.`,
    ],
    faq: [
      {
        pregunta: "Was ist eine Kilowattstunde?",
        respuesta: `Eine Kilowattstunde (kWh) ist die Energie, die ein Gerät mit ${formatearNumero(ctx, 1000)} W in einer Stunde verbraucht. Sie ist die Einheit auf Ihrer Stromrechnung.`,
      },
      {
        pregunta: "Läuft ein Kühlschrank den ganzen Tag mit voller Leistung?",
        respuesta: "Nein. Der Kompressor schaltet sich an und aus. Rechnen Sie bei solchen Geräten mit etwa 8 bis 10 Stunden pro Tag statt mit 24.",
      },
      {
        pregunta: "Warum stimmt das Ergebnis nicht genau mit meiner Rechnung überein?",
        respuesta: "Auf der Rechnung kommen Grundpreis, Steuern und Abgaben dazu. Der Rechner zeigt nur, was das Gerät selbst verbraucht.",
      },
      {
        pregunta: "Wie viel kostet der Standby-Betrieb?",
        respuesta: "Tragen Sie die Standby-Leistung in Watt ein und 24 Stunden pro Tag. Schon wenige Watt summieren sich übers Jahr zu einem spürbaren Betrag.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Die Einheit für Leistung: wie viel Energie ein Gerät pro Sekunde braucht." },
      { termino: "Kilowattstunde (kWh)", definicion: `${formatearNumero(ctx, 1000)} W eine Stunde lang. Danach wird Strom abgerechnet.` },
      { termino: "Arbeitspreis", definicion: "Der Preis pro verbrauchter kWh, ohne den monatlichen Grundpreis." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
