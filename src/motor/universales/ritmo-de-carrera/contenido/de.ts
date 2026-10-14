import { paraSuiza } from "../../comun/locales";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "Meile" : "Kilometer";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const c = {
    h1: "Pace-Rechner",
    title: tituloQueEntre(
      `Pace-Rechner: Laufzeit und Pace berechnen | ${ctx.nombrePais}`,
      `Pace-Rechner | ${ctx.nombrePais}`,
      "Pace-Rechner",
    ),
    description: `Berechnen Sie Ihre Pace pro ${u}, Ihre Zielzeit oder die Strecke für 5 km, 10 km, Halbmarathon oder Marathon.`,
    intro: [
      "Aus zwei der drei Werte (Strecke, Zeit und Pace) ergibt sich der dritte. So planen Sie einen Wettkampf oder prüfen einen Trainingslauf.",
      "Die Strecken 5 km, 10 km, Halbmarathon und Marathon sind schon hinterlegt.",
    ],
    comoSeCalcula: [
      `Pace = Zeit ÷ Strecke, in Minuten und Sekunden pro ${u}.`,
      "Zeit = Pace × Strecke.",
      "Strecke = Zeit ÷ Pace. Die Durchschnittsgeschwindigkeit ist die Strecke geteilt durch die Stunden.",
    ],
    ejemplo: imperial
      ? [
          `3 Meilen in 27 Minuten entsprechen einer Pace von 9:00 pro Meile, also ${n(20 / 3, 2)} mph.`,
          `Ein Halbmarathon (${n(media, 2)} mi) mit ${ritmoTexto(ritmoMedia)} pro Meile dauert ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km in 50 Minuten entsprechen einer Pace von 5:00 pro Kilometer, also 12 km/h.",
          `Ein Halbmarathon (${n(media, 1)} ${corto}) mit ${ritmoTexto(ritmoMedia)} pro Kilometer dauert ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Wie berechne ich meine Pace pro ${u}?`,
        respuesta: imperial
          ? `Rechnen Sie die Zeit in Minuten um und teilen Sie durch die Meilen. 3 Meilen in 28:30 Minuten sind ${n(9.5, 1)} Minuten pro Meile, also 9:30.`
          : `Rechnen Sie die Zeit in Minuten um und teilen Sie durch die Kilometer. 10 km in 55 Minuten sind ${n(5.5, 1)} Minuten pro Kilometer, also 5:30.`,
      },
      {
        pregunta: "Welche Pace ist für Einsteiger gut?",
        respuesta: "Eine, bei der Sie sich beim Laufen noch unterhalten können. Mit wachsender Kondition wird sie von allein schneller.",
      },
      {
        pregunta: "Wie lang ist ein Marathon?",
        respuesta: `${n(DISTANCIAS_KM.maraton, 3)} km. Ein Halbmarathon ist halb so lang, also ${n(DISTANCIAS_KM.media, 4)} km.`,
      },
      {
        pregunta: "Wie rechne ich Pace in km/h um?",
        respuesta: "Teilen Sie 60 durch die Pace in Minuten. Eine Pace von 5:00 pro Kilometer entspricht 60 ÷ 5 = 12 km/h.",
      },
    ],
    glosario: [
      { termino: "Pace", definicion: "Die Zeit, die Sie für einen Kilometer oder eine Meile brauchen." },
      { termino: "Durchschnittsgeschwindigkeit", definicion: "Die Strecke, die Sie im Schnitt pro Stunde zurücklegen." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
