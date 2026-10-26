import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.taxe-entreprenant",
  mercado: "ci",
  concepto: "regimen-simplificado",
  slug: "taxe-entreprenant",
  estado: "publicado",
  requiere: {
    "ci.regimes-seuils": "mapa",
    "ci.entreprenant-taxe-communale": "mapa",
    "ci.entreprenant-taxe-etat": "mapa",
    "ci.entreprenant-reduction-cga": "numero",
    "ci.microentreprises-taux": "mapa",
  },
  campos: [
    { id: "ca", tipo: "moneda", etiqueta: "Chiffre d'affaires annuel toutes taxes comprises", min: 0, porDefecto: 12000000 },
    {
      id: "activite",
      tipo: "opcion",
      etiqueta: "Activité",
      opciones: [
        { valor: "commerce", etiqueta: "Commerce ou négoce" },
        { valor: "autres", etiqueta: "Autres activités, prestations de services comprises" },
      ],
      porDefecto: "commerce",
    },
    { id: "cga", tipo: "si-no", etiqueta: "Adhérent d'un Centre de gestion agréé (CGA)", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ca <= 0) throw new ErrorEntrada("Indiquez un chiffre d'affaires supérieur à zéro.", "ca");
    const s = v["ci.regimes-seuils"];
    let regime: string;
    let taux: number;
    if (entrada.ca <= s["taxe-communale"]) {
      regime = "Taxe communale de l'entreprenant";
      taux = enMapa(v["ci.entreprenant-taxe-communale"], entrada.activite);
    } else if (entrada.ca <= s["taxe-etat"]) {
      regime = "Taxe d'État de l'entreprenant";
      const base = enMapa(v["ci.entreprenant-taxe-etat"], entrada.activite);
      taux = entrada.cga ? base - porcentaje(base, v["ci.entreprenant-reduction-cga"]) : base;
    } else if (entrada.ca <= s.microentreprises) {
      regime = "Impôt des microentreprises";
      taux = entrada.cga ? v["ci.microentreprises-taux"].adherent : v["ci.microentreprises-taux"].normal;
    } else {
      return {
        regime: "Régime du réel",
        taux: 0,
        impotAnnuel: 0,
        impotMensuel: 0,
        observaciones: ["Au-delà de ce chiffre d'affaires, vous relevez d'un régime du réel : l'impôt se calcule sur le bénéfice et la TVA s'applique."],
      };
    }
    const impotAnnuel = redondear(porcentaje(entrada.ca, taux));
    return { regime, taux, impotAnnuel, impotMensuel: redondear(impotAnnuel / 12), observaciones: [] as string[] };
  },
  resultado: [
    { clave: "impotAnnuel", etiqueta: "Impôt annuel", formato: "moneda", destacada: true },
    { clave: "impotMensuel", etiqueta: "Versement mensuel (1/12)", formato: "moneda" },
    { clave: "regime", etiqueta: "Régime d'imposition", formato: "texto" },
    { clave: "taux", etiqueta: "Taux appliqué au chiffre d'affaires", formato: "porcentaje", decimales: 1 },
  ],
});
