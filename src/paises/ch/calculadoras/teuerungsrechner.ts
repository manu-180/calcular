import { definirCalculadora } from "@/motor/calculo";
import { monatsname } from "../lib/datum";
import { veraenderungZwischen } from "../lib/lik";

export default definirCalculadora({
  id: "ch.teuerungsrechner",
  mercado: "ch",
  concepto: "inflacion",
  slug: "teuerungsrechner",
  estado: "publicado",
  requiere: { "ch.lik": "serie" },
  campos: [
    { id: "betrag", tipo: "moneda", etiqueta: "Betrag in Franken", min: 0, porDefecto: 1000 },
    { id: "von", tipo: "fecha", etiqueta: "Monat des ursprünglichen Betrags", min: "2000-01-01", porDefecto: "2020-01-01", ayuda: "Es zählt der Indexstand dieses Monats, der Tag spielt keine Rolle." },
    { id: "bis", tipo: "fecha", etiqueta: "Monat, auf den Sie umrechnen möchten", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = veraenderungZwischen(valores["ch.lik"], entrada.von, entrada.bis, { von: "von", bis: "bis" });
    return {
      angepasst: redondear(entrada.betrag * v.faktor),
      differenz: redondear(entrada.betrag * v.faktor - entrada.betrag),
      gesamt: v.gesamt,
      vorjahr: v.vorjahr,
      monatAnfang: monatsname(v.monatAnfang),
      indexAnfang: v.indexAnfang,
      monatEnde: monatsname(v.monatEnde),
      indexEnde: v.indexEnde,
      observaciones: v.hinweise,
    };
  },
  resultado: [
    { clave: "angepasst", etiqueta: "Betrag mit gleicher Kaufkraft", formato: "moneda", destacada: true },
    { clave: "differenz", etiqueta: "Unterschied wegen Teuerung", formato: "moneda" },
    { clave: "gesamt", etiqueta: "Teuerung im Zeitraum", formato: "porcentaje", decimales: 2 },
    { clave: "vorjahr", etiqueta: "Jahresteuerung im Endmonat", formato: "porcentaje", decimales: 1 },
    { clave: "monatAnfang", etiqueta: "Anfangsmonat", formato: "texto" },
    { clave: "indexAnfang", etiqueta: "LIK im Anfangsmonat (Dezember 2025 = 100)", formato: "numero", decimales: 1 },
    { clave: "monatEnde", etiqueta: "Endmonat", formato: "texto" },
    { clave: "indexEnde", etiqueta: "LIK im Endmonat", formato: "numero", decimales: 1 },
  ],
});
