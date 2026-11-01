import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { muajViti, ndryshimi } from "../lib/inflacioni";
import series from "../series.json";

const ICK = (series.series.find((s) => s.id === "al.ick")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "al.kalkulator-inflacioni",
  mercado: "al",
  concepto: "inflacion",
  slug: "kalkulator-inflacioni",
  estado: "publicado",
  requiere: { "al.ick": "serie" },
  campos: [
    { id: "shuma", tipo: "moneda", etiqueta: "Shuma", min: 0, porDefecto: 100000 },
    { id: "nga", tipo: "fecha", etiqueta: "Nga cili muaj është shuma?", min: "2021-01-01", porDefecto: "2022-01-01", ayuda: "Vlen vetëm muaji, jo dita." },
    { id: "deri", tipo: "fecha", etiqueta: "Në cilin muaj doni ta llogaritni?", min: "2021-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.shuma <= 0) throw new ErrorEntrada("Vendosni një shumë më të madhe se zero.", "shuma");
    const n = ndryshimi(ICK, v["al.ick"], e.nga, e.deri);
    return {
      sot: redondear(e.shuma * n.faktori),
      diferenca: redondear(e.shuma * n.faktori - e.shuma),
      vlera: redondear(e.shuma / n.faktori),
      totali: n.totali,
      muajiNga: muajViti(n.nga),
      muajiDeri: muajViti(n.deri),
      observaciones: n.shenime,
    };
  },
  resultado: [
    { clave: "sot", etiqueta: "E njëjta fuqi blerëse", formato: "moneda", destacada: true },
    { clave: "diferenca", etiqueta: "Sa më shumë për shkak të inflacionit", formato: "moneda" },
    { clave: "vlera", etiqueta: "Vlera e shumës me çmimet e muajit të parë", formato: "moneda" },
    { clave: "totali", etiqueta: "Inflacioni në këtë periudhë", formato: "porcentaje", decimales: 1 },
    { clave: "muajiNga", etiqueta: "Muaji i fillimit", formato: "texto" },
    { clave: "muajiDeri", etiqueta: "Muaji i fundit", formato: "texto" },
  ],
});
