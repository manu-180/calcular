import { definirCasos } from "@/motor/calculo";
import irp from "./irp";

const CARTILLA = "https://www.dnit.gov.py/documents/20123/233435/IRP+RSP+Cartilla+6.08.24.pdf/bb45c6ef-0c98-771a-c530-ac893db6bce2?t=1722965031873.pdf" as const;

export default definirCasos(irp, [
  {
    nombre: "Renta neta en el segundo tramo",
    origen: { tipo: "recalculado", url: CARTILLA, detalle: "Art. 69: 120.000.000 − 40.000.000 = 80.000.000. 8 % de 50.000.000 = 4.000.000 y 9 % de 30.000.000 = 2.700.000. Total 6.700.000." },
    fecha: "2026-10-07",
    entrada: { ingresos: 120000000, gastos: 40000000 },
    esperado: { rentaNeta: 80000000, impuesto: 6700000 },
    tolerancia: 0.01,
  },
  {
    nombre: "Justo en el monto no alcanzado",
    origen: { tipo: "recalculado", url: CARTILLA, detalle: "Art. 69: quien no supera 80.000.000 en el año no paga el impuesto." },
    fecha: "2026-10-07",
    entrada: { ingresos: 80000000, gastos: 0 },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Un guaraní arriba del monto no alcanzado",
    origen: { tipo: "recalculado", detalle: "80.000.001 de renta neta: 4.000.000 + 9 % de 30.000.001 = 6.700.000,09, redondeado 6.700.000." },
    fecha: "2026-10-07",
    entrada: { ingresos: 80000001, gastos: 0 },
    esperado: { impuesto: 6700000 },
  },
  {
    nombre: "Tercer tramo",
    origen: { tipo: "recalculado", detalle: "300.000.000: 4.000.000 + 9 % de 100.000.000 (9.000.000) + 10 % de 150.000.000 (15.000.000) = 28.000.000." },
    fecha: "2026-10-07",
    entrada: { ingresos: 300000000, gastos: 0 },
    esperado: { rentaNeta: 300000000, impuesto: 28000000 },
  },
]);
