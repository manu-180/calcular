import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.indemnites-journalieres",
  mercado: "fr",
  concepto: "propio",
  slug: "indemnites-journalieres-maladie",
  estado: "publicado",
  // La fiche officielle tronque au centime : 6 000 € sur 3 mois donnent 32,87 € et non 32,88 €.
  redondeo: { decimales: 2, modo: "truncar" },
  requiere: {
    "fr.smic-mensuel": "numero",
    "fr.ij-taux": "numero",
    "fr.ij-diviseur": "numero",
    "fr.ij-plafond-smic": "numero",
    "fr.ij-maximum": "numero",
    "fr.ij-carence": "numero",
  },
  campos: [
    { id: "salaires", tipo: "moneda", etiqueta: "Total des 3 derniers salaires bruts avant l'arrêt", min: 0, porDefecto: 6000 },
    { id: "jours", tipo: "entero", etiqueta: "Durée de l'arrêt (jours calendaires)", min: 1, max: 360, porDefecto: 10 },
    { id: "sansCarence", tipo: "si-no", etiqueta: "Arrêt sans délai de carence (ALD, reprise de moins de 48 heures)", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salaires <= 0) throw new ErrorEntrada("Indiquez le total de vos 3 derniers salaires bruts.", "salaires");
    const plafond = redondear(3 * redondear(valores["fr.smic-mensuel"] * valores["fr.ij-plafond-smic"]));
    const base = Math.min(entrada.salaires, plafond);
    const sjb = redondear(base / valores["fr.ij-diviseur"]);
    const ij =
      entrada.salaires >= plafond
        ? valores["fr.ij-maximum"]
        : Math.min(valores["fr.ij-maximum"], redondear(porcentaje(base / valores["fr.ij-diviseur"], valores["fr.ij-taux"])));
    const carence = entrada.sansCarence ? 0 : valores["fr.ij-carence"];
    const joursIndemnises = Math.max(0, entrada.jours - carence);
    return {
      sjb,
      ij,
      carence: Math.min(carence, entrada.jours),
      joursIndemnises,
      total: redondear(ij * joursIndemnises),
      observaciones: [
        "Montants bruts versés par l'Assurance maladie.",
        "Votre employeur peut compléter ces indemnités selon votre ancienneté et votre convention collective.",
      ],
    };
  },
  resultado: [
    { clave: "sjb", etiqueta: "Salaire journalier de base", formato: "moneda" },
    { clave: "ij", etiqueta: "Indemnité journalière brute", formato: "moneda", destacada: true },
    { clave: "carence", etiqueta: "Jours de carence non indemnisés", formato: "dias" },
    { clave: "joursIndemnises", etiqueta: "Jours indemnisés", formato: "dias" },
    { clave: "total", etiqueta: "Total des indemnités pour l'arrêt", formato: "moneda" },
  ],
});
