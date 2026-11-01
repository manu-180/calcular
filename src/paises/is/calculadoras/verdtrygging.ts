import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { breytingVisitolu, manudurAr } from "../lib/visitala";
import series from "../series.json";

const PUNKTAR = (series.series.find((s) => s.id === "is.verdtrygging")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "is.verdtrygging",
  mercado: "is",
  concepto: "propio",
  slug: "verdtrygging",
  estado: "publicado",
  requiere: { "is.verdtrygging": "serie", "is.vextir-peningakrofur": "mapa" },
  campos: [
    { id: "upphaed", tipo: "moneda", etiqueta: "Upphæð", ayuda: "Til dæmis eftirstöðvar verðtryggðs láns.", min: 0, porDefecto: 30000000 },
    { id: "fra", tipo: "fecha", etiqueta: "Mánuður grunnvísitölu", min: "2016-01-01", porDefecto: "2020-01-01", ayuda: "Aðeins mánuðurinn skiptir máli." },
    { id: "til", tipo: "fecha", etiqueta: "Mánuður til að uppreikna til", min: "2016-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.upphaed <= 0) throw new ErrorEntrada("Sláðu inn upphæð hærri en núll.", "upphaed");
    const b = breytingVisitolu(PUNKTAR, v["is.verdtrygging"], e.fra, e.til, { fra: "fra", til: "til" });
    const ny = redondear(e.upphaed * b.margfaldari);
    return { ny, verdbaetur: ny - e.upphaed, prosent: b.prosent, grunnur: b.visitalaFra, visitala: b.visitalaTil, manudurFra: manudurAr(b.fra), manudurTil: manudurAr(b.til), observaciones: b.athugasemdir };
  },
  resultado: [
    { clave: "ny", etiqueta: "Uppreiknuð upphæð", formato: "moneda", destacada: true },
    { clave: "verdbaetur", etiqueta: "Verðbætur", formato: "moneda" },
    { clave: "prosent", etiqueta: "Hækkun vísitölu", formato: "porcentaje", decimales: 2 },
    { clave: "grunnur", etiqueta: "Grunnvísitala", formato: "numero", decimales: 1 },
    { clave: "visitala", etiqueta: "Vísitala til verðtryggingar", formato: "numero", decimales: 1 },
    { clave: "manudurFra", etiqueta: "Frá", formato: "texto" },
    { clave: "manudurTil", etiqueta: "Til", formato: "texto" },
  ],
});
