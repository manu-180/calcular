import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "mn.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "mn.inflyatsiin-tootsooluur",
  mercado: "mn",
  concepto: "inflacion",
  slug: "inflyatsiin-tootsooluur",
  estado: "publicado",
  requiere: {
    "mn.ipc": "serie",
    "mn.inflyatsi": "serie",
    "mn.bodlogyn-khuu": "numero",
  },
  campos: [
    { id: "dun", tipo: "moneda", etiqueta: "Дүн", min: 0, porDefecto: 1000000 },
    { id: "on", tipo: "entero", etiqueta: "Анхны он", min: 2010, max: 2100, porDefecto: 2016 },
    { id: "sar", tipo: "entero", etiqueta: "Анхны сар", min: 1, max: 12, porDefecto: 9 },
  ],
  calcular(e, v, { redondear }) {
    const ognoo = `${e.on}-${String(e.sar).padStart(2, "0")}-01`;
    const suuri = new Map<string, number>(IPC).get(ognoo);
    const suuldu = v["mn.ipc"];
    if (suuri === undefined || ognoo >= suuldu.fecha) throw new ErrorEntrada("Индекс 2010 оны 1 дүгээр сараас хамгийн сүүлийн сар хүртэл байна. Өөр он, сар сонгоно уу.", "on");
    const factor = suuldu.valor / suuri;
    return {
      odoo: redondear(e.dun * factor),
      nemegdel: redondear(e.dun * (factor - 1)),
      niitKhuvi: (factor - 1) * 100,
      jiliin: v["mn.inflyatsi"].valor,
      khuu: v["mn.bodlogyn-khuu"],
      ognoo: suuldu.fecha,
    };
  },
  resultado: [
    { clave: "odoo", etiqueta: "Өнөөгийн үнэ цэнэ", formato: "moneda", destacada: true },
    { clave: "nemegdel", etiqueta: "Инфляцийн нэмэгдэл", formato: "moneda" },
    { clave: "niitKhuvi", etiqueta: "Хугацааны нийт инфляци", formato: "porcentaje", decimales: 1 },
    { clave: "jiliin", etiqueta: "Сүүлийн жилийн инфляци", formato: "porcentaje", decimales: 1 },
    { clave: "khuu", etiqueta: "Монголбанкны бодлогын хүү", formato: "porcentaje", decimales: 1 },
    { clave: "ognoo", etiqueta: "Сүүлийн индексийн сар", formato: "fecha" },
  ],
});
