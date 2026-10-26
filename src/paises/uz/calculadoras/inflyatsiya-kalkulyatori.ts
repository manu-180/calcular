import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { oyVaYil } from "../lib/kalendar";
import { narxOzgarishi } from "../lib/inflyatsiya";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "uz.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "uz.inflyatsiya-kalkulyatori",
  mercado: "uz",
  concepto: "inflacion",
  slug: "inflyatsiya-kalkulyatori",
  estado: "publicado",
  requiere: { "uz.cpi": "serie" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Summa", min: 0, porDefecto: 1000000 },
    { id: "dan", tipo: "fecha", etiqueta: "Summa qaysi oyga tegishli", min: "2020-12-01", porDefecto: "2021-01-01", ayuda: "Oyning isteʼmol narxlari indeksi olinadi, kun ahamiyatga ega emas." },
    { id: "gacha", tipo: "fecha", etiqueta: "Qaysi oy narxlariga oʻtkazasiz", min: "2020-12-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Noldan katta summa kiriting.", "summa");
    const z = narxOzgarishi(CPI, v["uz.cpi"], e.dan, e.gacha, { dan: "dan", gacha: "gacha" });
    return {
      bugungi: redondear(e.summa * z.koef),
      farq: redondear(e.summa * z.koef - e.summa),
      xarid: redondear(e.summa / z.koef),
      jami: z.jami,
      yillik: z.yillik,
      oyDan: oyVaYil(z.dan),
      oyGacha: oyVaYil(z.gacha),
      observaciones: z.eslatmalar,
    };
  },
  resultado: [
    { clave: "bugungi", etiqueta: "Xuddi shu xarid quvvatiga teng summa", formato: "moneda", decimales: 0, destacada: true },
    { clave: "farq", etiqueta: "Inflyatsiya hisobiga farq", formato: "moneda", decimales: 0 },
    { clave: "xarid", etiqueta: "Bu summa boshlangʻich oy narxlarida", formato: "moneda", decimales: 0 },
    { clave: "jami", etiqueta: "Butun davrdagi inflyatsiya", formato: "porcentaje", decimales: 1 },
    { clave: "yillik", etiqueta: "Oxirgi 12 oydagi inflyatsiya", formato: "porcentaje", decimales: 1 },
    { clave: "oyDan", etiqueta: "Boshlangʻich oy", formato: "texto" },
    { clave: "oyGacha", etiqueta: "Oxirgi oy", formato: "texto" },
  ],
});
