import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { mesecLeto, sprememba } from "../lib/inflacija";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "si.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "si.kalkulator-inflacije",
  mercado: "si",
  concepto: "inflacion",
  slug: "kalkulator-inflacije",
  estado: "publicado",
  requiere: { "si.ipc": "serie" },
  campos: [
    { id: "znesek", tipo: "moneda", etiqueta: "Znesek", min: 0, porDefecto: 1000 },
    { id: "od", tipo: "fecha", etiqueta: "Iz katerega meseca je znesek?", min: "2016-12-01", porDefecto: "2020-01-01", ayuda: "Šteje samo mesec, dan ni pomemben." },
    { id: "doMeseca", tipo: "fecha", etiqueta: "Na kateri mesec ga preračunavate?", min: "2016-12-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.znesek <= 0) throw new ErrorEntrada("Vnesite znesek, večji od nič.", "znesek");
    const s = sprememba(IPC, v["si.ipc"], e.od, e.doMeseca);
    return {
      danes: redondear(e.znesek * s.faktor),
      razlika: redondear(e.znesek * s.faktor - e.znesek),
      vrednost: redondear(e.znesek / s.faktor),
      skupaj: (s.faktor - 1) * 100,
      prvi: mesecLeto(s.od),
      zadnji: mesecLeto(s.do),
      observaciones: s.opombe,
    };
  },
  resultado: [
    { clave: "danes", etiqueta: "Enaka kupna moč", formato: "moneda", destacada: true },
    { clave: "razlika", etiqueta: "Več zaradi inflacije", formato: "moneda" },
    { clave: "vrednost", etiqueta: "Vrednost zneska v cenah začetnega meseca", formato: "moneda" },
    { clave: "skupaj", etiqueta: "Inflacija v vsem obdobju", formato: "porcentaje", decimales: 1 },
    { clave: "prvi", etiqueta: "Začetni mesec", formato: "texto" },
    { clave: "zadnji", etiqueta: "Končni mesec", formato: "texto" },
  ],
});
