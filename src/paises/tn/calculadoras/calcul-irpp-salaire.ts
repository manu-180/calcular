import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CHAMPS_FAMILLE, REQ_SALAIRE, salaire } from "../lib/irpp";

export default definirCalculadora({
  id: "tn.calcul-irpp-salaire",
  mercado: "tn",
  concepto: "impuesto-renta",
  slug: "calcul-irpp-salaire",
  estado: "publicado",
  requiere: REQ_SALAIRE,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 2000 },
    ...CHAMPS_FAMILLE,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const s = salaire(entrada.brut, entrada, v, redondear);
    return {
      irppMensuel: s.irppMensuel,
      cssMensuel: s.cssMensuel,
      irppAnnuel: s.irpp,
      cssAnnuel: s.css,
      brutAnnuel: s.brutAnnuel,
      cnss: s.cnss,
      frais: s.frais,
      deductions: s.deductions,
      base: s.base,
      tauxMoyen: redondear(((s.irpp + s.css) / s.brutAnnuel) * 100),
      observaciones: ["L'employeur retient l'impôt chaque mois. Ce calcul donne l'impôt annuel divisé par 12, pour un salaire stable sur l'année."],
    };
  },
  resultado: [
    { clave: "irppMensuel", etiqueta: "IRPP retenu par mois", formato: "moneda", destacada: true },
    { clave: "cssMensuel", etiqueta: "Contribution sociale de solidarité par mois", formato: "moneda" },
    { clave: "irppAnnuel", etiqueta: "IRPP annuel", formato: "moneda" },
    { clave: "cssAnnuel", etiqueta: "Contribution sociale de solidarité annuelle", formato: "moneda" },
    { clave: "brutAnnuel", etiqueta: "Salaire brut annuel", formato: "moneda" },
    { clave: "cnss", etiqueta: "Moins : cotisations CNSS", formato: "moneda" },
    { clave: "frais", etiqueta: "Moins : frais professionnels", formato: "moneda" },
    { clave: "deductions", etiqueta: "Moins : déductions pour charges de famille", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "Revenu net imposable annuel", formato: "moneda" },
    { clave: "tauxMoyen", etiqueta: "Taux moyen sur le brut", formato: "porcentaje", decimales: 1 },
  ],
});
