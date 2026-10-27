import { definirCasos } from "@/motor/calculo";
import calculadora from "./corporate-income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Profitable company with audited accounts",
    origen: { tipo: "recalculado", detalle: "27% of 800,000 = 216,000 against 1% of 5,000,000 = 50,000: tax 216,000." },
    fecha: "2026-10-27",
    entrada: { ventas: 5000000, utilidad: 800000, cuentas: "audited" },
    esperado: { impuesto: 216000, minimo: 50000, trimestral: 54000 },
  },
  {
    nombre: "Low profit with unaudited accounts",
    origen: { tipo: "recalculado", detalle: "27% of 100,000 = 27,000 against 2% of 3,000,000 = 60,000: tax 60,000." },
    fecha: "2026-10-27",
    entrada: { ventas: 3000000, utilidad: 100000, cuentas: "unaudited" },
    esperado: { impuesto: 60000, sobreUtilidad: 27000 },
  },
  {
    nombre: "Loss still pays the minimum tax",
    origen: { tipo: "recalculado", detalle: "No tax on a loss. 1% of 2,000,000 = 20,000." },
    fecha: "2026-10-27",
    entrada: { ventas: 2000000, utilidad: -50000, cuentas: "audited" },
    esperado: { impuesto: 20000, sobreUtilidad: 0 },
  },
  {
    nombre: "No turnover",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { ventas: 0, utilidad: 0, cuentas: "audited" },
    esperaError: true,
  },
]);
