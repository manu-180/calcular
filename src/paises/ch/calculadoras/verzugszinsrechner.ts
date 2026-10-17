import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { tageZwischen } from "../lib/datum";

export default definirCalculadora({
  id: "ch.verzugszinsrechner",
  mercado: "ch",
  concepto: "propio",
  slug: "verzugszinsrechner",
  estado: "publicado",
  requiere: { "ch.verzugszins": "numero" },
  campos: [
    { id: "betrag", tipo: "moneda", etiqueta: "Geschuldeter Betrag", min: 0, porDefecto: 5000 },
    { id: "von", tipo: "fecha", etiqueta: "Verzug ab (zum Beispiel Tag nach dem Fälligkeitsdatum)", min: "2000-01-01", porDefecto: "2026-01-01" },
    { id: "bis", tipo: "fecha", etiqueta: "Bis zum", min: "2000-01-01", porDefecto: "hoy" },
    { id: "satz", tipo: "porcentaje", etiqueta: "Vertraglicher Zinssatz (falls höher)", min: 0, max: 30, requerido: false, ayuda: "Leer lassen, dann gilt der gesetzliche Verzugszins." },
    {
      id: "basis",
      tipo: "opcion",
      etiqueta: "Zinstage pro Jahr",
      opciones: [
        { valor: "365", etiqueta: "365 Tage" },
        { valor: "360", etiqueta: "360 Tage" },
      ],
      porDefecto: "365",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tage = tageZwischen(entrada.von, entrada.bis);
    if (tage < 0) throw new ErrorEntrada("Das Enddatum muss nach dem Beginn des Verzugs liegen.", "bis");
    const gesetz = valores["ch.verzugszins"];
    const satz = Math.max(entrada.satz ?? gesetz, gesetz);
    const zins = redondear((entrada.betrag * satz * tage) / 100 / Number(entrada.basis));
    return {
      zins,
      total: redondear(entrada.betrag + zins),
      tage,
      satz,
      observaciones:
        entrada.satz !== null && entrada.satz < gesetz
          ? ["Im Verzug gilt mindestens der gesetzliche Verzugszins, auch wenn der vertragliche Zins tiefer ist."]
          : [],
    };
  },
  resultado: [
    { clave: "zins", etiqueta: "Verzugszins", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Betrag mit Verzugszins", formato: "moneda" },
    { clave: "tage", etiqueta: "Verzugstage", formato: "dias" },
    { clave: "satz", etiqueta: "Zinssatz pro Jahr", formato: "porcentaje", decimales: 2 },
  ],
});
