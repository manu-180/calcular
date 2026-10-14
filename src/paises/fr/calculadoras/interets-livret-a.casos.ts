import { definirCasos } from "@/motor/calculo";
import livret from "./interets-livret-a";

export default definirCasos(livret, [
  {
    nombre: "10 000 € déposés le 10 février 2026, jusqu'au 31 décembre",
    origen: {
      tipo: "recalculado",
      detalle: "Valeur au 16 février. 11 quinzaines à 1,5 % (jusqu'au 31 juillet) et 10 à 1,7 % : 10 000 × (1,5 × 11 + 1,7 × 10) ÷ 100 ÷ 24 = 139,58 €.",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2365",
    },
    fecha: "2026-10-14",
    entrada: { montant: 10000, depot: "2026-02-10", fin: "2026-12-31" },
    esperado: { quinzaines: 21, interets: 139.58, solde: 10139.58 },
  },
  {
    nombre: "Dépôt le 20 août, retrait le 10 novembre",
    origen: {
      tipo: "recalculado",
      detalle: "Dépôt après le 15 : valeur au 1er septembre. Retrait avant le 16 : arrêt au 31 octobre. 4 quinzaines × 10 000 × 1,7 % ÷ 24 = 28,33 €.",
    },
    fecha: "2026-10-14",
    entrada: { montant: 10000, depot: "2026-08-20", fin: "2026-11-10" },
    esperado: { quinzaines: 4, interets: 28.33 },
  },
  {
    nombre: "Sur deux années, avec capitalisation au 31 décembre",
    origen: {
      tipo: "recalculado",
      detalle: "9 quinzaines en 2026 : 63,75 € ajoutés au capital. 3 quinzaines en 2027 sur 10 063,75 € : 21,39 €. Total 85,14 €.",
    },
    fecha: "2026-10-14",
    entrada: { montant: 10000, depot: "2026-08-01", fin: "2027-02-28" },
    esperado: { quinzaines: 12, interets: 85.14 },
  },
  {
    nombre: "Au-dessus du plafond",
    origen: { tipo: "recalculado", detalle: "Le plafond de dépôt est de 22 950 €." },
    fecha: "2026-10-14",
    entrada: { montant: 30000, depot: "2026-08-01", fin: "2026-12-31" },
    esperaError: true,
  },
]);
