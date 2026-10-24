import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lu.conges-payes",
  mercado: "lu",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: { "lu.conges-jours": "numero", "lu.heures-par-mois": "numero" },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de travail entiers dans l'année", min: 0, max: 12, porDefecto: 12 },
    { id: "contrat", tipo: "numero", etiqueta: "Jours de congé selon le contrat (s'il en prévoit plus)", min: 0, max: 60, requerido: false },
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 4325 },
    { id: "heuresJour", tipo: "numero", etiqueta: "Heures de travail par jour", min: 1, max: 12, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (!Number.isInteger(entrada.mois) || entrada.mois < 0 || entrada.mois > 12) throw new ErrorEntrada("Indiquez un nombre de mois entre 0 et 12.", "mois");
    const legal = valores["lu.conges-jours"];
    const annuel = Math.max(legal, entrada.contrat ?? 0);
    const jours = redondear((annuel * entrada.mois) / 12);
    const horaire = entrada.brut / valores["lu.heures-par-mois"];
    const indemniteJour = redondear(horaire * entrada.heuresJour);
    return {
      jours,
      annuel,
      indemniteJour,
      indemnite: redondear(indemniteJour * jours),
      observaciones: entrada.contrat !== null && entrada.contrat < legal ? ["Le contrat ne peut pas prévoir moins que le minimum légal. Le calcul retient le minimum légal."] : [],
    };
  },
  resultado: [
    { clave: "jours", etiqueta: "Jours de congé acquis", formato: "dias", decimales: 2, destacada: true },
    { clave: "annuel", etiqueta: "Jours de congé pour une année complète", formato: "dias" },
    { clave: "indemniteJour", etiqueta: "Indemnité de congé par jour", formato: "moneda" },
    { clave: "indemnite", etiqueta: "Indemnité pour les jours acquis", formato: "moneda" },
  ],
});
