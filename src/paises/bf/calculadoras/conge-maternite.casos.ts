import { definirCasos } from "@/motor/calculo";
import calculadora from "./conge-maternite";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Terme le 1er décembre 2026, départ six semaines avant",
    origen: { tipo: "recalculado", detalle: "Article 169 : 14 semaines. Début 20 octobre 2026 ; 98 jours plus tard, reprise le 26 janvier 2027." },
    fecha: F,
    entrada: { terme: "2026-12-01", avant: 6 },
    esperado: { debut: "2026-10-20", fin: "2027-01-25", reprise: "2027-01-26", semainesApres: 8 },
  },
  {
    nombre: "Départ deux semaines avant sur avis médical",
    origen: { tipo: "recalculado", detalle: "Début 17 novembre 2026, douze semaines après le terme. Reprise le 23 février 2027." },
    fecha: F,
    entrada: { terme: "2026-12-01", avant: 2 },
    esperado: { debut: "2026-11-17", reprise: "2027-02-23", semainesApres: 12 },
  },
]);
