import { definirCasos } from "@/motor/calculo";
import are from "./calcul-allocation-chomage";

export default definirCasos(are, [
  {
    nombre: "2 500 € brut par mois",
    origen: {
      tipo: "recalculado",
      detalle: "SJR 2 500 × 12 ÷ 365 = 82,19. 13,18 + 40,4 % × 82,19 = 46,38 ; 57 % × 82,19 = 46,85 retenu. Retenue 3 % = 2,47 ; 44,38 par jour, 1 331,40 sur 30 jours.",
    },
    fecha: "2026-10-14",
    entrada: { mode: "salaire", montant: 2500 },
    esperado: { sjr: 82.19, aj: 46.85, retraite: 2.47, ajApres: 44.38, mensuel: 1331.4, degressive: null },
  },
  {
    nombre: "SJR de 250 € : dégressivité au 7e mois",
    origen: {
      tipo: "recalculado",
      detalle: "57 % × 250 = 142,50 (plus que 13,18 + 101). À partir du 7e mois : 142,50 × 70 % = 99,75, au-dessus du plancher de 92,57.",
    },
    fecha: "2026-10-14",
    entrada: { mode: "sjr", montant: 250 },
    esperado: { aj: 142.5, retraite: 7.5, ajApres: 135, degressive: 99.75 },
  },
  {
    nombre: "Petit SJR : plafond de 75 %",
    origen: { tipo: "recalculado", detalle: "SJR 40 € : le minimum de 32,13 dépasse 75 % du SJR (30 €), l'allocation est de 30 €, sans retenue." },
    fecha: "2026-10-14",
    entrada: { mode: "sjr", montant: 40 },
    esperado: { aj: 30, retraite: 0, ajApres: 30 },
  },
]);
