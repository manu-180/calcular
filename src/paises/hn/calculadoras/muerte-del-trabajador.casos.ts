import { definirCasos } from "@/motor/calculo";
import muerteDelTrabajador from "./muerte-del-trabajador";

export default definirCasos(muerteDelTrabajador, [
  {
    nombre: "Fallecimiento natural después de 4 años y 7 meses",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 150-2008, art. 120 g: 75 % de la cesantía. 4 + 210/360 = 4.5833 meses × 18000 = 82500; × 75 % = 61875. Décimos 13463.01 + 4536.99. Total 79875.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 18000, fechaIngreso: "2022-03-01", fechaFallecimiento: "2026-09-30", microempresa: false },
    esperado: { cesantia: 61875, decimoTercero: 13463.01, decimoCuarto: 4536.99, total: 79875 },
  },
  {
    nombre: "Menos de seis meses de trabajo",
    origen: { tipo: "recalculado", detalle: "Art. 120 g: el beneficio pide más de seis meses. Ingreso 01/05/2026: solo décimos. 18000 × 153 / 365 = 7545.21 y 18000 × 92 / 365 = 4536.99." },
    fecha: "2026-10-12",
    entrada: { salario: 18000, fechaIngreso: "2026-05-01", fechaFallecimiento: "2026-09-30", microempresa: false },
    esperado: { cesantia: 0, decimoTercero: 7545.21, decimoCuarto: 4536.99 },
  },
  {
    nombre: "Microempresa",
    origen: { tipo: "recalculado", detalle: "Art. 120-A: el literal g no se aplica a la microempresa." },
    fecha: "2026-10-12",
    entrada: { salario: 18000, fechaIngreso: "2022-03-01", fechaFallecimiento: "2026-09-30", microempresa: true },
    esperado: { cesantia: 0, total: 18000 },
  },
]);
