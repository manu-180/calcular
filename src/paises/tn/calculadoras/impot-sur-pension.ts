import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CHAMPS_FAMILLE, deductionsFamille, irppEtCss, REQ_IRPP } from "../lib/irpp";

export default definirCalculadora({
  id: "tn.impot-sur-pension",
  mercado: "tn",
  concepto: "propio",
  slug: "impot-sur-pension",
  estado: "publicado",
  requiere: { ...REQ_IRPP, "tn.abattement-pensions": "numero" },
  campos: [
    { id: "pension", tipo: "moneda", etiqueta: "Pension ou rente brute mensuelle", min: 0, porDefecto: 1200 },
    ...CHAMPS_FAMILLE,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.pension <= 0) throw new ErrorEntrada("Indiquez une pension supérieure à zéro.", "pension");
    const annuelle = redondear(entrada.pension * 12);
    const abattement = redondear(porcentaje(annuelle, v["tn.abattement-pensions"]));
    const net = redondear(annuelle - abattement);
    const deductions = Math.min(net, deductionsFamille(entrada, v));
    const base = redondear(net - deductions);
    const { irpp, css } = irppEtCss(base, true, v, redondear);
    return {
      mensuel: redondear((irpp + css) / 12),
      annuelle,
      abattement,
      deductions,
      base,
      irpp,
      css,
    };
  },
  resultado: [
    { clave: "mensuel", etiqueta: "Impôt et contribution par mois", formato: "moneda", destacada: true },
    { clave: "annuelle", etiqueta: "Pension brute annuelle", formato: "moneda" },
    { clave: "abattement", etiqueta: "Moins : abattement", formato: "moneda" },
    { clave: "deductions", etiqueta: "Moins : déductions pour charges de famille", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "Revenu net imposable annuel", formato: "moneda" },
    { clave: "irpp", etiqueta: "IRPP annuel", formato: "moneda" },
    { clave: "css", etiqueta: "Contribution sociale de solidarité annuelle", formato: "moneda" },
  ],
});
