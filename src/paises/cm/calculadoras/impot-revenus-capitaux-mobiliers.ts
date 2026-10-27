import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.impot-revenus-capitaux-mobiliers",
  mercado: "cm",
  concepto: "propio",
  slug: "impot-revenus-capitaux-mobiliers",
  estado: "publicado",
  requiere: { "cm.rcm-taux": "mapa", "cm.cac": "numero", "cm.is-seuil-pme": "numero" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut des revenus", min: 0, porDefecto: 1000000, ayuda: "Dividendes, intérêts, plus-values sur titres." },
    { id: "cas", tipo: "opcion-dato", etiqueta: "Situation", dato: "cm.rcm-taux", porDefecto: "general" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le montant ne peut pas être négatif.", "montant");
    const taux = enMapa(v["cm.rcm-taux"], entrada.cas);
    const impot = redondear(porcentaje(entrada.montant, taux));
    const cac = redondear(porcentaje(impot, v["cm.cac"]));
    return { taux, impot, cac, total: impot + cac, net: entrada.montant - impot - cac };
  },
  resultado: [
    { clave: "total", etiqueta: "Impôt retenu à la source (CAC compris)", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux en principal", formato: "porcentaje" },
    { clave: "impot", etiqueta: "IRPP libératoire en principal", formato: "moneda" },
    { clave: "cac", etiqueta: "Centimes additionnels communaux", formato: "moneda" },
    { clave: "net", etiqueta: "Revenu net perçu", formato: "moneda" },
  ],
});
