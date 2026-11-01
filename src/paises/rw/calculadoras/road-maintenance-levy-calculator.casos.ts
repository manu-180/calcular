import { definirCasos } from "@/motor/calculo";
import calculadora from "./road-maintenance-levy-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One car",
    origen: { tipo: "recalculado", detalle: "Car: RWF 50,000 a year." },
    fecha: "2026-10-26",
    entrada: { categoria: "car", cantidad: 1 },
    esperado: { total: 50000 },
  },
  {
    nombre: "Three trucks",
    origen: { tipo: "recalculado", detalle: "Truck: 120,000 × 3 = 360,000." },
    fecha: "2026-10-26",
    entrada: { categoria: "truck", cantidad: 3 },
    esperado: { total: 360000, porVehiculo: 120000 },
  },
  {
    nombre: "A trailer",
    origen: { tipo: "recalculado", detalle: "Trailer: 150,000." },
    fecha: "2026-10-26",
    entrada: { categoria: "trailer", cantidad: 1 },
    esperado: { total: 150000 },
  },
]);
