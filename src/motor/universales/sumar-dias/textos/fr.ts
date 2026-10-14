import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosFr: TextosUi<UiSumarDias> = {
  slug: "ajouter-des-jours-a-une-date",
  ui: () => ({
    fecha: "Date de départ",
    operacion: "Opération",
    sumar: "Ajouter des jours",
    restar: "Retirer des jours",
    dias: "Nombre de jours",
    tipo: "Type de jours",
    corridos: "Jours calendaires",
    habiles: "Jours ouvrés (du lundi au vendredi)",
    resultado: "Date obtenue",
    diaSemana: "Jour de la semaine",
    diasCorridos: "Jours calendaires au total",
    nombresDias: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    errorDias: "Le nombre de jours doit être un nombre entier, sur 100 ans au plus.",
    notaHabiles: "Les jours ouvrés sautent les samedis et les dimanches, mais pas les jours fériés. S’il y en a un dans la période, ajoutez-le à part.",
  }),
};
