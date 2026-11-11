import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerieTupla } from "@/motor/tipos";
import { mesAnio } from "../lib/salario";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "kh.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

function inicioMes(f: string): FechaISO {
  return `${f.slice(0, 7)}-01` as FechaISO;
}

export default definirCalculadora({
  id: "kh.inflation",
  mercado: "kh",
  concepto: "inflacion",
  slug: "inflation",
  estado: "publicado",
  requiere: { "kh.cpi": "serie", "kh.cpi-yoy": "numero" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "ចំនួនទឹកប្រាក់ (រៀល)", min: 0, porDefecto: 100000 },
    { id: "desde", tipo: "fecha", etiqueta: "ពីខែ", min: "2025-01-01", porDefecto: "2025-09-01", ayuda: "គិតតែខែប៉ុណ្ណោះ មិនគិតថ្ងៃទេ។" },
    { id: "hasta", tipo: "fecha", etiqueta: "ដល់ខែ", min: "2025-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("សូមបញ្ចូលចំនួនទឹកប្រាក់។", "monto");
    const ultimo = v["kh.cpi"];
    const puntos = new Map<string, number>(IPC.filter(([f]) => f <= ultimo.fecha));
    const i = inicioMes(e.desde);
    let f = inicioMes(e.hasta);
    const observaciones: string[] = [];
    if (f > ultimo.fecha) {
      observaciones.push(["ខែថ្មីបំផុតរបស់វិទ្យាស្ថានជាតិស្ថិតិគឺ", mesAnio(ultimo.fecha) + "។", "ការគណនាបញ្ឈប់ត្រឹមនោះ។"].join(" "));
      f = ultimo.fecha;
    }
    if (i > f) throw new ErrorEntrada("ខែចាប់ផ្តើមមិនអាចនៅក្រោយខែបញ្ចប់បានទេ។", "desde");
    const a = puntos.get(i);
    const b = puntos.get(f);
    if (a === undefined || b === undefined) throw new ErrorEntrada("មិនមានទិន្នន័យសម្រាប់ខែនេះទេ។", "desde");
    const factor = b / a;
    return {
      actual: redondear(e.monto * factor),
      diferencia: redondear(e.monto * factor - e.monto),
      inflacion: (factor - 1) * 100,
      mesDesde: mesAnio(i),
      mesHasta: mesAnio(f),
      observaciones,
    };
  },
  resultado: [
    { clave: "actual", etiqueta: "ចំនួនស្មើគ្នានៅខែបញ្ចប់", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "ការកើនឡើង", formato: "moneda" },
    { clave: "inflacion", etiqueta: "អតិផរណាក្នុងរយៈពេលនេះ", formato: "porcentaje", decimales: 1 },
    { clave: "mesDesde", etiqueta: "ខែចាប់ផ្តើម", formato: "texto" },
    { clave: "mesHasta", etiqueta: "ខែបញ្ចប់", formato: "texto" },
  ],
});
