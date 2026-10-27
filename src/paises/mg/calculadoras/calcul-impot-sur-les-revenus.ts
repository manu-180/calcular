import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.calcul-impot-sur-les-revenus",
  mercado: "mg",
  concepto: "propio",
  slug: "calcul-impot-sur-les-revenus",
  estado: "publicado",
  requiere: {
    "mg.ir-taux": "numero",
    "mg.ir-minimum-fixe": "mapa",
    "mg.ir-minimum-ca": "mapa",
    "mg.is-seuil": "numero",
  },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice imposable de l'exercice", min: 0, porDefecto: 50000000, ayuda: "Mettez 0 en cas de perte : le minimum de perception reste dû." },
    { id: "ca", tipo: "moneda", etiqueta: "Chiffre d'affaires hors taxe de l'exercice", min: 0, porDefecto: 500000000 },
    { id: "activite", tipo: "opcion-dato", dato: "mg.ir-minimum-fixe", etiqueta: "Activité", porDefecto: "autres" },
  ],
  calcular(e, v, { redondear }) {
    if (e.ca <= 0 && e.benefice <= 0) throw new ErrorEntrada("Indiquez un bénéfice ou un chiffre d'affaires.", "ca");
    const fixe = v["mg.ir-minimum-fixe"][e.activite];
    const partCa = v["mg.ir-minimum-ca"][e.activite];
    if (fixe === undefined || partCa === undefined) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const base = Math.floor(e.benefice / 1000) * 1000;
    const impotTaux = redondear(porcentaje(base, v["mg.ir-taux"]));
    const minimum = redondear(fixe + porcentaje(e.ca, partCa));
    const impot = Math.max(impotTaux, minimum);
    return {
      impot,
      impotTaux,
      minimum,
      retenu: impot === impotTaux && impotTaux > minimum ? "Impôt au taux de 20 %" : "Minimum de perception",
      tauxEffectif: e.benefice > 0 ? (impot / e.benefice) * 100 : null,
    };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt sur les revenus dû", formato: "moneda", destacada: true },
    { clave: "impotTaux", etiqueta: "Impôt au taux normal sur le bénéfice", formato: "moneda" },
    { clave: "minimum", etiqueta: "Minimum de perception", formato: "moneda" },
    { clave: "retenu", etiqueta: "Montant retenu", formato: "texto" },
    { clave: "tauxEffectif", etiqueta: "Impôt rapporté au bénéfice", formato: "porcentaje", decimales: 1 },
  ],
});
