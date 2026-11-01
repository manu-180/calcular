import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-fin-de-service";

export default definirCasos(calculadora, [
  {
    nombre: "Huit ans et neuf mois d'ancienneté : le plafond de trois mois s'applique",
    origen: { tipo: "recalculado", detalle: "105 mois × 1 jour × 60 = 6 300, plafonné à 3 × 1 500 = 4 500 (article 22)." },
    fecha: "2026-10-24",
    entrada: { mensuel: 1500, journalier: 60, embauche: "2018-01-01", rupture: "2026-10-24" },
    esperado: { indemnite: 4500, plafond: 4500 },
  },
  {
    nombre: "Cinq mois complets : un jour de salaire par mois",
    origen: { tipo: "recalculado", detalle: "Du 10 janvier au 9 juillet : 5 mois complets × 50 = 250, sous le plafond de 3 900." },
    fecha: "2026-10-24",
    entrada: { mensuel: 1300, journalier: 50, embauche: "2026-01-10", rupture: "2026-07-09" },
    esperado: { indemnite: 250, plafond: 3900 },
  },
]);
