import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Eine Terrasse von 10 × 10 ft mit 4 in Dicke braucht ${n(ft3)} ft³ Beton, also ${n(ft3 / 27)} Kubikyard.`,
          `Mit der Standardmischung sind das etwa ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb Zement.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Eine Bodenplatte von 4 × 3 m mit 10 cm Dicke braucht ${n(volumen, 1)} m³ Beton.`,
          `Mit der Standardmischung sind das etwa ${n(MEZCLA.cementoKg * volumen, 0)} kg Zement, ${n(MEZCLA.arenaM3 * volumen)} m³ Sand und ${n(MEZCLA.piedraM3 * volumen)} m³ Kies.`,
        ];
      })();
  const c = {
    h1: "Betonrechner",
    title: tituloQueEntre(
      `Betonrechner: Beton und Zement berechnen | ${ctx.nombrePais}`,
      `Betonrechner | ${ctx.nombrePais}`,
      "Betonrechner",
    ),
    description: `Berechnen Sie, wie viel Beton Sie für eine Platte brauchen, in ${imperial ? "Kubikyard" : "Kubikmetern"}, und ungefähr wie viel Zement, Sand und Kies.`,
    intro: [
      "Geben Sie Länge, Breite und Dicke ein. Sie sehen das Betonvolumen und die ungefähren Materialmengen zum Anmischen.",
      "Die Mengen hängen von der Rezeptur ab. Der Rechner geht von einer Standardmischung 1:2:3 aus.",
    ],
    comoSeCalcula: [
      imperial
        ? "Volumen = Länge × Breite × Dicke, die Dicke in Fuß. Kubikfuß geteilt durch 27 ergibt Kubikyard."
        : "Volumen = Länge × Breite × Dicke, die Dicke in Metern.",
      "Dazu kommt der Zuschlag für Unebenheiten und Verluste.",
      `Pro m³: etwa ${MEZCLA.cementoKg} kg Zement, ${n(MEZCLA.arenaM3)} m³ Sand, ${n(MEZCLA.piedraM3, 1)} m³ Kies und ${MEZCLA.aguaL} Liter Wasser.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Wie viel Zement steckt in einem Kubikmeter Beton?",
        respuesta: `Bei einer Mischung 1:2:3 etwa ${MEZCLA.cementoKg} kg. Für höhere Festigkeit braucht es mehr Zement.`,
      },
      {
        pregunta: "Wie viele Säcke Zement brauche ich?",
        respuesta: `Teilen Sie die Zementmenge durch das Gewicht eines Sacks. Für 1 m³ mit ${MEZCLA.cementoKg} kg sind das 14 Säcke zu 25 kg oder 7 Säcke zu 50 kg.`,
      },
      {
        pregunta: "Lohnt sich Fertigbeton?",
        respuesta: "Bei größeren Mengen meist ja. Transportbeton ist gleichmäßiger und schneller eingebaut. Für kleine Arbeiten mischt man oft selbst mit diesen Mengen.",
      },
    ],
    glosario: [
      { termino: "Mischungsverhältnis", definicion: "Das Verhältnis von Zement, Sand und Kies in einer Betonmischung." },
      { termino: "Transportbeton", definicion: "Fertig gemischter Beton, der im Fahrmischer auf die Baustelle kommt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
