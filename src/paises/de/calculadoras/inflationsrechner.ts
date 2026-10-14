import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { monatsname, veraenderungZwischen } from "../lib/index-preise";
import series from "../series.json";

const VPI = (series.series.find((s) => s.id === "de.vpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "de.inflationsrechner",
  mercado: "de",
  concepto: "inflacion",
  slug: "inflationsrechner",
  estado: "publicado",
  requiere: { "de.vpi": "serie" },
  campos: [
    { id: "betrag", tipo: "moneda", etiqueta: "Betrag in Euro", min: 0, porDefecto: 1000 },
    { id: "von", tipo: "fecha", etiqueta: "Monat des ursprünglichen Betrags", min: "2000-01-01", porDefecto: "2020-01-01", ayuda: "Es zählt der Verbraucherpreisindex dieses Monats; der Tag spielt keine Rolle." },
    { id: "bis", tipo: "fecha", etiqueta: "Monat, auf den Sie umrechnen möchten", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = veraenderungZwischen(VPI, valores["de.vpi"], entrada.von, entrada.bis, { von: "von", bis: "bis" });
    return {
      angepasst: redondear(entrada.betrag * v.faktor),
      differenz: redondear(entrada.betrag * v.faktor - entrada.betrag),
      kaufkraft: redondear(entrada.betrag / v.faktor),
      gesamt: v.gesamt,
      vorjahr: v.vorjahr,
      vormonat: v.vormonat,
      monatAnfang: monatsname(v.monatAnfang),
      indexAnfang: v.indexAnfang,
      monatEnde: monatsname(v.monatEnde),
      indexEnde: v.indexEnde,
      observaciones: v.hinweise,
    };
  },
  resultado: [
    { clave: "angepasst", etiqueta: "Betrag mit gleicher Kaufkraft heute", formato: "moneda", destacada: true },
    { clave: "differenz", etiqueta: "Mehr wegen Inflation", formato: "moneda" },
    { clave: "kaufkraft", etiqueta: "Kaufkraft des Betrags in Preisen des Anfangsmonats", formato: "moneda" },
    { clave: "gesamt", etiqueta: "Inflation im Zeitraum", formato: "porcentaje", decimales: 2 },
    { clave: "vorjahr", etiqueta: "Inflationsrate gegenüber dem Vorjahresmonat", formato: "porcentaje", decimales: 1 },
    { clave: "vormonat", etiqueta: "Veränderung gegenüber dem Vormonat", formato: "porcentaje", decimales: 1 },
    { clave: "monatAnfang", etiqueta: "Anfangsmonat", formato: "texto" },
    { clave: "indexAnfang", etiqueta: "Verbraucherpreisindex im Anfangsmonat", formato: "numero", decimales: 1 },
    { clave: "monatEnde", etiqueta: "Endmonat", formato: "texto" },
    { clave: "indexEnde", etiqueta: "Verbraucherpreisindex im Endmonat", formato: "numero", decimales: 1 },
  ],
});
