import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { ajouterMois } from "../lib/datum";

export default definirCalculadora({
  id: "tn.conge-maternite",
  mercado: "tn",
  concepto: "propio",
  slug: "conge-maternite",
  estado: "publicado",
  requiere: {
    "tn.conges-maternite": "mapa",
  },
  campos: [
    { id: "naissance", tipo: "fecha", etiqueta: "Date de l'accouchement (prévue ou réelle)", porDefecto: "hoy" },
    {
      id: "cas",
      tipo: "opcion",
      etiqueta: "Situation",
      opciones: [
        { valor: "normal", etiqueta: "Naissance d'un enfant" },
        { valor: "renforce", etiqueta: "Jumeaux ou plus, enfant prématuré, handicapé ou avec malformation" },
        { valor: "mort-ne", etiqueta: "Enfant mort-né" },
      ],
      porDefecto: "normal",
    },
    {
      id: "postnatal",
      tipo: "entero",
      etiqueta: "Congé postnatal demandé, en mois (0 si aucun)",
      min: 0,
      max: 4,
      porDefecto: 0,
      ayuda: "Facultatif, de un à quatre mois, avec l'accord de l'employeur. La demande se fait au moins quinze jours avant la fin du congé de naissance.",
      visibleSi: { cas: ["normal", "renforce"] },
    },
  ],
  calcular(entrada, v) {
    const c = v["tn.conges-maternite"];
    const postnatal = entrada.cas === "mort-ne" ? 0 : (entrada.postnatal ?? 0);
    if (postnatal !== 0 && (postnatal < c["postnatal-min-mois"] || postnatal > c["postnatal-max-mois"])) {
      throw new ErrorEntrada(`Le congé postnatal dure de ${c["postnatal-min-mois"]} à ${c["postnatal-max-mois"]} mois.`, "postnatal");
    }
    const moisNaissance = entrada.cas === "normal" ? c["naissance-mois"] : entrada.cas === "renforce" ? c["naissance-mois-renforce"] : c["mort-ne-mois"];
    const finNaissance = ajouterMois(entrada.naissance, moisNaissance);
    const reprise = ajouterMois(entrada.naissance, moisNaissance + postnatal);
    const paternite = entrada.cas === "normal" ? c["paternite-jours"] : entrada.cas === "renforce" ? c["paternite-jours-renforce"] : c["paternite-mort-ne-jours"];
    const allaitement = entrada.cas === "mort-ne" ? null : postnatal > 0 ? ajouterMois(entrada.naissance, 12) : ajouterMois(reprise, 9);
    return {
      reprise,
      debutPrenatal: sumarDias(entrada.naissance, -c["prenatal-jours"]),
      finNaissance,
      joursMaternite: c["prenatal-jours"] + diasEntre(entrada.naissance, reprise),
      paternite,
      limitePaternite: sumarDias(entrada.naissance, c["paternite-delai-jours"]),
      allaitement,
      observaciones: [
        "Loi n° 2024-44 sur les congés de maternité et de paternité. Dans le secteur privé, la mère perçoit pendant ces congés une indemnité calculée selon la législation de sécurité sociale, et non son salaire.",
      ],
    };
  },
  resultado: [
    { clave: "reprise", etiqueta: "Reprise du travail", formato: "fecha", destacada: true },
    { clave: "debutPrenatal", etiqueta: "Congé prénatal possible à partir du", formato: "fecha" },
    { clave: "finNaissance", etiqueta: "Fin du congé de naissance", formato: "fecha" },
    { clave: "joursMaternite", etiqueta: "Durée totale des congés de maternité, prénatal compris", formato: "dias" },
    { clave: "paternite", etiqueta: "Congé de paternité payé", formato: "dias" },
    { clave: "limitePaternite", etiqueta: "Congé de paternité à prendre au plus tard le", formato: "fecha" },
    { clave: "allaitement", etiqueta: "Pause d'allaitement d'une heure par jour jusqu'au", formato: "fecha" },
  ],
});
