import { definirCalculadora } from "@/motor/calculo";
import { irppEtCss, REQ_IRPP } from "../lib/irpp";

export default definirCalculadora({
  id: "tn.bareme-irpp",
  mercado: "tn",
  concepto: "propio",
  slug: "bareme-irpp",
  estado: "publicado",
  requiere: REQ_IRPP,
  campos: [
    { id: "base", tipo: "moneda", etiqueta: "Revenu net imposable annuel", min: 0, porDefecto: 20000, ayuda: "Après les déductions pour frais et charges de famille." },
    { id: "salaire", tipo: "si-no", etiqueta: "Revenus uniquement composés de salaires ou de pensions", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    const { irpp, css } = irppEtCss(entrada.base, entrada.salaire, v, redondear);
    const total = redondear(irpp + css);
    return {
      total,
      irpp,
      css,
      tauxMoyen: entrada.base > 0 ? redondear((total / entrada.base) * 100) : 0,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Impôt et contribution à payer", formato: "moneda", destacada: true },
    { clave: "irpp", etiqueta: "Impôt sur le revenu selon le barème", formato: "moneda" },
    { clave: "css", etiqueta: "Contribution sociale de solidarité", formato: "moneda" },
    { clave: "tauxMoyen", etiqueta: "Taux moyen", formato: "porcentaje", decimales: 2 },
  ],
});
