import { definirCasos } from "@/motor/calculo";
import rentaPrimera from "./renta-de-primera-categoria";

export default definirCasos(rentaPrimera, [
  {
    nombre: "Alquiler de S/ 1,500 todo el año",
    origen: {
      tipo: "recalculado",
      detalle: "LIR, arts. 36 y 84: renta bruta 1,500 menos 20 % = 1,200; 6.25 % = 75 al mes (5 % efectivo); 900 al año.",
    },
    fecha: "2026-10-12",
    entrada: { alquiler: 1500, meses: 12 },
    esperado: { deduccion: 300, rentaNeta: 1200, mensual: 75, anual: 900, tasaEfectiva: 5 },
  },
  {
    nombre: "Alquiler de S/ 2,350 por 7 meses",
    origen: { tipo: "recalculado", detalle: "2,350 × 0.8 = 1,880; × 6.25 % = 117.50; × 7 = 822.50." },
    fecha: "2026-10-12",
    entrada: { alquiler: 2350, meses: 7 },
    esperado: { mensual: 117.5, anual: 822.5 },
  },
]);
