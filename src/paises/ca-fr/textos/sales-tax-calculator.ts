import { definirTextos } from "@/motor/edicion";
import salesTax from "../../ca/calculadoras/sales-tax-calculator";
import { MENSAJES_COMUNES, tauxEnFrancais } from "../lib/comun";

const SIGLAS: Readonly<Record<string, string>> = { GST: "TPS", HST: "TVH", QST: "TVQ", PST: "TVP", RST: "TVD" };

export default definirTextos(salesTax, {
  calculadora: "ca-fr.sales-tax-calculator",
  slug: "calculatrice-tps-tvq",
  campos: {
    region: { etiqueta: "Province ou territoire", porDefecto: "qc" },
    operacion: { etiqueta: "Ce que vous voulez faire", opciones: { agregar: "Ajouter les taxes à un prix", quitar: "Retirer les taxes d'un total" } },
    monto: { etiqueta: "Montant" },
  },
  filas: {
    total: { etiqueta: "Total avec taxes" },
    antes: { etiqueta: "Prix avant taxes" },
    impuestoFederal: { etiqueta: "TPS ou TVH" },
    impuestoProvincial: { etiqueta: "Taxe de vente provinciale (TVQ ou TVP)" },
    impuestos: { etiqueta: "Total des taxes" },
    tasaTotal: { etiqueta: "Taux combiné" },
    tipo: { etiqueta: "Taxes applicables" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "HST combines the federal GST and the provincial part in a single tax.": "La TVH regroupe en une seule taxe la TPS fédérale et la partie provinciale.",
  },
  // «GST 5% + QST 9.975%» → «TPS 5 % + TVQ 9,975 %»
  traducir: (t) => (/^(?:GST|HST) \d/.test(t) ? tauxEnFrancais(t.replace(/\b(GST|HST|QST|PST|RST)\b/g, (s) => SIGLAS[s])) : undefined),
});
