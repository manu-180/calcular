import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { maandTekst } from "../lib/datum";
import { prijsverandering } from "../lib/prijsindex";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "be.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "be.inflatie-berekenen",
  mercado: "be",
  concepto: "inflacion",
  slug: "inflatie-berekenen",
  estado: "publicado",
  requiere: {
    "be.cpi": "serie",
  },
  campos: [
    { id: "bedrag", tipo: "moneda", etiqueta: "Bedrag", min: 0, porDefecto: 1000 },
    { id: "van", tipo: "fecha", etiqueta: "Maand van het oorspronkelijke bedrag", min: "2024-12-01", porDefecto: "2025-01-01", ayuda: "We gebruiken de consumptieprijsindex van die maand. De dag maakt niet uit." },
    { id: "tot", tipo: "fecha", etiqueta: "Maand waarnaar je wilt omrekenen", min: "2024-12-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const p = prijsverandering(CPI, valores["be.cpi"], entrada.van, entrada.tot);
    return {
      nieuwBedrag: redondear(entrada.bedrag * p.factor),
      verschil: redondear(entrada.bedrag * p.factor - entrada.bedrag),
      totaal: p.totaal,
      jaar: p.jaar,
      beginmaand: maandTekst(p.beginmaand),
      indexBegin: p.indexBegin,
      eindmaand: maandTekst(p.eindmaand),
      indexEind: p.indexEind,
      observaciones: p.observaciones,
    };
  },
  resultado: [
    { clave: "nieuwBedrag", etiqueta: "Bedrag in prijzen van de eindmaand", formato: "moneda", destacada: true },
    { clave: "verschil", etiqueta: "Stijging door inflatie", formato: "moneda" },
    { clave: "totaal", etiqueta: "Inflatie over de hele periode", formato: "porcentaje", decimales: 2 },
    { clave: "jaar", etiqueta: "Inflatie over 12 maanden (eindmaand)", formato: "porcentaje", decimales: 2 },
    { clave: "beginmaand", etiqueta: "Beginmaand", formato: "texto" },
    { clave: "indexBegin", etiqueta: "Consumptieprijsindex in de beginmaand (2013 = 100)", formato: "numero", decimales: 2 },
    { clave: "eindmaand", etiqueta: "Eindmaand", formato: "texto" },
    { clave: "indexEind", etiqueta: "Consumptieprijsindex in de eindmaand (2013 = 100)", formato: "numero", decimales: 2 },
  ],
});
