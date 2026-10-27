import { definirCasos } from "@/motor/calculo";
import calculadora from "./presumptive-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One 18-seater minibus",
    origen: { tipo: "recalculado", url: "https://www.zra.org.zm/tax-information/", detalle: "18 to 21 seats: K5,184 a year, K1,296 a quarter, K432 a month." },
    fecha: "2026-10-26",
    entrada: { asientos: "18-21", vehiculos: 1 },
    esperado: { anual: 5184, trimestral: 1296, mensual: 432 },
  },
  {
    nombre: "Three taxis",
    origen: { tipo: "recalculado", detalle: "Fewer than 12 seats: 3 × 1,296 = 3,888." },
    fecha: "2026-10-26",
    entrada: { asientos: "under-12", vehiculos: 3 },
    esperado: { anual: 3888, porVehiculo: 1296, mensual: 324 },
  },
]);
