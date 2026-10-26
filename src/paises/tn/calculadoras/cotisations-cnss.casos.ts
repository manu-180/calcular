import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisations-cnss";

export default definirCasos(calculadora, [
  {
    nombre: "2 000 DT brut",
    origen: { tipo: "recalculado", detalle: "2 000 × 9,18 % = 183,6 ; × 16,57 % = 331,4 ; total 515 ; trimestre 1 545." },
    fecha: "2026-10-24",
    entrada: { brut: 2000 },
    esperado: { salarie: 183.6, employeur: 331.4, total: 515, trimestre: 1545 },
  },
  {
    nombre: "1 234,5 DT brut",
    origen: { tipo: "recalculado", detalle: "1 234,5 × 9,18 % = 113,327 ; × 16,57 % = 204,557." },
    fecha: "2026-10-24",
    entrada: { brut: 1234.5 },
    esperado: { salarie: 113.327, employeur: 204.557, total: 317.884 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-24",
    entrada: { brut: 0 },
    esperaError: true,
  },
]);
