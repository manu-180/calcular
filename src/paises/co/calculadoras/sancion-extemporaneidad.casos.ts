import { definirCasos } from "@/motor/calculo";
import sancion from "./sancion-extemporaneidad";

export default definirCasos(sancion, [
  {
    nombre: "Impuesto de 10 millones, dos meses tarde",
    origen: { tipo: "recalculado", detalle: "ET art. 641: 5 % × 2 meses = 10 % de 10.000.000 = 1.000.000." },
    fecha: "2026-10-15",
    entrada: { impuesto: 10000000, meses: 2, ingresos: 0, saldoFavor: 0, reduccion: "ninguna" },
    esperado: { calculada: 1000000, sancion: 1000000 },
  },
  {
    nombre: "Se aplica la sanción mínima",
    origen: { tipo: "recalculado", detalle: "15 % de 2.000.000 = 300.000, menos que 10 UVT (ET art. 639) = 523.740." },
    fecha: "2026-10-15",
    entrada: { impuesto: 2000000, meses: 3, ingresos: 0, saldoFavor: 0, reduccion: "ninguna" },
    esperado: { minima: 523740, sancion: 523740 },
  },
  {
    nombre: "Tope del 100 % del impuesto",
    origen: { tipo: "recalculado", detalle: "25 meses × 5 % = 125 %, con tope del 100 % de 1.000.000." },
    fecha: "2026-10-15",
    entrada: { impuesto: 1000000, meses: 25, ingresos: 0, saldoFavor: 0, reduccion: "ninguna" },
    esperado: { tope: 1000000, sancion: 1000000 },
  },
  {
    nombre: "Sin impuesto a cargo: sobre los ingresos",
    origen: { tipo: "recalculado", detalle: "0,5 % × 2 meses × 80.000.000 = 800.000; tope min(5 % = 4.000.000; 2.500 UVT)." },
    fecha: "2026-10-15",
    entrada: { impuesto: 0, meses: 2, ingresos: 80000000, saldoFavor: 0, reduccion: "ninguna" },
    esperado: { calculada: 800000, tope: 4000000, sancion: 800000 },
  },
  {
    nombre: "Sin impuesto y con saldo a favor",
    origen: { tipo: "recalculado", detalle: "Tope: el doble del saldo a favor (600.000) es menor que 4.000.000. Sanción 600.000." },
    fecha: "2026-10-15",
    entrada: { impuesto: 0, meses: 2, ingresos: 80000000, saldoFavor: 300000, reduccion: "ninguna" },
    esperado: { tope: 600000, sancion: 600000 },
  },
  {
    nombre: "Reducción al 50 % por no haber incumplido en dos años",
    origen: { tipo: "recalculado", detalle: "ET art. 640 num. 1: 10 % de 20.000.000 = 2.000.000; el 50 % es 1.000.000, que supera la mínima." },
    fecha: "2026-10-15",
    entrada: { impuesto: 20000000, meses: 2, ingresos: 0, saldoFavor: 0, reduccion: "dos-anios" },
    esperado: { factor: 50, sancion: 1000000 },
  },
  {
    nombre: "La reducción no baja de la sanción mínima",
    origen: { tipo: "recalculado", detalle: "75 % de 600.000 = 450.000, pero la mínima de 10 UVT (523.740) incluye las sanciones reducidas (ET art. 639)." },
    fecha: "2026-10-15",
    entrada: { impuesto: 6000000, meses: 2, ingresos: 0, saldoFavor: 0, reduccion: "un-anio" },
    esperado: { factor: 75, sancion: 523740 },
  },
]);
