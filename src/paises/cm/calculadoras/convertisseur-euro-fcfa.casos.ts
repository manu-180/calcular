import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-euro-fcfa";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "1 euro",
    origen: { tipo: "oficial", url: "https://www.beac.int/billets-pieces/histoire-franc-cfa/", detalle: "BEAC : 1 EUR = 655,957 FCFA depuis le 1er janvier 1999." },
    fecha: F,
    entrada: { sens: "eur-xaf", montant: 1 },
    esperado: { francs: 656, parite: 655.957 },
  },
  {
    nombre: "100 euros",
    origen: { tipo: "recalculado", detalle: "100 × 655,957 = 65 595,7, arrondi à 65 596 F." },
    fecha: F,
    entrada: { sens: "eur-xaf", montant: 100 },
    esperado: { francs: 65596 },
  },
  {
    nombre: "100 000 F en euros",
    origen: { tipo: "recalculado", detalle: "100 000 / 655,957 = 152,45 €." },
    fecha: F,
    entrada: { sens: "xaf-eur", montant: 100000 },
    esperado: { euros: 152.45 },
  },
]);
