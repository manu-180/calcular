import { definirCalculadora } from "@/motor/calculo";
import { eoTaggeld, ERWERBSART, REQ_EO, type Erwerbsart } from "../lib/eo";

export default definirCalculadora({
  id: "ch.mutterschaftsentschaedigung-rechner",
  mercado: "ch",
  concepto: "propio",
  slug: "mutterschaftsentschaedigung-rechner",
  estado: "publicado",
  requiere: { ...REQ_EO, "ch.mutterschaft-tage": "numero" },
  campos: [
    { id: "art", tipo: "opcion", etiqueta: "Erwerbsart", opciones: ERWERBSART, porDefecto: "angestellt" },
    { id: "einkommen", tipo: "moneda", etiqueta: "Einkommen vor der Geburt (Monatslohn oder Jahreseinkommen)", min: 0, porDefecto: 5250 },
  ],
  calcular(entrada, valores, { redondear }) {
    const t = eoTaggeld(entrada.einkommen, entrada.art as Erwerbsart, valores["ch.eo-taggeld-satz"], valores["ch.eo-hoechstbetrag-taggeld"], redondear);
    const tage = valores["ch.mutterschaft-tage"];
    return {
      taggeld: t.taggeld,
      tagesverdienst: t.tagesverdienst,
      ungekuerzt: t.ungekuerzt,
      tage,
      total: redondear(t.taggeld * tage),
      observaciones: [
        ...(t.gekuerzt ? [`Das Taggeld ist auf den Höchstbetrag von ${valores["ch.eo-hoechstbetrag-taggeld"]} Franken gekürzt.`] : []),
        "Von der Entschädigung gehen AHV/IV/EO-Beiträge ab, bei Arbeitnehmerinnen auch der ALV-Beitrag.",
      ],
    };
  },
  resultado: [
    { clave: "taggeld", etiqueta: "Taggeld", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Mutterschaftsentschädigung total", formato: "moneda" },
    { clave: "tage", etiqueta: "Anzahl Taggelder", formato: "dias" },
    { clave: "tagesverdienst", etiqueta: "Durchschnittliches Einkommen pro Tag", formato: "moneda" },
    { clave: "ungekuerzt", etiqueta: "Taggeld vor einer Kürzung", formato: "moneda" },
  ],
});
