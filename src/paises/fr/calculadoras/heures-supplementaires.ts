import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const HEURES_MOIS_35H = (35 * 52) / 12;

export default definirCalculadora({
  id: "fr.heures-supplementaires",
  mercado: "fr",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "publicado",
  requiere: {
    "fr.hs-majoration-1": "numero",
    "fr.hs-majoration-2": "numero",
    "fr.hs-heures-tranche-1": "numero",
    "fr.hs-reduction-salariale": "numero",
    "fr.hs-exoneration-ir": "numero",
    "fr.csg-deductible": "numero",
    "fr.csg-non-deductible": "numero",
    "fr.crds": "numero",
    "fr.assiette-csg": "numero",
  },
  campos: [
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Vous connaissez",
      opciones: [
        { valor: "mensuel", etiqueta: "Mon salaire mensuel brut (35 heures)" },
        { valor: "horaire", etiqueta: "Mon taux horaire brut" },
      ],
      porDefecto: "mensuel",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut", min: 0, porDefecto: 2200 },
    { id: "heuresSup", tipo: "numero", etiqueta: "Heures supplémentaires par semaine", min: 0, max: 13, porDefecto: 4, ayuda: "Les heures faites au-delà de 35 heures dans la semaine." },
    { id: "semaines", tipo: "entero", etiqueta: "Nombre de semaines", min: 1, max: 52, porDefecto: 4 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un salaire ou un taux horaire supérieur à zéro.", "montant");
    const tauxHoraire = entrada.base === "horaire" ? entrada.montant : redondear(entrada.montant / HEURES_MOIS_35H);
    const seuil = valores["fr.hs-heures-tranche-1"];
    const heures1 = Math.min(entrada.heuresSup, seuil) * entrada.semaines;
    const heures2 = Math.max(0, entrada.heuresSup - seuil) * entrada.semaines;
    const taux1 = redondear(tauxHoraire * (1 + valores["fr.hs-majoration-1"] / 100));
    const taux2 = redondear(tauxHoraire * (1 + valores["fr.hs-majoration-2"] / 100));
    const montant1 = redondear(heures1 * taux1);
    const montant2 = redondear(heures2 * taux2);
    const brut = redondear(montant1 + montant2);
    const tauxCsgCrds = valores["fr.csg-deductible"] + valores["fr.csg-non-deductible"] + valores["fr.crds"];
    const csgCrds = redondear(porcentaje(porcentaje(brut, valores["fr.assiette-csg"]), tauxCsgCrds));
    return {
      tauxHoraire,
      taux1,
      taux2,
      heures1,
      heures2,
      montant1,
      montant2,
      brut,
      netEstime: redondear(brut - csgCrds),
      observaciones: [
        "Les cotisations salariales de retraite sur ces heures sont réduites, dans une limite fixée par la loi. Le net estimé suppose une réduction complète : il ne retire que la CSG et la CRDS.",
        "Les heures supplémentaires sont exonérées d'impôt sur le revenu jusqu'à un plafond annuel.",
      ],
    };
  },
  resultado: [
    { clave: "tauxHoraire", etiqueta: "Taux horaire brut de base", formato: "moneda" },
    { clave: "taux1", etiqueta: "Taux horaire majoré (premières heures)", formato: "moneda" },
    { clave: "taux2", etiqueta: "Taux horaire majoré (heures suivantes)", formato: "moneda", ocultarSiCero: true },
    { clave: "heures1", etiqueta: "Heures au premier taux", formato: "horas", decimales: 2 },
    { clave: "heures2", etiqueta: "Heures au second taux", formato: "horas", decimales: 2, ocultarSiCero: true },
    { clave: "montant1", etiqueta: "Paiement des heures au premier taux", formato: "moneda" },
    { clave: "montant2", etiqueta: "Paiement des heures au second taux", formato: "moneda", ocultarSiCero: true },
    { clave: "brut", etiqueta: "Total brut des heures supplémentaires", formato: "moneda", destacada: true },
    { clave: "netEstime", etiqueta: "Net estimé", formato: "moneda" },
  ],
});
