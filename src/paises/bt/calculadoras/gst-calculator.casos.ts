import { definirCasos } from "@/motor/calculo";
import calculadora from "./gst-calculator";

const GST = "https://www.drc.gov.bt/wp-content/uploads/2025/12/Consolidated-GST-Act-of-Bhutan-2020-and-amendment-thereof.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Add GST to Nu. 1,000",
    origen: { tipo: "recalculado", url: GST, detalle: "Schedule I: 5%. 1,000 + 50 = 1,050." },
    fecha: "2026-10-31",
    entrada: { modo: "add", monto: 1000 },
    esperado: { neto: 1000, gst: 50, total: 1050 },
  },
  {
    nombre: "Take GST out of Nu. 1,050",
    origen: { tipo: "recalculado", url: GST, detalle: "1,050 / 1.05 = 1,000." },
    fecha: "2026-10-31",
    entrada: { modo: "remove", monto: 1050 },
    esperado: { neto: 1000, gst: 50, total: 1050 },
  },
  {
    nombre: "Take GST out of Nu. 2,500",
    origen: { tipo: "recalculado", url: GST, detalle: "2,500 / 1.05 = 2,380.95; GST 119.05." },
    fecha: "2026-10-31",
    entrada: { modo: "remove", monto: 2500 },
    esperado: { neto: 2380.95, gst: 119.05, total: 2500 },
  },
]);
