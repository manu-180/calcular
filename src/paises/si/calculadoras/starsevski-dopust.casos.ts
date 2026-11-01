import { definirCasos } from "@/motor/calculo";
import calc from "./starsevski-dopust";

export default definirCasos(calc, [
  { nombre: "Starševski", origen: { tipo: "recalculado", detalle: "90 % × 2000 = 1800; 1800 × 160 / 30 = 9600" }, fecha: "2026-10-31", entrada: { osnova: 2000, vrsta: "starsevski", hkrati: 1 }, esperado: { mesecno: 1800, dni: 160, skupaj: 9600 } },
  { nombre: "Materinski", origen: { tipo: "recalculado", detalle: "100 % × 2000; 105 dni" }, fecha: "2026-10-31", entrada: { osnova: 2000, vrsta: "materinski", hkrati: 1 }, esperado: { mesecno: 2000, dni: 105, skupaj: 7000 } },
  { nombre: "Osnova pod minimalno", origen: { tipo: "recalculado", detalle: "1400 ≤ 1481,88: 100 %" }, fecha: "2026-10-31", entrada: { osnova: 1400, vrsta: "ocetovski", hkrati: 2 }, esperado: { mesecno: 1400, dni: 25 } },
]);
