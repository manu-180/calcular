import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-euro-fcfa";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "100 euros en francs CFA",
    origen: { tipo: "oficial", url: "https://www.bceao.int/fr/content/histoire-du-franc-cfa", detalle: "1 euro = 655,957 F CFA. 100 × 655,957 = 65 595,7, arrondi à 65 596." },
    fecha: F,
    entrada: { sens: "eur-xof", montant: 100 },
    esperado: { francs: 65596, parite: 655.957 },
  },
  {
    nombre: "100 000 F CFA en euros",
    origen: { tipo: "recalculado", detalle: "100 000 / 655,957 = 152,45 euros." },
    fecha: F,
    entrada: { sens: "xof-eur", montant: 100000 },
    esperado: { euros: 152.45 },
  },
]);
