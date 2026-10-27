import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.cout-employeur",
  mercado: "ml",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "borrador",
  requiere: { "ml.inps-employeur": "mapa", "ml.amo-taux": "mapa", "ml.taxes-salaires": "mapa", "ml.smig": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 250000 },
    { id: "assujetti", tipo: "si-no", etiqueta: "Entreprise soumise à l'IS, à l'IBIC ou à l'impôt sur les bénéfices agricoles", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "brut");
    const inps = v["ml.inps-employeur"];
    const t = v["ml.taxes-salaires"];
    const assiette = Math.max(entrada.brut, v["ml.smig"]);
    const cotisationsInps = redondear(porcentaje(assiette, inps["retraite"] + inps["prestations-familiales"] + inps["accidents-travail"]));
    const amo = redondear(porcentaje(assiette, v["ml.amo-taux"]["employeur-prive"]));
    const base = Math.floor(entrada.brut / 1000) * 1000;
    const taxes = redondear(porcentaje(base, entrada.assujetti ? t["cfe"] + t["tfp"] + t["tej"] : 0) + porcentaje(entrada.brut, t["logement"]));
    const cout = redondear(entrada.brut + cotisationsInps + amo + taxes);
    return { cout, cotisationsInps, amo, taxes, coutAnnuel: redondear(cout * 12) };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût mensuel pour l'employeur", formato: "moneda", destacada: true },
    { clave: "cotisationsInps", etiqueta: "Cotisations patronales INPS", formato: "moneda" },
    { clave: "amo", etiqueta: "Part patronale AMO", formato: "moneda" },
    { clave: "taxes", etiqueta: "Taxes sur les salaires", formato: "moneda" },
    { clave: "coutAnnuel", etiqueta: "Coût sur 12 mois", formato: "moneda" },
  ],
});
