import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { breytingVisitolu, manudurAr } from "../lib/visitala";
import series from "../series.json";

const PUNKTAR = (series.series.find((s) => s.id === "is.vnv")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "is.verdbolga",
  mercado: "is",
  concepto: "inflacion",
  slug: "verdbolga",
  estado: "publicado",
  requiere: { "is.vnv": "serie" },
  campos: [
    { id: "upphaed", tipo: "moneda", etiqueta: "Upphæð", min: 0, porDefecto: 100000 },
    { id: "fra", tipo: "fecha", etiqueta: "Frá hvaða mánuði er upphæðin?", min: "2016-01-01", porDefecto: "2020-01-01", ayuda: "Aðeins mánuðurinn skiptir máli." },
    { id: "til", tipo: "fecha", etiqueta: "Til hvaða mánaðar viltu reikna?", min: "2016-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.upphaed <= 0) throw new ErrorEntrada("Sláðu inn upphæð hærri en núll.", "upphaed");
    const b = breytingVisitolu(PUNKTAR, v["is.vnv"], e.fra, e.til, { fra: "fra", til: "til" });
    const ny = redondear(e.upphaed * b.margfaldari);
    return { ny, munur: ny - e.upphaed, virdi: redondear(e.upphaed / b.margfaldari), prosent: b.prosent, manudurFra: manudurAr(b.fra), manudurTil: manudurAr(b.til), observaciones: b.athugasemdir };
  },
  resultado: [
    { clave: "ny", etiqueta: "Sami kaupmáttur", formato: "moneda", destacada: true },
    { clave: "munur", etiqueta: "Hækkun vegna verðbólgu", formato: "moneda" },
    { clave: "virdi", etiqueta: "Virði upphæðar á verðlagi upphafsmánaðar", formato: "moneda" },
    { clave: "prosent", etiqueta: "Verðbólga á tímabilinu", formato: "porcentaje", decimales: 1 },
    { clave: "manudurFra", etiqueta: "Frá", formato: "texto" },
    { clave: "manudurTil", etiqueta: "Til", formato: "texto" },
  ],
});
