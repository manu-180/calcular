import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-pbb";

export default definirCasos(calculadora, [
  {
    nombre: "Batas undang-undang",
    origen: { tipo: "recalculado", detalle: "UU 1/2022 Pasal 40 dan 41: (500.000.000 - 10.000.000) x 100% x 0,5% = 2.450.000." },
    fecha: "2026-10-24",
    entrada: { njopBumi: 300000000, njopBangunan: 200000000, njoptkp: null, persen: null, tarif: null },
    esperado: { pbb: 2450000, dasar: 490000000 },
  },
  {
    nombre: "Perda dengan 40% NJOP dan tarif 0,2%",
    origen: { tipo: "recalculado", detalle: "(500.000.000 - 15.000.000) x 40% = 194.000.000 x 0,2% = 388.000." },
    fecha: "2026-10-24",
    entrada: { njopBumi: 300000000, njopBangunan: 200000000, njoptkp: 15000000, persen: 40, tarif: 0.2 },
    esperado: { pbb: 388000, dasar: 194000000 },
  },
  {
    nombre: "Persentase NJOP di bawah 20%",
    origen: { tipo: "recalculado", detalle: "Pasal 40 ayat (5): paling rendah 20%." },
    fecha: "2026-10-24",
    entrada: { njopBumi: 300000000, njopBangunan: 0, njoptkp: null, persen: 10, tarif: null },
    esperaError: true,
  },
]);
