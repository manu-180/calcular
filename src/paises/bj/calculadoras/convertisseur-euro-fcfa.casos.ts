import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-euro-fcfa";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "500 euros en francs CFA",
    origen: { tipo: "recalculado", detalle: "500 × 655,957 = 327 978,5." },
    fecha: F,
    entrada: { sens: "eur-xof", montant: 500 },
    esperado: { resultat: 327978.5, parite: 655.957 },
  },
  {
    nombre: "1 000 000 de francs CFA en euros",
    origen: { tipo: "recalculado", detalle: "1 000 000 / 655,957 = 1 524,49." },
    fecha: F,
    entrada: { sens: "xof-eur", montant: 1000000 },
    esperado: { resultat: 1524.49 },
  },
]);
