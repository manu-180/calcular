import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const RANGS = ["enfant-1", "enfant-2", "enfant-3"] as const;

export default definirCalculadora({
  id: "tn.allocations-familiales",
  mercado: "tn",
  concepto: "propio",
  slug: "allocations-familiales",
  estado: "publicado",
  requiere: {
    "tn.allocations-familiales-taux": "mapa",
    "tn.allocations-familiales-plafond": "numero",
  },
  campos: [
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 15, porDefecto: 2, ayuda: "Moins de 16 ans, ou jusqu'à 21 ans s'ils poursuivent leurs études ; sans limite d'âge pour un enfant handicapé." },
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel brut déclaré à la CNSS", min: 0, porDefecto: 1200 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const taux = v["tn.allocations-familiales-taux"];
    const base = Math.min(entrada.salaire * 3, v["tn.allocations-familiales-plafond"]);
    const retenus = Math.min(entrada.enfants, RANGS.length);
    const parEnfant = RANGS.map((r) => redondear(porcentaje(base, taux[r])));
    const trimestre = redondear(parEnfant.slice(0, retenus).reduce((a, b) => a + b, 0));
    return {
      trimestre,
      mois: redondear(trimestre / 3),
      annee: redondear(trimestre * 4),
      retenus,
      premier: parEnfant[0],
      deuxieme: parEnfant[1],
      troisieme: parEnfant[2],
      observaciones: [
        "Les allocations familiales de la CNSS ne sont versées que pour les trois premiers enfants à charge. Montants par trimestre, en pourcentage du revenu retenu dans la limite du plafond.",
      ],
    };
  },
  resultado: [
    { clave: "trimestre", etiqueta: "Allocations familiales par trimestre", formato: "moneda", destacada: true },
    { clave: "mois", etiqueta: "Soit par mois", formato: "moneda" },
    { clave: "annee", etiqueta: "Soit par an", formato: "moneda" },
    { clave: "retenus", etiqueta: "Enfants pris en compte", formato: "numero" },
    { clave: "premier", etiqueta: "Premier enfant, par trimestre", formato: "moneda" },
    { clave: "deuxieme", etiqueta: "Deuxième enfant, par trimestre", formato: "moneda" },
    { clave: "troisieme", etiqueta: "Troisième enfant, par trimestre", formato: "moneda" },
  ],
});
