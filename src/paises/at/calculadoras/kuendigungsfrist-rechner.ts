import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { lesen, monatsende, plusMonate, plusTage, schreiben, vergleich, volleJahre, type Tag } from "../lib/datum";

function naechsterTermin(fruehestens: Tag, termin: string): Tag {
  if (termin === "monatsende") return monatsende(fruehestens);
  if (termin === "fuenfzehnter") {
    const fuenfzehnter = { ...fruehestens, t: 15 };
    return vergleich(fruehestens, fuenfzehnter) <= 0 ? fuenfzehnter : monatsende(fruehestens);
  }
  const quartalsmonat = Math.ceil(fruehestens.m / 3) * 3;
  return monatsende({ j: fruehestens.j, m: quartalsmonat, t: 1 });
}

export default definirCalculadora({
  id: "at.kuendigungsfrist-rechner",
  mercado: "at",
  concepto: "preaviso",
  slug: "kuendigungsfrist-rechner",
  estado: "publicado",
  requiere: { "at.kuendigungsfristen": "mapa" },
  campos: [
    {
      id: "wer",
      tipo: "opcion",
      etiqueta: "Wer kündigt?",
      opciones: [
        { valor: "arbeitgeber", etiqueta: "Der Arbeitgeber" },
        { valor: "arbeitnehmer", etiqueta: "Ich als Arbeitnehmer" },
      ],
      porDefecto: "arbeitgeber",
    },
    { id: "beginn", tipo: "fecha", etiqueta: "Beginn des Arbeitsverhältnisses", porDefecto: "2020-03-01" },
    { id: "zugang", tipo: "fecha", etiqueta: "Tag, an dem die Kündigung zugeht", porDefecto: "hoy" },
    {
      id: "termin",
      tipo: "opcion",
      etiqueta: "Kündigungstermin für den Arbeitgeber",
      opciones: [
        { valor: "quartal", etiqueta: "Quartalsende (gesetzlicher Regelfall)" },
        { valor: "fuenfzehnter", etiqueta: "15. oder Monatsletzter (im Vertrag vereinbart)" },
        { valor: "monatsende", etiqueta: "Monatsletzter (im Vertrag vereinbart)" },
      ],
      porDefecto: "quartal",
    },
  ],
  calcular(entrada, valores) {
    const f = valores["at.kuendigungsfristen"];
    const beginn = lesen(entrada.beginn);
    const zugang = lesen(entrada.zugang);
    if (vergleich(zugang, beginn) < 0) throw new ErrorEntrada("Die Kündigung kann nicht vor dem Beginn des Arbeitsverhältnisses zugehen.", "zugang");
    const jahre = volleJahre(beginn, zugang);
    let frist: string;
    let ende: Tag;
    if (entrada.wer === "arbeitnehmer") {
      frist = f["monate-arbeitnehmer"] === 1 ? "1 Monat" : `${f["monate-arbeitnehmer"]} Monate`;
      ende = monatsende(plusMonate(zugang, f["monate-arbeitnehmer"]));
    } else if (jahre < 2) {
      frist = `${f["wochen-bis-2"]} Wochen`;
      ende = naechsterTermin(plusTage(zugang, f["wochen-bis-2"] * 7), entrada.termin);
    } else {
      const monate = jahre >= 25 ? f["monate-ab-25"] : jahre >= 15 ? f["monate-ab-15"] : jahre >= 5 ? f["monate-ab-5"] : f["monate-ab-2"];
      frist = `${monate} Monate`;
      ende = naechsterTermin(plusMonate(zugang, monate), entrada.termin);
    }
    return {
      ende: schreiben(ende),
      frist,
      dienstjahre: jahre,
      observaciones: ["Der Rechner zählt die vollendeten Dienstjahre am Tag, an dem die Kündigung zugeht. In Branchen, in denen Saisonbetriebe überwiegen, kann der Kollektivvertrag abweichende Fristen festlegen."],
    };
  },
  resultado: [
    { clave: "ende", etiqueta: "Frühestes Ende des Arbeitsverhältnisses", formato: "fecha", destacada: true },
    { clave: "frist", etiqueta: "Kündigungsfrist", formato: "texto" },
    { clave: "dienstjahre", etiqueta: "Vollendete Dienstjahre", formato: "anios" },
  ],
});
