import { definirCasos } from "@/motor/calculo";
import calc from "./izracun-odpravnine";

export default definirCasos(calc, [
  { nombre: "Osem let", origen: { tipo: "recalculado", detalle: "2000 × 8 / 5 = 3200" }, fecha: "2026-10-31", entrada: { placa: 2000, leta: 8 }, esperado: { odpravnina: 3200 } },
  { nombre: "Petnajst let", origen: { tipo: "recalculado", detalle: "2000 × 15 / 4 = 7500" }, fecha: "2026-10-31", entrada: { placa: 2000, leta: 15 }, esperado: { odpravnina: 7500 } },
  { nombre: "Petintrideset let z mejo", origen: { tipo: "recalculado", detalle: "2000 × 35 / 3 = 23333,33; meja 10 × 2000" }, fecha: "2026-10-31", entrada: { placa: 2000, leta: 35 }, esperado: { odpravnina: 20000 } },
  { nombre: "Manj kot leto", origen: { tipo: "recalculado", detalle: "Zakon določa več kot eno leto" }, fecha: "2026-10-31", entrada: { placa: 2000, leta: 0 }, esperado: { odpravnina: 0 } },
]);
