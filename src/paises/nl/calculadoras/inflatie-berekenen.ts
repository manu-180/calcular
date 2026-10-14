import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { maandTekst } from "../lib/datum";
import { prijsverandering } from "../lib/prijsindex";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "nl.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "nl.inflatie-berekenen",
  mercado: "nl",
  concepto: "inflacion",
  slug: "inflatie-berekenen",
  estado: "publicado",
  requiere: {
    "nl.cpi": "serie",
  },
  campos: [
    { id: "bedrag", tipo: "moneda", etiqueta: "Bedrag", min: 0, porDefecto: 1000 },
    { id: "van", tipo: "fecha", etiqueta: "Maand van het oorspronkelijke bedrag", min: "2009-12-01", porDefecto: "2020-01-01", ayuda: "We gebruiken de CPI van die maand. De dag maakt niet uit." },
    { id: "tot", tipo: "fecha", etiqueta: "Maand waarnaar je wilt omrekenen", min: "2009-12-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const p = prijsverandering(CPI, valores["nl.cpi"], entrada.van, entrada.tot);
    return {
      nieuwBedrag: redondear(entrada.bedrag * p.factor),
      verschil: redondear(entrada.bedrag * p.factor - entrada.bedrag),
      totaal: p.totaal,
      factor: p.factor,
      jaar: p.jaar,
      maand: p.maand,
      beginmaand: maandTekst(p.beginmaand),
      indexBegin: p.indexBegin,
      eindmaand: maandTekst(p.eindmaand),
      indexEind: p.indexEind,
      observaciones: p.observaciones,
    };
  },
  resultado: [
    { clave: "nieuwBedrag", etiqueta: "Bedrag in geld van nu", formato: "moneda", destacada: true },
    { clave: "verschil", etiqueta: "Stijging door inflatie", formato: "moneda" },
    { clave: "totaal", etiqueta: "Inflatie over de hele periode", formato: "porcentaje", decimales: 2 },
    { clave: "factor", etiqueta: "Factor", formato: "numero", decimales: 4 },
    { clave: "jaar", etiqueta: "Inflatie over 12 maanden (laatste maand)", formato: "porcentaje", decimales: 2 },
    { clave: "maand", etiqueta: "Prijsverandering in de laatste maand", formato: "porcentaje", decimales: 2 },
    { clave: "beginmaand", etiqueta: "Beginmaand", formato: "texto" },
    { clave: "indexBegin", etiqueta: "CPI in de beginmaand (2025 = 100)", formato: "numero", decimales: 2 },
    { clave: "eindmaand", etiqueta: "Eindmaand", formato: "texto" },
    { clave: "indexEind", etiqueta: "CPI in de eindmaand (2025 = 100)", formato: "numero", decimales: 2 },
  ],
});
