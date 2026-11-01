import { definirCasos } from "@/motor/calculo";
import porezNaNepokretnosti from "./porez-na-nepokretnosti";

const CLANAK = "https://www.gov.me/clanak/porez-na-nepokretnosti";

export default definirCasos(porezNaNepokretnosti, [
  {
    nombre: "Raspon za stan od 100.000 eura",
    origen: { tipo: "recalculado", url: CLANAK, detalle: "0,25 % = 250; 1 % = 1.000." },
    fecha: "2026-10-31",
    entrada: { vrijednost: 100000, stopa: null },
    esperado: { min: 250, max: 1000, porez: 1000 },
  },
  {
    nombre: "Opštinska stopa 0,5 odsto",
    origen: { tipo: "recalculado", url: CLANAK, detalle: "80.000 x 0,5 % = 400." },
    fecha: "2026-10-31",
    entrada: { vrijednost: 80000, stopa: 0.5 },
    esperado: { porez: 400 },
  },
  {
    nombre: "Vrijednost nula je greška",
    origen: { tipo: "recalculado", url: CLANAK, detalle: "Bez osnovice nema poreza." },
    fecha: "2026-10-31",
    entrada: { vrijednost: 0, stopa: null },
    esperaError: true,
  },
]);
