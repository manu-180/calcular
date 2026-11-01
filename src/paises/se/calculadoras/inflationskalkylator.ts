import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { manadAr, prisforandring } from "../lib/kpi";
import series from "../series.json";

const KPI = (series.series.find((s) => s.id === "se.kpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "se.inflationskalkylator",
  mercado: "se",
  concepto: "inflacion",
  slug: "inflationskalkylator",
  estado: "publicado",
  requiere: { "se.kpi": "serie" },
  campos: [
    { id: "belopp", tipo: "moneda", etiqueta: "Belopp", min: 0, porDefecto: 1000 },
    { id: "fran", tipo: "fecha", etiqueta: "Månaden beloppet gäller", min: "1980-01-01", porDefecto: "2000-01-01", ayuda: "Det är KPI för månaden som räknas, dagen spelar ingen roll." },
    { id: "till", tipo: "fecha", etiqueta: "Månaden du räknar om till", min: "1980-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.belopp <= 0) throw new ErrorEntrada("Skriv ett belopp som är större än noll.", "belopp");
    const p = prisforandring(KPI, v["se.kpi"], e.fran, e.till, { fran: "fran", till: "till" });
    return {
      motsvarar: redondear(e.belopp * p.faktor),
      skillnad: redondear(e.belopp * p.faktor - e.belopp),
      kopkraft: redondear(e.belopp / p.faktor),
      forandring: p.forandring,
      indexFran: p.indexFran,
      indexTill: p.indexTill,
      manadFran: manadAr(p.fran),
      manadTill: manadAr(p.till),
      observaciones: p.observaciones,
    };
  },
  resultado: [
    { clave: "motsvarar", etiqueta: "Motsvarar i dagens penningvärde", formato: "moneda", destacada: true },
    { clave: "skillnad", etiqueta: "Ökning på grund av inflationen", formato: "moneda" },
    { clave: "kopkraft", etiqueta: "Beloppet räknat i startmånadens priser", formato: "moneda" },
    { clave: "forandring", etiqueta: "Prisförändring under perioden", formato: "porcentaje", decimales: 1 },
    { clave: "indexFran", etiqueta: "KPI startmånaden (1980 = 100)", formato: "numero", decimales: 2 },
    { clave: "indexTill", etiqueta: "KPI slutmånaden (1980 = 100)", formato: "numero", decimales: 2 },
    { clave: "manadFran", etiqueta: "Från", formato: "texto" },
    { clave: "manadTill", etiqueta: "Till", formato: "texto" },
  ],
});
