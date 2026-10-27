import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisations-cnss";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "150 000 F par mois",
    origen: {
      tipo: "recalculado",
      detalle: "Travailleur 5,5 % = 8 250. Employeur 8,5 % (12 750) + 6 % (9 000) + 1,5 % (2 250) = 24 000. Total 32 250.",
    },
    fecha: F,
    entrada: { remuneration: 150000 },
    esperado: { salarie: 8250, vieillesseEmployeur: 12750, prestationsFamiliales: 9000, risquesProfessionnels: 2250, employeur: 24000, total: 32250 },
  },
  {
    nombre: "1 000 000 F : assiette plafonnée",
    origen: { tipo: "recalculado", detalle: "Plafond 800 000. Travailleur 44 000 ; employeur 16 % = 128 000 ; total 172 000." },
    fecha: F,
    entrada: { remuneration: 1000000 },
    esperado: { assiette: 800000, salarie: 44000, employeur: 128000, total: 172000 },
  },
  {
    nombre: "30 000 F : assiette relevée au SMIG",
    origen: { tipo: "recalculado", detalle: "L'assiette ne peut pas être inférieure au SMIG (45 000). Travailleur 5,5 % × 45 000 = 2 475." },
    fecha: F,
    entrada: { remuneration: 30000 },
    esperado: { assiette: 45000, salarie: 2475, employeur: 7200 },
  },
  {
    nombre: "Rémunération nulle",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { remuneration: 0 },
    esperaError: true,
  },
]);
