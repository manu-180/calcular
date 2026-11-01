import { definirCasos } from "@/motor/calculo";
import convertisseurEuroFcfa from "./convertisseur-euro-fcfa";

const F = "2026-10-29";

export default definirCasos(convertisseurEuroFcfa, [
  {
    nombre: "100 euros",
    origen: { tipo: "recalculado", detalle: "100 × 655,957 = 65 595,7, arrondi à 65 596." },
    fecha: F,
    entrada: { sens: "eur-xof", montant: 100 },
    esperado: { francs: 65596, cours: 655.957 },
  },
  {
    nombre: "655 957 F en euros",
    origen: { tipo: "recalculado", detalle: "655 957 ÷ 655,957 = 1 000." },
    fecha: F,
    entrada: { sens: "xof-eur", montant: 655957 },
    esperado: { euros: 1000 },
  },
]);
