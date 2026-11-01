import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { mesetsGodina, promyanaNaTsenite } from "../lib/inflatsia";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "bg.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "bg.kalkulator-za-inflatsia",
  mercado: "bg",
  concepto: "inflacion",
  slug: "kalkulator-za-inflatsia",
  estado: "publicado",
  requiere: { "bg.ipc": "serie" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Сума", min: 0, porDefecto: 1000 },
    { id: "ot", tipo: "fecha", etiqueta: "От месец", min: "2021-01-01", porDefecto: "2021-01-01", ayuda: "Важи само месецът, денят няма значение." },
    { id: "do", tipo: "fecha", etiqueta: "До месец", min: "2021-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Въведете сума над нула.", "suma");
    const p = promyanaNaTsenite(IPC, v["bg.ipc"], e.ot, e.do, { ot: "ot", do: "do" });
    return {
      dnes: redondear(e.suma * p.mnozhitel),
      razlika: redondear(e.suma * p.mnozhitel - e.suma),
      stoynost: redondear(e.suma / p.mnozhitel),
      obshto: p.obshto,
      otMesets: mesetsGodina(p.ot),
      doMesets: mesetsGodina(p.do),
      observaciones: p.belezhki,
    };
  },
  resultado: [
    { clave: "dnes", etiqueta: "Сума със същата покупателна сила", formato: "moneda", destacada: true },
    { clave: "razlika", etiqueta: "Разлика заради инфлацията", formato: "moneda" },
    { clave: "stoynost", etiqueta: "Стойност в цените на началния месец", formato: "moneda" },
    { clave: "obshto", etiqueta: "Инфлация за целия период", formato: "porcentaje", decimales: 1 },
    { clave: "otMesets", etiqueta: "Начален месец", formato: "texto" },
    { clave: "doMesets", etiqueta: "Краен месец", formato: "texto" },
  ],
});
