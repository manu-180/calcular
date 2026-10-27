import { definirCasos } from "@/motor/calculo";
import calculadora from "./bituach-leumi";

export default definirCasos(calculadora, [
  {
    nombre: "12.000 por mes",
    origen: {
      tipo: "recalculado",
      detalle: "BL 7.703 x 1,04 % + 4.297 x 7 % = 380,90; salud 7.703 x 3,23 % + 4.297 x 5,17 % = 470,96; total 851,86. Empleador 7.703 x 4,51 % + 4.297 x 7,6 % = 673,98.",
    },
    fecha: "2026-10-24",
    entrada: { sachar: 12000 },
    esperado: { bituachLeumi: 380.9, masBriut: 470.96, total: 851.86, maasik: 673.98 },
  },
  {
    nombre: "5.000 por mes, todo en tasa reducida",
    origen: { tipo: "recalculado", detalle: "5.000 x 1,04 % = 52; 5.000 x 3,23 % = 161,5; total 213,5. Empleador 5.000 x 4,51 % = 225,5." },
    fecha: "2026-10-24",
    entrada: { sachar: 5000 },
    esperado: { bituachLeumi: 52, masBriut: 161.5, total: 213.5, maasik: 225.5 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-24",
    entrada: { sachar: 0 },
    esperaError: true,
  },
]);
