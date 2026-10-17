import { definirTextos } from "@/motor/edicion";
import cpp from "../../ca/calculadoras/cpp-calculator";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(cpp, {
  calculadora: "ca-fr.cpp-calculator",
  slug: "calcul-cotisations-rrq",
  campos: {
    ingreso: { etiqueta: "Gains admissibles pour 2026", ayuda: "Votre salaire et vos avantages imposables, ou votre revenu net de travail autonome." },
    situacion: { etiqueta: "Comment vous gagnez ce revenu", opciones: { employee: "Comme salarié", "self-employed": "Comme travailleur autonome" } },
    plan: { etiqueta: "Où vous travaillez", opciones: { cpp: "Hors Québec (RPC)", qpp: "Au Québec (RRQ)" }, porDefecto: "qpp" },
  },
  filas: {
    total: { etiqueta: "Vos cotisations totales pour 2026" },
    base: { etiqueta: "Cotisations de base" },
    primera: { etiqueta: "Premières cotisations supplémentaires" },
    segunda: { etiqueta: "Deuxièmes cotisations supplémentaires (RRQ2 ou RPC2)" },
    mensual: { etiqueta: "Moyenne par mois" },
    empleador: { etiqueta: "Ce que votre employeur ajoute" },
    deducible: { etiqueta: "Cotisations supplémentaires déductibles du revenu" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "You reach the yearly maximum, so nothing more is deducted after that point in the year.":
      "Vous atteignez le maximum annuel : plus rien n'est retenu à partir de ce moment de l'année.",
    "Self-employed people pay both the employee and the employer share, so the amounts are doubled.":
      "Le travailleur autonome paie la part du salarié et celle de l'employeur : les montants sont donc doublés.",
  },
});
