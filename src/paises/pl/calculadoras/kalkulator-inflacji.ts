import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { miesiacRok, zmianaCen } from "../lib/inflacja";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "pl.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "pl.kalkulator-inflacji",
  mercado: "pl",
  concepto: "inflacion",
  slug: "kalkulator-inflacji",
  estado: "publicado",
  requiere: { "pl.cpi": "serie" },
  campos: [
    { id: "kwota", tipo: "moneda", etiqueta: "Kwota", min: 0, porDefecto: 1000 },
    { id: "od", tipo: "fecha", etiqueta: "Miesiąc, z którego pochodzi kwota", min: "2000-01-01", porDefecto: "2020-01-01", ayuda: "Liczy się wskaźnik cen z tego miesiąca, dzień nie ma znaczenia." },
    { id: "do", tipo: "fecha", etiqueta: "Miesiąc, na który przeliczasz", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.kwota <= 0) throw new ErrorEntrada("Wpisz kwotę większą od zera.", "kwota");
    const z = zmianaCen(CPI, v["pl.cpi"], e.od, e.do, { od: "od", do: "do" });
    return {
      dzisiaj: redondear(e.kwota * z.mnoznik),
      roznica: redondear(e.kwota * z.mnoznik - e.kwota),
      sila: redondear(e.kwota / z.mnoznik),
      laczna: z.laczna,
      miesiacOd: miesiacRok(z.od),
      miesiacDo: miesiacRok(z.do),
      observaciones: z.uwagi,
    };
  },
  resultado: [
    { clave: "dzisiaj", etiqueta: "Kwota o tej samej sile nabywczej", formato: "moneda", destacada: true },
    { clave: "roznica", etiqueta: "Więcej z powodu inflacji", formato: "moneda" },
    { clave: "sila", etiqueta: "Ile jest warta ta kwota w cenach z początku", formato: "moneda" },
    { clave: "laczna", etiqueta: "Inflacja w całym okresie", formato: "porcentaje", decimales: 1 },
    { clave: "miesiacOd", etiqueta: "Od", formato: "texto" },
    { clave: "miesiacDo", etiqueta: "Do", formato: "texto" },
  ],
});
