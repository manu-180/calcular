import { definirCasos } from "@/motor/calculo";
import calculadora from "./acompte-aib";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Achat de 1 000 000 F hors TVA, fournisseur avec IFU",
    origen: { tipo: "recalculado", detalle: "Art. 132, paragraphe 2 a : 1 % de 1 000 000 = 10 000 ." },
    fecha: F,
    entrada: { montant: 1000000, base: "ht", operation: "ifu" },
    esperado: { acompte: 10000, base: 1000000, taux: 1 },
  },
  {
    nombre: "Prestation de 590 000 F TVA comprise avec IFU",
    origen: { tipo: "recalculado", detalle: "Base 590 000 / 1,18 = 500 000 ; art. 132, paragraphe 2 b : 3 % = 15 000." },
    fecha: F,
    entrada: { montant: 590000, base: "ttc", operation: "services-ifu" },
    esperado: { base: 500000, acompte: 15000, taux: 3 },
  },
  {
    nombre: "Fournisseur sans IFU",
    origen: { tipo: "recalculado", detalle: "Art. 132, paragraphe 2 c : 5 % de 200 000 = 10 000." },
    fecha: F,
    entrada: { montant: 200000, base: "ht", operation: "sans-ifu" },
    esperado: { acompte: 10000, taux: 5 },
  },
]);
