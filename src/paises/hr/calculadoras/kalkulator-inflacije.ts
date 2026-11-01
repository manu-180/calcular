import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { mjesecGodina, promjena } from "../lib/inflacija";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "hr.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "hr.kalkulator-inflacije",
  mercado: "hr",
  concepto: "inflacion",
  slug: "kalkulator-inflacije",
  estado: "publicado",
  requiere: { "hr.ipc": "serie" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Iznos", min: 0, porDefecto: 1000 },
    { id: "od", tipo: "fecha", etiqueta: "Iz kojeg je mjeseca iznos?", min: "2000-01-01", porDefecto: "2020-01-01", ayuda: "Računa se samo mjesec, ne i dan." },
    { id: "do", tipo: "fecha", etiqueta: "Do kojeg mjeseca računate?", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const p = promjena(IPC, v["hr.ipc"], e.od, e.do, { od: "od", do: "do" });
    return {
      danas: redondear(e.iznos * p.faktor),
      razlika: redondear(e.iznos * p.faktor - e.iznos),
      vrijednost: redondear(e.iznos / p.faktor),
      ukupno: p.ukupno,
      mjesecOd: mjesecGodina(p.od),
      mjesecDo: mjesecGodina(p.do),
      observaciones: p.napomene,
    };
  },
  resultado: [
    { clave: "danas", etiqueta: "Ista kupovna moć", formato: "moneda", destacada: true },
    { clave: "razlika", etiqueta: "Toliko više zbog inflacije", formato: "moneda" },
    { clave: "vrijednost", etiqueta: "Vrijednost iznosa u cijenama početnog mjeseca", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Inflacija za cijelo razdoblje", formato: "porcentaje", decimales: 1 },
    { clave: "mjesecOd", etiqueta: "Početni mjesec", formato: "texto" },
    { clave: "mjesecDo", etiqueta: "Završni mjesec", formato: "texto" },
  ],
});
