import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "ba.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MJESECI = ["januar", "februar", "mart", "april", "maj", "juni", "juli", "august", "septembar", "oktobar", "novembar", "decembar"];

function mjesecGodina(f: string): string {
  return `${MJESECI[Number(f.slice(5, 7)) - 1]} ${f.slice(0, 4)}.`;
}

export default definirCalculadora({
  id: "ba.kalkulator-inflacije",
  mercado: "ba",
  concepto: "inflacion",
  slug: "kalkulator-inflacije",
  estado: "publicado",
  requiere: { "ba.ipc": "serie" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Iznos", min: 0, porDefecto: 1000 },
    { id: "od", tipo: "fecha", etiqueta: "Iz kojeg mjeseca je iznos", min: "2024-01-01", porDefecto: "2024-01-01", ayuda: "Računa se samo mjesec, ne i dan." },
    { id: "do", tipo: "fecha", etiqueta: "Do kojeg mjeseca računate", min: "2024-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const dostupno = IPC.filter(([f]) => f <= v["ba.ipc"].fecha);
    const indeks = new Map<string, number>(dostupno);
    const m1 = `${e.od.slice(0, 7)}-01`;
    let m2 = `${e.do.slice(0, 7)}-01`;
    const observaciones: string[] = [];
    if (m1 > v["ba.ipc"].fecha) throw new ErrorEntrada(`Zadnji objavljeni mjesec je ${mjesecGodina(v["ba.ipc"].fecha)}`, "od");
    if (m2 > v["ba.ipc"].fecha) {
      observaciones.push(`Zadnji podatak je za ${mjesecGodina(v["ba.ipc"].fecha)} Računali smo do tog mjeseca.`);
      m2 = v["ba.ipc"].fecha;
    }
    if (m1 > m2) throw new ErrorEntrada("Početni mjesec ne može biti poslije krajnjeg.", "od");
    const i1 = indeks.get(m1);
    const i2 = indeks.get(m2);
    if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const faktor = i2 / i1;
    return {
      danas: redondear(e.iznos * faktor),
      razlika: redondear(e.iznos * faktor - e.iznos),
      ukupno: (faktor - 1) * 100,
      mjesecOd: mjesecGodina(m1),
      mjesecDo: mjesecGodina(m2),
      observaciones,
    };
  },
  resultado: [
    { clave: "danas", etiqueta: "Ista kupovna moć", formato: "moneda", destacada: true },
    { clave: "razlika", etiqueta: "Toliko više zbog inflacije", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Inflacija za cio period", formato: "porcentaje", decimales: 1 },
    { clave: "mjesecOd", etiqueta: "Početni mjesec", formato: "texto" },
    { clave: "mjesecDo", etiqueta: "Krajnji mjesec", formato: "texto" },
  ],
});
