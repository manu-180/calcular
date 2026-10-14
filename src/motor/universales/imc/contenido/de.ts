import { paraSuiza } from "../../comun/locales";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Wer 160 lb wiegt und 5 ft 9 in groß ist, hat einen BMI von ${n((160 * KG_POR_LB) / (m * m))}. Das ist Normalgewicht.`,
        `Bei dieser Größe liegt das Normalgewicht zwischen ${n((18.5 * m * m) / KG_POR_LB)} und ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Wer 70 kg wiegt und ${n(1.75, 2)} m groß ist, hat einen BMI von ${n(70 / (1.75 * 1.75))}. Das ist Normalgewicht.`,
        `Bei dieser Größe liegt das Normalgewicht zwischen ${n(18.5 * 1.75 * 1.75)} und ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  const c = {
    h1: "BMI-Rechner",
    title: tituloQueEntre(
      `BMI-Rechner: Body-Mass-Index berechnen | ${ctx.nombrePais}`,
      `BMI-Rechner | ${ctx.nombrePais}`,
      "BMI-Rechner",
    ),
    description:
      "Berechnen Sie Ihren Body-Mass-Index aus Gewicht und Körpergröße. Mit Einstufung nach WHO und Normalgewicht für Ihre Größe.",
    intro: [
      "Geben Sie Gewicht und Körpergröße ein. Sie sehen Ihren BMI, die Einstufung nach der Weltgesundheitsorganisation (WHO) und den Bereich des Normalgewichts für Ihre Größe.",
      "Der BMI ist ein grober Richtwert für Erwachsene. Er ersetzt keine ärztliche Beratung.",
    ],
    comoSeCalcula: [
      imperial
        ? "BMI = Gewicht in Pfund × 703 ÷ (Größe in Zoll × Größe in Zoll)."
        : "BMI = Gewicht in Kilogramm ÷ (Größe in Metern × Größe in Metern).",
      `Unter ${n(18.5)} gilt als Untergewicht, ${n(18.5)} bis ${n(24.9)} als Normalgewicht, 25 bis ${n(29.9)} als Übergewicht. Ab 30 spricht man von Adipositas.`,
      `Das Normalgewicht ist der Bereich, der bei Ihrer Größe einen BMI zwischen ${n(18.5)} und ${n(24.9)} ergibt.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Welcher BMI ist normal?",
        respuesta: `Für die WHO ein BMI zwischen ${n(18.5)} und ${n(24.9)} bei Erwachsenen. Die Grenzen sind für Frauen und Männer gleich.`,
      },
      {
        pregunta: "Ist der BMI für alle aussagekräftig?",
        respuesta: "Nein. Er unterscheidet nicht zwischen Muskeln und Fett. Sehr muskulöse Menschen können deshalb einen hohen Wert haben. In der Schwangerschaft und bei Kindern und Jugendlichen wird er anders bewertet.",
      },
      {
        pregunta: "Spielt das Alter beim BMI eine Rolle?",
        respuesta: "Die WHO-Einstufung gilt für alle Erwachsenen gleich. Bei älteren Menschen sehen manche Fachleute einen etwas höheren Wert als unbedenklich an. Das klären Sie am besten in der ärztlichen Praxis.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Body-Mass-Index. Er setzt das Körpergewicht ins Verhältnis zur Körpergröße." },
      { termino: "WHO", definicion: "Weltgesundheitsorganisation. Sie legt die BMI-Einstufung für Erwachsene fest." },
      { termino: "Adipositas", definicion: "Der Fachbegriff für starkes Übergewicht, ab einem BMI von 30." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
