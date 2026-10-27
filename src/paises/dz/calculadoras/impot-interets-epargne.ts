import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.impot-interets-epargne",
  mercado: "dz",
  concepto: "propio",
  slug: "impot-interets-epargne",
  estado: "publicado",
  requiere: { "dz.irg-epargne": "escala", "dz.irg-creances": "numero" },
  campos: [
    { id: "interets", tipo: "moneda", etiqueta: "Intérêts bruts de l'année", min: 0, porDefecto: 80000 },
    {
      id: "placement",
      tipo: "opcion",
      etiqueta: "Type de placement",
      opciones: [
        { valor: "livret", etiqueta: "Livret ou compte d'épargne" },
        { valor: "depot", etiqueta: "Dépôt à terme, bon de caisse ou autre créance" },
      ],
      porDefecto: "livret",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.interets <= 0) throw new ErrorEntrada("Indiquez un montant d'intérêts supérieur à zéro.", "interets");
    const echelle = v["dz.irg-epargne"];
    const seuil = echelle[0].hasta ?? 0;
    let retenue: number;
    let liberatoire: number;
    const observaciones: string[] = [];
    if (e.placement === "livret") {
      retenue = redondear(aplicarEscalaMarginal(echelle, e.interets));
      liberatoire = redondear(porcentaje(Math.min(e.interets, seuil), echelle[0].tasa));
      if (e.interets > seuil) {
        observaciones.push("La retenue sur la fraction au-delà du seuil est un crédit d'impôt : ces intérêts entrent dans la déclaration annuelle de revenus et la retenue s'impute sur l'impôt dû.");
      }
    } else {
      retenue = redondear(porcentaje(e.interets, v["dz.irg-creances"]));
      liberatoire = 0;
      observaciones.push("La retenue est un crédit d'impôt : les intérêts entrent dans la déclaration annuelle de revenus et la retenue s'impute sur l'impôt dû.");
    }
    return {
      net: redondear(e.interets - retenue),
      retenue,
      liberatoire,
      credit: redondear(retenue - liberatoire),
      tauxMoyen: (retenue / e.interets) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Intérêts nets versés", formato: "moneda", destacada: true },
    { clave: "retenue", etiqueta: "Retenue à la source", formato: "moneda" },
    { clave: "liberatoire", etiqueta: "Dont retenue libératoire", formato: "moneda" },
    { clave: "credit", etiqueta: "Dont crédit d'impôt", formato: "moneda" },
    { clave: "tauxMoyen", etiqueta: "Taux moyen de la retenue", formato: "porcentaje", decimales: 2 },
  ],
});
