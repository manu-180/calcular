import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { plusTage, vollendeteJahre } from "../lib/datum";

export default definirCalculadora({
  id: "li.sperrfrist-rechner",
  mercado: "li",
  concepto: "propio",
  slug: "sperrfrist-rechner",
  estado: "publicado",
  requiere: { "li.sperrfristen": "mapa" },
  campos: [
    { id: "beginn", tipo: "fecha", etiqueta: "Beginn des Arbeitsverhältnisses", min: "1970-01-01", porDefecto: "2022-03-01" },
    { id: "krank", tipo: "fecha", etiqueta: "Erster Tag der Arbeitsunfähigkeit (Krankheit oder Unfall)", min: "1970-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    if (entrada.krank < entrada.beginn) throw new ErrorEntrada("Die Arbeitsunfähigkeit kann nicht vor Beginn des Arbeitsverhältnisses liegen.", "krank");
    const dienstjahr = vollendeteJahre(entrada.beginn, entrada.krank) + 1;
    const f = valores["li.sperrfristen"];
    const tage = dienstjahr === 1 ? enMapa(f, "dienstjahr-1") : dienstjahr <= 5 ? enMapa(f, "dienstjahr-2-5") : enMapa(f, "ab-dienstjahr-6");
    return {
      ende: plusTage(entrada.krank, tage - 1),
      tage,
      dienstjahr,
      observaciones: [
        "Die Sperrfrist gilt nur nach der Probezeit, bei unverschuldeter Arbeitsunfähigkeit und nur für Kündigungen durch den Arbeitgeber. Weitere Sperrfristen gelten während der Schwangerschaft und der Mutterschaftszeit.",
        "Fällt das Ende der unterbrochenen Kündigungsfrist nicht auf das Monatsende, verlängert sie sich bis zum nächsten Monatsende.",
      ],
    };
  },
  resultado: [
    { clave: "ende", etiqueta: "Letzter Tag der Sperrfrist", formato: "fecha", destacada: true },
    { clave: "tage", etiqueta: "Dauer der Sperrfrist", formato: "dias", decimales: 0 },
    { clave: "dienstjahr", etiqueta: "Dienstjahr bei Beginn der Arbeitsunfähigkeit", formato: "numero", decimales: 0 },
  ],
});
