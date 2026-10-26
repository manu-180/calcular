import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { prisendring } from "../lib/inflasjon";
import { manedOgAr } from "../lib/kalender";
import series from "../series.json";

const KPI = (series.series.find((s) => s.id === "no.kpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "no.kpi-kalkulator",
  mercado: "no",
  concepto: "inflacion",
  slug: "kpi-kalkulator",
  estado: "publicado",
  requiere: { "no.kpi": "serie" },
  campos: [
    { id: "belop", tipo: "moneda", etiqueta: "Beløp", min: 0, porDefecto: 1000 },
    { id: "fra", tipo: "fecha", etiqueta: "Måneden beløpet er fra", min: "2000-01-01", porDefecto: "2015-01-01", ayuda: "Bare måneden teller, ikke dagen." },
    { id: "til", tipo: "fecha", etiqueta: "Måneden du vil regne om til", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.belop <= 0) throw new ErrorEntrada("Skriv inn et beløp over null.", "belop");
    const p = prisendring(KPI, v["no.kpi"], e.fra, e.til, { fra: "fra", til: "til" });
    return {
      verdi: redondear(e.belop * p.faktor),
      okning: redondear(e.belop * p.faktor - e.belop),
      kjopekraft: redondear(e.belop / p.faktor),
      endring: p.endring,
      fraManed: manedOgAr(p.fra),
      tilManed: manedOgAr(p.til),
      observaciones: p.merknader,
    };
  },
  resultado: [
    { clave: "verdi", etiqueta: "Samme kjøpekraft i dag", formato: "moneda", destacada: true },
    { clave: "okning", etiqueta: "Økning på grunn av prisstigning", formato: "moneda" },
    { clave: "kjopekraft", etiqueta: "Det samme beløpet i kroneverdi fra startmåneden", formato: "moneda" },
    { clave: "endring", etiqueta: "Prisstigning i perioden", formato: "porcentaje", decimales: 1 },
    { clave: "fraManed", etiqueta: "Fra", formato: "texto" },
    { clave: "tilManed", etiqueta: "Til", formato: "texto" },
  ],
});
