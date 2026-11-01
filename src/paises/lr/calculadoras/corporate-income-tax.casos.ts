import { definirCasos } from "@/motor/calculo";
import calculadora from "./corporate-income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Regular company with L$5,000,000 profit",
    origen: { tipo: "recalculado", detalle: "LRA: corporate income tax (regular) 25% × 5,000,000 = 1,250,000." },
    fecha: "2026-10-27",
    entrada: { beneficio: 5000000, sector: "regular", anticipos: 0 },
    esperado: { impuesto: 1250000, tasa: 25, saldo: 1250000 },
  },
  {
    nombre: "Mining company after advance payments",
    origen: { tipo: "recalculado", detalle: "Mining 30% × 2,000,000 = 600,000. Advance tax paid 150,000. Balance 450,000." },
    fecha: "2026-10-27",
    entrada: { beneficio: 2000000, sector: "mining", anticipos: 150000 },
    esperado: { impuesto: 600000, saldo: 450000, favor: 0 },
  },
  {
    nombre: "Rice producer with advances above the tax",
    origen: { tipo: "recalculado", detalle: "Rice production 15% × 400,000 = 60,000. Advances 80,000: 20,000 above the tax." },
    fecha: "2026-10-27",
    entrada: { beneficio: 400000, sector: "rice", anticipos: 80000 },
    esperado: { impuesto: 60000, saldo: 0, favor: 20000 },
  },
]);
