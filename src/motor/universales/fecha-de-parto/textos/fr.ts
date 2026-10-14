import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosFr: TextosUi<UiFechaDeParto> = {
  slug: "calcul-date-accouchement",
  ui: () => ({
    metodo: "Quelle date connaissez-vous ?",
    fum: "Premier jour des dernières règles",
    concepcion: "Date de conception",
    fecha: "Date",
    fechaAyuda: "Si vous partez des dernières règles, indiquez le premier jour des saignements.",
    ciclo: "Durée du cycle (jours)",
    cicloAyuda: "Utilisée seulement avec les dernières règles. Si vous ne la connaissez pas, laissez 28.",
    fpp: "Date prévue d’accouchement",
    edadGestacional: "Aujourd’hui, en semaines d’aménorrhée",
    trimestre: "Trimestre",
    faltan: "Jours restants",
    fechaConcepcion: "Conception estimée",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "semaine" : "semaines"}${d ? ` et ${d} ${d === 1 ? "jour" : "jours"}` : ""}`,
    trimestres: ["Premier trimestre", "Deuxième trimestre", "Troisième trimestre"],
    errorFutura: "La date ne peut pas être postérieure à aujourd’hui.",
    errorCiclo: "La durée du cycle doit être comprise entre 20 et 45 jours.",
    notaPasada: "Plus de 42 semaines se sont écoulées depuis cette date : l’avancement de la grossesse n’est pas affiché.",
    aviso: "C’est une estimation : peu de bébés naissent le jour prévu. L’échographie et le suivi avec un professionnel de santé donnent la date la plus fiable.",
  }),
};
