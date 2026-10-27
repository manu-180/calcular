import { definirCasos } from "@/motor/calculo";
import calculadora from "./bituach-leumi-atzmai";

export default definirCasos(calculadora, [
  {
    nombre: "Autónomo con 15.000 por mes",
    origen: { tipo: "recalculado", detalle: "7.703 x 4,47% + 7.297 x 12,83% = 1.280,53; 7.703 x 3,23% + 7.297 x 5,17% = 626,06; total 1.906,59." },
    fecha: "2026-10-26",
    entrada: { hachnasa: 15000, gil: "regil" },
    esperado: { leumi: 1280.53, briut: 626.06, sach: 1906.59, shnati: 22879.08 },
  },
  {
    nombre: "Ingreso bajo: paga sobre el ingreso mínimo",
    origen: { tipo: "recalculado", detalle: "3.442 x 4,47% = 153,86; 3.442 x 3,23% = 111,18; total 265,04." },
    fecha: "2026-10-26",
    entrada: { hachnasa: 2000, gil: "regil" },
    esperado: { leumi: 153.86, briut: 111.18, sach: 265.04 },
  },
  {
    nombre: "Sobre el ingreso máximo",
    origen: { tipo: "recalculado", detalle: "Base 51.910: 344,32 + 44.207 x 12,83% = 6.016,08; 248,81 + 44.207 x 5,17% = 2.534,31; total 8.550,39." },
    fecha: "2026-10-26",
    entrada: { hachnasa: 60000, gil: "regil" },
    esperado: { leumi: 6016.08, briut: 2534.31, sach: 8550.39 },
  },
  {
    nombre: "Pasada la edad de retiro sin קצבה",
    origen: { tipo: "recalculado", detalle: "7.703 x 6,92% + 7.297 x 15,79% = 1.685,24." },
    fecha: "2026-10-26",
    entrada: { hachnasa: 15000, gil: "prisha" },
    esperado: { sach: 1685.24 },
  },
]);
