import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impotSurSalaire, REQ_IR } from "../lib/ir";

export default definirCalculadora({
  id: "ma.calcul-ir-salaire",
  mercado: "ma",
  concepto: "impuesto-renta",
  slug: "calcul-ir-salaire",
  estado: "publicado",
  requiere: REQ_IR,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut imposable mensuel", min: 0, porDefecto: 10000, ayuda: "Sans les avantages en argent ou en nature ni les indemnités exonérées." },
    {
      id: "cotisations",
      tipo: "moneda",
      etiqueta: "Cotisations sociales retenues par mois (CNSS, AMO, retraite)",
      min: 0,
      porDefecto: 0,
      ayuda: "La part salariale qui figure sur votre bulletin de paie. Elle se déduit de la base de l'impôt.",
    },
    { id: "personnes", tipo: "entero", etiqueta: "Personnes à charge (conjoint et enfants)", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const ir = impotSurSalaire(entrada.brut, entrada.cotisations, entrada.personnes, v, redondear);
    return {
      impotMensuel: ir.impotMensuel,
      impotAnnuel: ir.impotAnnuel,
      brutAnnuel: ir.brutAnnuel,
      fraisProfessionnels: ir.fraisProfessionnels,
      cotisations: ir.cotisations,
      netImposable: ir.netImposable,
      impotBrut: ir.impotBrut,
      chargesDeFamille: ir.chargesDeFamille,
      tauxMoyen: redondear((ir.impotAnnuel / ir.brutAnnuel) * 100),
      observaciones: [
        "L'employeur retient l'impôt chaque mois sur le salaire. Ce calcul donne l'impôt sur une base annuelle divisé par 12, pour un salaire stable sur l'année.",
      ],
    };
  },
  resultado: [
    { clave: "impotMensuel", etiqueta: "Impôt sur le revenu par mois", formato: "moneda", destacada: true },
    { clave: "impotAnnuel", etiqueta: "Impôt sur le revenu par an", formato: "moneda" },
    { clave: "brutAnnuel", etiqueta: "Salaire brut imposable annuel", formato: "moneda" },
    { clave: "fraisProfessionnels", etiqueta: "Moins : frais professionnels forfaitaires", formato: "moneda" },
    { clave: "cotisations", etiqueta: "Moins : cotisations sociales", formato: "moneda", ocultarSiCero: true },
    { clave: "netImposable", etiqueta: "Revenu net imposable annuel", formato: "moneda" },
    { clave: "impotBrut", etiqueta: "Impôt selon le barème", formato: "moneda" },
    { clave: "chargesDeFamille", etiqueta: "Moins : réduction pour charges de famille", formato: "moneda", ocultarSiCero: true },
    { clave: "tauxMoyen", etiqueta: "Taux moyen sur le brut", formato: "porcentaje", decimales: 1 },
  ],
});
