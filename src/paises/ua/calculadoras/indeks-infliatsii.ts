import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { dostupni, indeksZa, misiatsRik, perevirytyMezhi, pochatokMisiatsia } from "../lib/infliatsiia";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "ua.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "ua.indeks-infliatsii",
  mercado: "ua",
  concepto: "inflacion",
  slug: "indeks-infliatsii",
  estado: "publicado",
  requiere: { "ua.ipc": "serie" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Сума", min: 0, porDefecto: 10000 },
    { id: "vid", tipo: "fecha", etiqueta: "Перший місяць періоду", min: "2010-01-01", porDefecto: "2022-01-01", ayuda: "Береться індекс цього місяця. День не має значення." },
    { id: "do", tipo: "fecha", etiqueta: "Останній місяць періоду", min: "2010-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Введіть суму, більшу за нуль.", "suma");
    const ostannii = v["ua.ipc"];
    const rivni = dostupni(IPC, ostannii);
    const vid = pochatokMisiatsia(e.vid);
    let do_ = pochatokMisiatsia(e.do);
    perevirytyMezhi(rivni, ostannii, vid, "vid");
    const observaciones: string[] = [];
    if (do_ > ostannii.fecha) {
      observaciones.push(`Останній опублікований індекс за ${misiatsRik(ostannii.fecha)}. Розрахунок до цього місяця.`);
      do_ = ostannii.fecha;
    }
    if (vid > do_) throw new ErrorEntrada("Перший місяць має бути не пізніше за останній.", "vid");
    const indeks = indeksZa(rivni, vid, do_);
    if (indeks === null) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    return {
      zIndeksatsiieiu: redondear(e.suma * indeks),
      infliatsiini: redondear(e.suma * indeks - e.suma),
      indeks: indeks * 100,
      infliatsiia: (indeks - 1) * 100,
      vidMisiats: misiatsRik(vid),
      doMisiats: misiatsRik(do_),
      observaciones,
    };
  },
  resultado: [
    { clave: "zIndeksatsiieiu", etiqueta: "Сума з урахуванням інфляції", formato: "moneda", destacada: true },
    { clave: "infliatsiini", etiqueta: "Різниця через інфляцію", formato: "moneda" },
    { clave: "indeks", etiqueta: "Індекс інфляції за період", formato: "porcentaje", decimales: 1 },
    { clave: "infliatsiia", etiqueta: "Інфляція за період", formato: "porcentaje", decimales: 1 },
    { clave: "vidMisiats", etiqueta: "Від", formato: "texto" },
    { clave: "doMisiats", etiqueta: "До", formato: "texto" },
  ],
});
