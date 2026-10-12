import { definirCasos } from "@/motor/calculo";
import pagoACuenta from "./pago-a-cuenta";

export default definirCasos(pagoACuenta, [
  {
    nombre: "Comercio con $10,000 de ingresos",
    origen: { tipo: "recalculado", detalle: "Código Tributario art. 151: 1,75 % de 10.000 = 175." },
    fecha: "2026-10-12",
    entrada: { ingresos: 10000, actividad: "general" },
    esperado: { tasa: 1.75, pago: 175 },
  },
  {
    nombre: "Distribuidor de bebidas con precio sugerido",
    origen: { tipo: "recalculado", detalle: "0,3 % de 10.000 = 30." },
    fecha: "2026-10-12",
    entrada: { ingresos: 10000, actividad: "distribuidores" },
    esperado: { pago: 30 },
  },
  {
    nombre: "Transporte de pasajeros",
    origen: { tipo: "recalculado", detalle: "0,3 % de 4.567,89 = 13,7037 → 13,70." },
    fecha: "2026-10-12",
    entrada: { ingresos: 4567.89, actividad: "transporte" },
    esperado: { pago: 13.7 },
  },
  {
    nombre: "Gasolinera de una sociedad",
    origen: { tipo: "recalculado", detalle: "0,75 % de 200.000 = 1.500." },
    fecha: "2026-10-12",
    entrada: { ingresos: 200000, actividad: "gasolineras" },
    esperado: { pago: 1500 },
  },
]);
