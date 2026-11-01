import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.conges-payes",
  mercado: "dz",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: { "dz.conges": "mapa" },
  campos: [
    {
      id: "mois",
      tipo: "numero",
      etiqueta: "Mois de travail dans la période de référence",
      min: 0,
      max: 12,
      porDefecto: 12,
      ayuda: "La période va du 1er juillet de l'année précédente au 30 juin de l'année du congé. 24 jours ouvrables ou 4 semaines de travail comptent pour un mois.",
    },
    { id: "sud", tipo: "si-no", etiqueta: "Vous travaillez dans une wilaya du Sud", porDefecto: false, ayuda: "Les régions concernées sont délimitées par voie réglementaire." },
  ],
  calcular(e, v, { redondear }) {
    if (e.mois < 0 || e.mois > 12) throw new ErrorEntrada("Indiquez un nombre de mois entre 0 et 12.", "mois");
    const c = v["dz.conges"];
    const acquis = redondear(e.mois * c["par-mois"]);
    const principal = Math.min(acquis, c.plafond);
    const supplementaire = e.sud ? c.sud : 0;
    return {
      total: redondear(principal + supplementaire),
      principal,
      supplementaire: e.sud ? supplementaire : null,
      observaciones: [
        "Le congé se compte en jours calendaires. Les conventions collectives peuvent l'allonger pour les travaux pénibles ou dangereux et fixent les modalités du congé supplémentaire du Sud.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Jours de congé payé", formato: "dias", destacada: true },
    { clave: "principal", etiqueta: "Congé principal", formato: "dias" },
    { clave: "supplementaire", etiqueta: "Congé supplémentaire du Sud (minimum)", formato: "dias" },
  ],
});
