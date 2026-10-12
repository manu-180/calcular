import { definirCasos } from "@/motor/calculo";
import cdt from "./cdt";

export default definirCasos(cdt, [
  {
    nombre: "10 millones al 10 % E.A. por 360 días",
    origen: {
      tipo: "recalculado",
      detalle: "10.000.000 × (1,10^(360/365) − 1) = 985.648. Retención 4 % (Decreto 1625 de 2016, art. 1.2.4.2.83) = 39.426. Neto 946.222.",
    },
    fecha: "2026-10-15",
    entrada: { capital: 10000000, tasa: 10, dias: 360, retencion: true },
    esperado: { rendimiento: 985648, retencion: 39426, neto: 946222, total: 10946222 },
  },
  {
    nombre: "Seis meses sin retención",
    origen: { tipo: "recalculado", detalle: "10.000.000 × (1,10^(180/365) − 1) = 481.244." },
    fecha: "2026-10-15",
    entrada: { capital: 10000000, tasa: 10, dias: 180, retencion: false },
    esperado: { rendimiento: 481244, retencion: 0, total: 10481244 },
  },
  {
    nombre: "90 días al 9,5 % E.A.",
    origen: { tipo: "recalculado", detalle: "5.000.000 × (1,095^(90/365) − 1) = 113.150; retención 4.526; neto 108.624." },
    fecha: "2026-10-15",
    entrada: { capital: 5000000, tasa: 9.5, dias: 90, retencion: true },
    esperado: { rendimiento: 113150, retencion: 4526, neto: 108624 },
  },
]);
