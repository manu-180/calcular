import { definirCasos } from "@/motor/calculo";
import calc from "./rodiljna-naknada";

const U = "https://hzzo.hr/rodiljne-i-roditeljske-potpore";

export default definirCasos(calc, [
  { nombre: "Rodiljni, 100 %", origen: { tipo: "recalculado", url: U, detalle: "100 % osnovice, bez ograničenja: 4.000 x 6 = 24.000." }, fecha: "2026-11-01", entrada: { osnovica: 4000, vrsta: "rodiljni", staz: true, mjeseci: 6 }, esperado: { mjesecno: 4000, ukupno: 24000 } },
  { nombre: "Rodiljni bez staža", origen: { tipo: "oficial", url: U, detalle: "159 % proračunske osnovice: 701,89 eura." }, fecha: "2026-11-01", entrada: { osnovica: 2000, vrsta: "rodiljni", staz: false, mjeseci: 1 }, esperado: { mjesecno: 701.89 } },
  { nombre: "Roditeljski, gornja granica", origen: { tipo: "oficial", url: U, detalle: "Najviše 3.001,79 eura." }, fecha: "2026-11-01", entrada: { osnovica: 4000, vrsta: "roditeljski", staz: null, mjeseci: 2 }, esperado: { mjesecno: 3001.79, ukupno: 6003.58 } },
  { nombre: "Roditeljski, donja granica", origen: { tipo: "oficial", url: U, detalle: "Najmanje 701,89 eura." }, fecha: "2026-11-01", entrada: { osnovica: 500, vrsta: "roditeljski", staz: null, mjeseci: 1 }, esperado: { mjesecno: 701.89 } },
  { nombre: "Preostali dopust", origen: { tipo: "oficial", url: U, detalle: "182 % proračunske osnovice: 803,42 eura." }, fecha: "2026-11-01", entrada: { osnovica: 2000, vrsta: "preostali", staz: null, mjeseci: 1 }, esperado: { mjesecno: 803.42 } },
]);
