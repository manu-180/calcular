import { paraSuiza } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 8000);
  const r = tarifa({ ingreso, gastos, impuestos: 30, diasLibres: 40, diasSemana: 5, horasSemana: 25 });
  const c = {
    h1: "Stundensatz berechnen",
    title: tituloQueEntre(
      `Stundensatz-Rechner für Selbstständige | ${ctx.nombrePais}`,
      `Stundensatz-Rechner | ${ctx.nombrePais}`,
      "Stundensatz-Rechner",
    ),
    description:
      "Berechnen Sie Ihren Stunden- und Tagessatz als Selbstständige oder Freelancer aus Wunscheinkommen, Ausgaben, Steuern, freien Tagen und abrechenbaren Stunden.",
    intro: [
      "Der häufigste Fehler beim Start in die Selbstständigkeit: das frühere Bruttogehalt durch 160 Stunden teilen. Dabei fehlen Steuern, Ausgaben, Urlaub und jede Stunde, die Sie nicht abrechnen können.",
      "Dieser Rechner geht von dem aus, was Ihnen am Ende bleiben soll, und zeigt, was Sie dafür verlangen müssen.",
    ],
    comoSeCalcula: [
      "Nötiger Umsatz = Nettoeinkommen ÷ (1 − Steuersatz) + Betriebsausgaben.",
      "Arbeitstage = 52 Wochen × Arbeitstage pro Woche − freie Tage.",
      "Abrechenbare Stunden pro Jahr = Arbeitstage × abrechenbare Stunden pro Tag.",
      "Stundensatz = nötiger Umsatz ÷ abrechenbare Stunden pro Jahr.",
    ],
    ejemplo: [
      `Damit Ihnen ${m(ingreso)} im Jahr bleiben, bei ${m(gastos)} Ausgaben und 30 % Steuern und Abgaben, brauchen Sie ${m(r.facturado)} Umsatz.`,
      `Mit 40 freien Tagen und 25 abrechenbaren Stunden pro Woche sind das ${Math.round(r.horas)} Stunden im Jahr: ein Stundensatz von ${m(r.hora)} oder ein Tagessatz von ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Wie viele Stunden pro Woche kann ich abrechnen?",
        respuesta: "Weniger, als Sie arbeiten. Akquise, E-Mails, Rechnungen und Weiterbildung kosten Zeit, die niemand bezahlt. Üblich sind 20 bis 30 abrechenbare Stunden von 40.",
      },
      {
        pregunta: "Besser nach Stunden oder pauschal pro Projekt abrechnen?",
        respuesta: "Beides funktioniert. Auch bei einem Pauschalpreis sollten Sie die Stunden schätzen und mit diesem Satz multiplizieren, damit die Rechnung aufgeht.",
      },
      {
        pregunta: "Mit welchem Steuersatz soll ich rechnen?",
        respuesta: "Das hängt von Land, Einkommen und Rechtsform ab. Rechnen Sie Einkommensteuer und Sozialabgaben zusammen. Im Zweifel fragen Sie Ihre Steuerberatung.",
      },
    ],
    glosario: [
      { termino: "Abrechenbare Stunden", definicion: "Arbeitsstunden, die Sie einem Kunden in Rechnung stellen." },
      { termino: "Tagessatz", definicion: "Was Sie für einen Arbeitstag berechnen: Stundensatz mal abrechenbare Stunden pro Tag." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
