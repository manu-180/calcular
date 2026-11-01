import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { irppAnnuel, irppMensuel, REQ_IRPP } from "../lib/paie";

export default definirCalculadora({
  id: "cm.calcul-irpp",
  mercado: "cm",
  concepto: "impuesto-renta",
  slug: "calcul-irpp",
  estado: "publicado",
  requiere: REQ_IRPP,
  campos: [
    {
      id: "periode",
      tipo: "opcion",
      etiqueta: "Le salaire indiqué est",
      opciones: [
        { valor: "mois", etiqueta: "Mensuel" },
        { valor: "annee", etiqueta: "Annuel" },
      ],
      porDefecto: "mois",
    },
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut taxable",
      min: 0,
      porDefecto: 500000,
      ayuda: "Traitements, primes, indemnités imposables et avantages en nature, avant toute retenue.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const mensuel = entrada.periode === "mois" ? entrada.brut : entrada.brut / 12;
    const pension = porcentaje(Math.min(mensuel, v["cm.cnps-plafond"]), v["cm.cnps-pension"].salarie) * 12;
    const a = irppAnnuel(mensuel * 12, pension, v, redondear);
    const m = irppMensuel(mensuel, v, redondear);
    const exonere = mensuel < v["cm.irpp-seuil-retenue"];
    return {
      fraisProfessionnels: a.fraisProfessionnels,
      cotisationPension: redondear(a.cotisationPension),
      baseImposable: redondear(a.baseImposable),
      irppAnnuel: exonere ? 0 : a.irpp,
      cacAnnuel: exonere ? 0 : a.cac,
      irppMois: m.irpp,
      cacMois: m.cac,
      totalMois: m.irpp + m.cac,
      tauxEffectif: exonere ? 0 : Math.round(((a.irpp + a.cac) / (mensuel * 12)) * 10000) / 100,
      observaciones: exonere ? ["Votre brut est sous le seuil de retenue du Code général des impôts : l'employeur ne retient pas d'IRPP."] : [],
    };
  },
  resultado: [
    { clave: "totalMois", etiqueta: "IRPP et CAC retenus chaque mois", formato: "moneda", destacada: true },
    { clave: "irppMois", etiqueta: "IRPP du mois", formato: "moneda" },
    { clave: "cacMois", etiqueta: "Centimes additionnels communaux du mois", formato: "moneda" },
    { clave: "fraisProfessionnels", etiqueta: "Frais professionnels déduits sur l'année", formato: "moneda" },
    { clave: "cotisationPension", etiqueta: "Pension CNPS déduite sur l'année", formato: "moneda" },
    { clave: "baseImposable", etiqueta: "Revenu imposable de l'année (après abattement)", formato: "moneda" },
    { clave: "irppAnnuel", etiqueta: "IRPP de l'année", formato: "moneda" },
    { clave: "cacAnnuel", etiqueta: "CAC de l'année", formato: "moneda" },
    { clave: "tauxEffectif", etiqueta: "Taux moyen sur le brut", formato: "porcentaje", decimales: 2 },
  ],
});
