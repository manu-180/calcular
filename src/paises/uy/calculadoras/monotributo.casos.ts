import { definirCasos } from "@/motor/calculo";
import monotributo from "./monotributo";

const PDF_BPS = "https://www.bps.gub.uy/bps/file/6668/23/monotributo-ley-18.083---2026.pdf";

export default definirCasos(monotributo, [
  {
    nombre: "Con SNIS, sin cónyuge ni hijos (enero 2026)",
    origen: { tipo: "oficial", url: PDF_BPS, detalle: "Tabla del BPS: aportes jubilatorios y FRL 2.088 + SNS 4.239 = 6.327." },
    fecha: "2026-10-08",
    entrada: { snis: true, conyuge: false, hijos: false },
    esperado: { montoGravado: 9240, jubilatorio: 2088, salud: 4239, total: 6327, anual: 75924 },
  },
  {
    nombre: "Con SNIS, con cónyuge e hijos",
    origen: { tipo: "oficial", url: PDF_BPS, detalle: "Tabla del BPS: 2.088 + 5.800 = 7.888." },
    fecha: "2026-10-08",
    entrada: { snis: true, conyuge: true, hijos: true },
    esperado: { salud: 5800, total: 7888 },
  },
  {
    nombre: "Sin opción al SNIS: el aporte de salud no cambia con las cargas",
    origen: { tipo: "oficial", url: PDF_BPS, detalle: "Tabla del BPS: 2.088 + 549 = 2.637, con o sin hijos." },
    fecha: "2026-10-08",
    entrada: { snis: false, conyuge: false, hijos: true },
    esperado: { salud: 549, total: 2637 },
  },
  {
    nombre: "Con SNIS y solo hijos",
    origen: { tipo: "oficial", url: PDF_BPS, detalle: "Tabla del BPS: 2.088 + 4.908 = 6.996." },
    fecha: "2026-10-08",
    entrada: { snis: true, conyuge: false, hijos: true },
    esperado: { total: 6996 },
  },
]);
