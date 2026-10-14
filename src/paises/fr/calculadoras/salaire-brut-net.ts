import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { brutPourNet, REQUIERE_COTISATIONS, salaireMensuel } from "../lib/cotisations";

export default definirCalculadora({
  id: "fr.salaire-brut-net",
  mercado: "fr",
  concepto: "sueldo-neto",
  slug: "salaire-brut-net",
  estado: "publicado",
  requiere: REQUIERE_COTISATIONS,
  campos: [
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Vous connaissez",
      opciones: [
        { valor: "brut", etiqueta: "Le salaire brut (je cherche le net)" },
        { valor: "net", etiqueta: "Le salaire net (je cherche le brut)" },
      ],
      porDefecto: "brut",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 2500 },
    {
      id: "periode",
      tipo: "opcion",
      etiqueta: "Période",
      opciones: [
        { valor: "mois", etiqueta: "Par mois" },
        { valor: "an", etiqueta: "Par an (sur 12 mois)" },
      ],
      porDefecto: "mois",
    },
    {
      id: "statut",
      tipo: "opcion",
      etiqueta: "Statut",
      opciones: [
        { valor: "non-cadre", etiqueta: "Non-cadre" },
        { valor: "cadre", etiqueta: "Cadre" },
      ],
      porDefecto: "non-cadre",
    },
    { id: "alsaceMoselle", tipo: "si-no", etiqueta: "Vous travaillez en Alsace-Moselle (Bas-Rhin, Haut-Rhin, Moselle)", porDefecto: false },
    {
      id: "tauxPas",
      tipo: "porcentaje",
      etiqueta: "Taux de prélèvement à la source",
      min: 0,
      max: 60,
      requerido: false,
      ayuda: "Facultatif. Il figure sur votre avis d'impôt et sur votre bulletin de paie.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const opts = { cadre: entrada.statut === "cadre", alsaceMoselle: entrada.alsaceMoselle };
    const mois = entrada.periode === "an" ? entrada.montant / 12 : entrada.montant;
    const brutMensuel = entrada.sens === "brut" ? redondear(mois) : brutPourNet(redondear(mois), opts, valores, redondear);
    const d = salaireMensuel(brutMensuel, opts, valores, redondear);
    const pas = entrada.tauxPas === null ? null : redondear(porcentaje(d.netImposable, entrada.tauxPas));
    const k = entrada.periode === "an" ? 12 : 1;
    const fois = (x: number) => redondear(x * k);
    return {
      brut: fois(d.brut),
      cotisationsRetraite: fois(d.retraite),
      csgCrds: fois(d.csgCrds),
      maladieAlsaceMoselle: fois(d.maladieAlsaceMoselle),
      totalCotisations: fois(d.total),
      netAvantImpot: fois(d.net),
      netImposable: fois(d.netImposable),
      prelevementSource: pas === null ? null : fois(pas),
      netApresImpot: pas === null ? null : fois(d.net - pas),
      partNet: redondear((d.net / d.brut) * 100),
      observaciones: [
        "La mutuelle et la prévoyance d'entreprise ne sont pas comptées : leur part salariale dépend de votre contrat et se retire en plus.",
      ],
    };
  },
  resultado: [
    { clave: "brut", etiqueta: "Salaire brut", formato: "moneda" },
    { clave: "cotisationsRetraite", etiqueta: "Cotisations retraite (base et complémentaire)", formato: "moneda" },
    { clave: "csgCrds", etiqueta: "CSG et CRDS", formato: "moneda" },
    { clave: "maladieAlsaceMoselle", etiqueta: "Cotisation maladie d'Alsace-Moselle", formato: "moneda", ocultarSiCero: true },
    { clave: "totalCotisations", etiqueta: "Total des cotisations salariales", formato: "moneda" },
    { clave: "netAvantImpot", etiqueta: "Net avant impôt sur le revenu", formato: "moneda", destacada: true },
    { clave: "netImposable", etiqueta: "Net imposable", formato: "moneda" },
    { clave: "prelevementSource", etiqueta: "Prélèvement à la source", formato: "moneda" },
    { clave: "netApresImpot", etiqueta: "Net à payer après impôt", formato: "moneda" },
    { clave: "partNet", etiqueta: "Part du brut qui reste en net", formato: "porcentaje", decimales: 2 },
  ],
});
