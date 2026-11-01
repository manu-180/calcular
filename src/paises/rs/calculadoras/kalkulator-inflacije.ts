import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { mesecGodina, promena } from "../lib/inflacija";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "rs.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "rs.kalkulator-inflacije",
  mercado: "rs",
  concepto: "inflacion",
  slug: "kalkulator-inflacije",
  estado: "publicado",
  requiere: { "rs.ipc": "serie" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Iznos", min: 0, porDefecto: 100000 },
    { id: "od", tipo: "fecha", etiqueta: "Iz kog meseca je iznos?", min: "2011-01-01", porDefecto: "2020-01-01", ayuda: "Računa se samo mesec, ne i dan." },
    { id: "do", tipo: "fecha", etiqueta: "Do kog meseca računate?", min: "2011-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const p = promena(IPC, v["rs.ipc"], e.od, e.do, { od: "od", do: "do" });
    return {
      danas: redondear(e.iznos * p.faktor),
      razlika: redondear(e.iznos * p.faktor - e.iznos),
      vrednost: redondear(e.iznos / p.faktor),
      ukupno: p.ukupno,
      mesecOd: mesecGodina(p.od),
      mesecDo: mesecGodina(p.do),
      observaciones: p.napomene,
    };
  },
  resultado: [
    { clave: "danas", etiqueta: "Ista kupovna moć", formato: "moneda", destacada: true },
    { clave: "razlika", etiqueta: "Toliko više zbog inflacije", formato: "moneda" },
    { clave: "vrednost", etiqueta: "Vrednost iznosa u cenama početnog meseca", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Inflacija za ceo period", formato: "porcentaje", decimales: 1 },
    { clave: "mesecOd", etiqueta: "Početni mesec", formato: "texto" },
    { clave: "mesecDo", etiqueta: "Krajnji mesec", formato: "texto" },
  ],
});
