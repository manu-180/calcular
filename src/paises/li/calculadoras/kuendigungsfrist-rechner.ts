import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { monatsende, plusMonate, plusTage, vollendeteJahre } from "../lib/datum";

export default definirCalculadora({
  id: "li.kuendigungsfrist-rechner",
  mercado: "li",
  concepto: "preaviso",
  slug: "kuendigungsfrist-rechner",
  estado: "publicado",
  requiere: { "li.kuendigungsfristen": "mapa" },
  campos: [
    { id: "beginn", tipo: "fecha", etiqueta: "Beginn des Arbeitsverhältnisses", min: "1970-01-01", porDefecto: "2022-03-01" },
    { id: "zugang", tipo: "fecha", etiqueta: "Tag, an dem die Kündigung beim Empfänger eintrifft", min: "1970-01-01", porDefecto: "hoy" },
    { id: "probezeit", tipo: "entero", etiqueta: "Probezeit in Monaten", min: 0, max: 3, porDefecto: 1, ayuda: "Ohne Abrede gilt der erste Monat als Probezeit, höchstens drei Monate sind möglich." },
    { id: "vertragFrist", tipo: "entero", etiqueta: "Kündigungsfrist laut Vertrag in Monaten (falls abweichend)", min: 1, max: 12, requerido: false },
  ],
  calcular(entrada, valores) {
    if (entrada.zugang < entrada.beginn) throw new ErrorEntrada("Die Kündigung kann nicht vor Beginn des Arbeitsverhältnisses eintreffen.", "zugang");
    if (!Number.isInteger(entrada.probezeit) || entrada.probezeit < 0 || entrada.probezeit > 3) throw new ErrorEntrada("Die Probezeit dauert höchstens drei Monate.", "probezeit");
    const fristen = valores["li.kuendigungsfristen"];
    const probezeitEnde = entrada.probezeit > 0 ? plusTage(plusMonate(entrada.beginn, entrada.probezeit), -1) : null;
    if (probezeitEnde !== null && entrada.zugang <= probezeitEnde) {
      const tage = enMapa(fristen, "probezeit-tage");
      return {
        ende: plusTage(entrada.zugang, tage),
        frist: `${tage} Tage (Probezeit)`,
        dienstjahr: 1,
        observaciones: ["In der Probezeit wird auf das Ende einer Arbeitswoche gekündigt. Das Arbeitsverhältnis endet am Ende der Arbeitswoche, in die dieser Tag fällt."],
      };
    }
    const dienstjahr = vollendeteJahre(entrada.beginn, entrada.zugang) + 1;
    const gesetz = dienstjahr === 1 ? enMapa(fristen, "dienstjahr-1") : dienstjahr <= 9 ? enMapa(fristen, "dienstjahr-2-9") : enMapa(fristen, "ab-dienstjahr-10");
    const monate = entrada.vertragFrist ?? gesetz;
    const hinweise = [
      "Kündigt der Arbeitgeber nach der Probezeit, gelten Sperrfristen, etwa bei Krankheit, Unfall oder Schwangerschaft. Eine Kündigung während einer Sperrfrist ist nichtig, eine laufende Frist wird unterbrochen.",
    ];
    if (entrada.vertragFrist !== null && entrada.vertragFrist < gesetz) hinweise.unshift("Abweichende Fristen gelten nur, wenn sie schriftlich, im Normal- oder im Gesamtarbeitsvertrag vereinbart sind. Unter einen Monat geht es nur per Gesamtarbeitsvertrag im ersten Dienstjahr.");
    return {
      ende: monatsende(plusMonate(entrada.zugang, monate)),
      frist: `${monate} ${monate === 1 ? "Monat" : "Monate"} auf ein Monatsende`,
      dienstjahr,
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "ende", etiqueta: "Ende des Arbeitsverhältnisses", formato: "fecha", destacada: true },
    { clave: "frist", etiqueta: "Kündigungsfrist", formato: "texto" },
    { clave: "dienstjahr", etiqueta: "Dienstjahr bei Eintreffen der Kündigung", formato: "numero", decimales: 0 },
  ],
});
