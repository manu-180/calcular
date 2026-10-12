import { definirCasos } from "@/motor/calculo";
import pgu from "./pgu";

export default definirCasos(pgu, [
  {
    nombre: "Sin pensión, 70 años",
    origen: { tipo: "oficial", url: "https://www.chileatiende.gob.cl/fichas/102077-pension-garantizada-universal-pgu", detalle: "ChileAtiende: pensión base hasta $789.139 recibe $231.732." },
    fecha: "2026-10-07",
    entrada: { edad: "menor-75", pensionBase: 0 },
    esperado: { pgu: 231732, total: 231732 },
  },
  {
    nombre: "75 años o más con pensión baja",
    origen: { tipo: "oficial", url: "https://www.chileatiende.gob.cl/fichas/130457", detalle: "Desde septiembre de 2026, 75 años o más: monto máximo $250.275. Pensión base 300.000 (bajo la inferior): total 550.275." },
    fecha: "2026-10-07",
    entrada: { edad: "75-o-mas", pensionBase: 300000 },
    esperado: { pgu: 250275, total: 550275 },
  },
  {
    nombre: "Pensión base entre la inferior y la superior",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 21.419 art. 12: 231.732 × (1.252.602 − 1.000.000) / (1.252.602 − 789.139) = 231.732 × 252.602 / 463.463 = 126.301,27 → 126.301.",
    },
    fecha: "2026-10-07",
    entrada: { edad: "menor-75", pensionBase: 1000000 },
    esperado: { pgu: 126301 },
  },
  {
    nombre: "Pensión base igual a la superior",
    origen: { tipo: "recalculado", detalle: "En la pensión superior el factor es 0: no hay PGU." },
    fecha: "2026-10-07",
    entrada: { edad: "menor-75", pensionBase: 1252602 },
    esperado: { pgu: 0 },
  },
]);
