import { definirCasos } from "@/motor/calculo";
import isrNoResidentes from "./isr-no-residentes";

export default definirCasos(isrNoResidentes, [
  {
    nombre: "Servicios prestados por un no residente",
    origen: { tipo: "recalculado", detalle: "Ley del ISR art. 5, numeral 3: 25 % sobre sueldos, comisiones y servicios. 40000 × 25 % = 10000." },
    fecha: "2026-10-12",
    entrada: { monto: 40000, tipo: "salarios" },
    esperado: { tasa: 25, retencion: 10000, neto: 30000 },
  },
  {
    nombre: "Intereses pagados al exterior",
    origen: { tipo: "recalculado", detalle: "Art. 5, numeral 7: 10 % sobre intereses. 50000 × 10 % = 5000." },
    fecha: "2026-10-12",
    entrada: { monto: 50000, tipo: "intereses" },
    esperado: { tasa: 10, retencion: 5000 },
  },
  {
    nombre: "Regalías por una marca",
    origen: { tipo: "recalculado", detalle: "Art. 5, numeral 6: 25 % sobre regalías por patentes y marcas. 80000 × 25 % = 20000." },
    fecha: "2026-10-12",
    entrada: { monto: 80000, tipo: "regalias-patentes" },
    esperado: { retencion: 20000 },
  },
]);
