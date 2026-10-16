import { definirCasos } from "@/motor/calculo";
import calculadora from "./rent-relief-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₦1.8 million rent, ₦5 million chargeable income",
    origen: { tipo: "recalculado", detalle: "20% × 1,800,000 = 360,000, under the 500,000 cap. Both 5,000,000 and 4,640,000 sit in the 18% band: 360,000 × 18% = 64,800 saved." },
    fecha: "2026-10-16",
    entrada: { alquiler: 1800000, gravable: 5000000 },
    esperado: { relief: 360000, ahorro: 64800, topeAlcanzado: "No" },
  },
  {
    nombre: "₦3 million rent hits the cap",
    origen: { tipo: "recalculado", detalle: "20% × 3,000,000 = 600,000, capped at 500,000." },
    fecha: "2026-10-16",
    entrada: { alquiler: 3000000, gravable: null },
    esperado: { relief: 500000, sinTope: 600000, topeAlcanzado: "Yes", ahorro: null },
  },
  {
    nombre: "Relief crosses into the 0% band",
    origen: { tipo: "recalculado", detalle: "Tax on 1,000,000 = 200,000 × 15% = 30,000; on 640,000 it is 0. Saved 30,000." },
    fecha: "2026-10-16",
    entrada: { alquiler: 1800000, gravable: 1000000 },
    esperado: { ahorro: 30000 },
  },
]);
