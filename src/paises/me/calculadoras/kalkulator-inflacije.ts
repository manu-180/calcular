import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nazivMjeseca, promjenaCijena } from "../lib/inflacija";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "me.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "me.kalkulator-inflacije",
  mercado: "me",
  concepto: "inflacion",
  slug: "kalkulator-inflacije",
  estado: "publicado",
  requiere: { "me.ipc": "serie" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Iznos", min: 0, porDefecto: 1000 },
    { id: "od", tipo: "fecha", etiqueta: "Iz kog mjeseca je iznos?", min: "2016-01-01", porDefecto: "2020-01-01", ayuda: "Računa se samo mjesec, ne i dan." },
    { id: "do", tipo: "fecha", etiqueta: "Do kog mjeseca računate?", min: "2016-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const p = promjenaCijena(IPC, v["me.ipc"], e.od, e.do);
    return {
      danas: redondear(e.iznos * p.faktor),
      razlika: redondear(e.iznos * p.faktor - e.iznos),
      vrijednost: redondear(e.iznos / p.faktor),
      ukupno: p.ukupno,
      mjesecOd: nazivMjeseca(p.od),
      mjesecDo: nazivMjeseca(p.do),
      observaciones: p.napomene,
    };
  },
  resultado: [
    { clave: "danas", etiqueta: "Ista kupovna moć", formato: "moneda", destacada: true },
    { clave: "razlika", etiqueta: "Toliko više zbog rasta cijena", formato: "moneda" },
    { clave: "vrijednost", etiqueta: "Vrijednost u cijenama početnog mjeseca", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Inflacija za cijeli period", formato: "porcentaje", decimales: 1 },
    { clave: "mjesecOd", etiqueta: "Početni mjesec", formato: "texto" },
    { clave: "mjesecDo", etiqueta: "Krajnji mjesec", formato: "texto" },
  ],
});
