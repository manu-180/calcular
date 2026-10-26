import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { maanedAar, prisudvikling } from "../lib/inflation";
import series from "../series.json";

const FPI = (series.series.find((s) => s.id === "dk.fpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "dk.inflationsberegner",
  mercado: "dk",
  concepto: "inflacion",
  slug: "inflationsberegner",
  estado: "publicado",
  requiere: { "dk.fpi": "serie" },
  campos: [
    { id: "beloeb", tipo: "moneda", etiqueta: "Beløb", min: 0, porDefecto: 1000 },
    { id: "fra", tipo: "fecha", etiqueta: "Måned, beløbet er fra", min: "2000-12-01", porDefecto: "2020-01-01", ayuda: "Kun måneden tæller, ikke dagen." },
    { id: "til", tipo: "fecha", etiqueta: "Måned, du vil omregne til", min: "2000-12-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.beloeb <= 0) throw new ErrorEntrada("Skriv et beløb, der er større end 0.", "beloeb");
    const p = prisudvikling(FPI, v["dk.fpi"], e.fra, e.til, { fra: "fra", til: "til" });
    return {
      idag: redondear(e.beloeb * p.faktor),
      forskel: redondear(e.beloeb * p.faktor - e.beloeb),
      vaerdi: redondear(e.beloeb / p.faktor),
      samlet: p.samlet,
      fraMaaned: maanedAar(p.fra),
      tilMaaned: maanedAar(p.til),
      observaciones: p.noter,
    };
  },
  resultado: [
    { clave: "idag", etiqueta: "Beløb med samme købekraft", formato: "moneda", destacada: true },
    { clave: "forskel", etiqueta: "Prisstigning i kroner", formato: "moneda" },
    { clave: "vaerdi", etiqueta: "Beløbets værdi i priserne fra startmåneden", formato: "moneda" },
    { clave: "samlet", etiqueta: "Inflation i hele perioden", formato: "porcentaje", decimales: 1 },
    { clave: "fraMaaned", etiqueta: "Fra", formato: "texto" },
    { clave: "tilMaaned", etiqueta: "Til", formato: "texto" },
  ],
});
