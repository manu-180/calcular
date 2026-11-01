import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { izmenenieTsen, mesyatsGod } from "../lib/inflyatsiya";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "kz.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "kz.kalkulyator-inflyatsii",
  mercado: "kz",
  concepto: "inflacion",
  slug: "kalkulyator-inflyatsii",
  estado: "publicado",
  requiere: { "kz.ipc": "serie" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Сумма", min: 0, porDefecto: 100000 },
    { id: "s", tipo: "fecha", etiqueta: "Месяц, к которому относится сумма", min: "2007-12-01", porDefecto: "2020-01-01", ayuda: "Важен только месяц: берется индекс цен этого месяца." },
    { id: "po", tipo: "fecha", etiqueta: "Месяц, на который пересчитать", min: "2007-12-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму больше нуля.", "summa");
    const z = izmenenieTsen(IPC, v["kz.ipc"], e.s, e.po, { s: "s", po: "po" });
    return {
      segodnya: redondear(e.summa * z.mnozhitel),
      raznitsa: redondear(e.summa * z.mnozhitel - e.summa),
      pokupatelnaya: redondear(e.summa / z.mnozhitel),
      vsego: z.vsego,
      mesyatsS: mesyatsGod(z.s),
      mesyatsPo: mesyatsGod(z.po),
      observaciones: z.primechaniya,
    };
  },
  resultado: [
    { clave: "segodnya", etiqueta: "Сумма с той же покупательной способностью", formato: "moneda", destacada: true },
    { clave: "raznitsa", etiqueta: "Больше из-за инфляции", formato: "moneda" },
    { clave: "pokupatelnaya", etiqueta: "Сколько стоит эта сумма в ценах начального месяца", formato: "moneda" },
    { clave: "vsego", etiqueta: "Инфляция за весь период", formato: "porcentaje", decimales: 1 },
    { clave: "mesyatsS", etiqueta: "С", formato: "texto" },
    { clave: "mesyatsPo", etiqueta: "По", formato: "texto" },
  ],
});
