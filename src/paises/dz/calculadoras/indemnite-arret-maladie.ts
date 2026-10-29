import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { OBS_ASSIETTE, paie, REQ_PAIE } from "../lib/irg";

export default definirCalculadora({
  id: "dz.indemnite-arret-maladie",
  mercado: "dz",
  concepto: "propio",
  slug: "indemnite-arret-maladie",
  estado: "publicado",
  requiere: { ...REQ_PAIE, "dz.maladie-taux": "mapa", "dz.maladie-jours-reduits": "numero", "dz.indemnite-diviseur": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 60000, ayuda: "Salaire soumis à cotisation, avant la retenue de sécurité sociale et l'IRG." },
    { id: "jours", tipo: "entero", etiqueta: "Jours d'arrêt de travail", min: 1, max: 1095, porDefecto: 20, ayuda: "Tous les jours de l'arrêt, ouvrables ou non." },
    { id: "plein", tipo: "si-no", etiqueta: "Maladie de longue durée ou hospitalisation", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    if (e.jours < 1) throw new ErrorEntrada("Indiquez au moins un jour d'arrêt.", "jours");
    const t = v["dz.maladie-taux"];
    const p = paie(e.brut, false, v, redondear);
    const journalier = redondear(p.net / v["dz.indemnite-diviseur"]);
    const joursReduits = e.plein ? 0 : Math.min(e.jours, v["dz.maladie-jours-reduits"]);
    const joursPleins = e.jours - joursReduits;
    const montantReduit = redondear(porcentaje(journalier, t.reduit) * joursReduits);
    const montantPlein = redondear(porcentaje(journalier, t.plein) * joursPleins);
    const total = redondear(montantReduit + montantPlein);
    return {
      total,
      journalier,
      joursReduits,
      montantReduit,
      joursPleins,
      montantPlein,
      perte: Math.max(0, redondear(journalier * e.jours - total)),
      observaciones: [
        "L'indemnité est due pour chaque jour de l'arrêt, ouvrable ou non, à condition que la CNAS ait reçu l'arrêt de travail dans les délais. Le salaire journalier retenu est le salaire net mensuel divisé par trente.",
        OBS_ASSIETTE,
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Indemnités journalières sur l'arrêt", formato: "moneda", destacada: true },
    { clave: "journalier", etiqueta: "Salaire journalier net", formato: "moneda" },
    { clave: "joursReduits", etiqueta: "Jours indemnisés à taux réduit", formato: "dias" },
    { clave: "montantReduit", etiqueta: "Montant à taux réduit", formato: "moneda" },
    { clave: "joursPleins", etiqueta: "Jours indemnisés à taux plein", formato: "dias" },
    { clave: "montantPlein", etiqueta: "Montant à taux plein", formato: "moneda" },
    { clave: "perte", etiqueta: "Écart avec le salaire net de la période", formato: "moneda" },
  ],
});
