import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { lesen, monatsende, plusMonate, plusTage, schreiben, volleJahre, vor } from "../lib/datum";

export default definirCalculadora({
  id: "de.kuendigungsfrist-rechner",
  mercado: "de",
  concepto: "preaviso",
  slug: "kuendigungsfrist-rechner",
  estado: "publicado",
  requiere: { "de.kuendigungsfristen": "mapa" },
  campos: [
    {
      id: "seite",
      tipo: "opcion",
      etiqueta: "Wer kündigt?",
      opciones: [
        { valor: "arbeitgeber", etiqueta: "Der Arbeitgeber" },
        { valor: "arbeitnehmer", etiqueta: "Ich als Arbeitnehmer" },
      ],
      porDefecto: "arbeitgeber",
    },
    { id: "beginn", tipo: "fecha", etiqueta: "Beginn des Arbeitsverhältnisses", porDefecto: "hoy" },
    { id: "zugang", tipo: "fecha", etiqueta: "Tag, an dem die Kündigung zugeht", porDefecto: "hoy" },
    { id: "probezeit", tipo: "si-no", etiqueta: "Kündigung in der vereinbarten Probezeit (höchstens sechs Monate)", porDefecto: false },
  ],
  calcular(entrada, valores) {
    const beginn = lesen(entrada.beginn);
    const zugang = lesen(entrada.zugang);
    if (vor(zugang, beginn)) throw new ErrorEntrada("Die Kündigung kann nicht vor Beginn des Arbeitsverhältnisses zugehen.", "zugang");
    const jahre = volleJahre(beginn, zugang);
    if (entrada.probezeit) {
      return { ende: schreiben(plusTage(zugang, 14)), frist: "2 Wochen (Probezeit)", jahre, observaciones: [] };
    }
    const stufen = Object.entries(valores["de.kuendigungsfristen"])
      .map(([j, m]) => [Number(j), m] as const)
      .filter(([j]) => j <= jahre)
      .sort((a, b) => b[0] - a[0]);
    if (entrada.seite === "arbeitgeber" && stufen.length > 0) {
      const monate = stufen[0][1];
      return {
        ende: schreiben(monatsende(plusMonate(zugang, monate))),
        frist: `${monate} ${monate === 1 ? "Monat" : "Monate"} zum Monatsende`,
        jahre,
        observaciones: ["Tarifverträge können andere Fristen festlegen. Prüfen Sie auch Ihren Arbeitsvertrag."],
      };
    }
    const frueheste = plusTage(zugang, 28);
    const ende = frueheste.t <= 15 ? { ...frueheste, t: 15 } : monatsende(frueheste);
    return {
      ende: schreiben(ende),
      frist: "4 Wochen zum 15. oder zum Monatsende",
      jahre,
      observaciones:
        entrada.seite === "arbeitnehmer"
          ? ["Für Ihre eigene Kündigung gilt diese Grundfrist, egal wie lange Sie im Betrieb sind, sofern Vertrag oder Tarifvertrag nichts anderes vorsehen."]
          : [],
    };
  },
  resultado: [
    { clave: "ende", etiqueta: "Letzter Tag des Arbeitsverhältnisses", formato: "fecha", destacada: true },
    { clave: "frist", etiqueta: "Kündigungsfrist", formato: "texto" },
    { clave: "jahre", etiqueta: "Volle Jahre im Betrieb beim Zugang", formato: "anios" },
  ],
});
