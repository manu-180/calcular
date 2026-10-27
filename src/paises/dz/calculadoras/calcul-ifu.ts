import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.calcul-ifu",
  mercado: "dz",
  concepto: "regimen-simplificado",
  slug: "calcul-ifu",
  estado: "publicado",
  requiere: { "dz.ifu-taux": "mapa", "dz.ifu-plafond": "numero", "dz.ifu-minimum": "mapa" },
  campos: [
    { id: "ca", tipo: "moneda", etiqueta: "Chiffre d'affaires annuel", min: 0, porDefecto: 3000000 },
    { id: "activite", tipo: "opcion-dato", dato: "dz.ifu-taux", etiqueta: "Activité ou statut", porDefecto: "biens" },
  ],
  calcular(e, v, { redondear }) {
    if (e.ca < 0) throw new ErrorEntrada("Indiquez un chiffre d'affaires positif.", "ca");
    const autoEntrepreneur = e.activite === "auto-entrepreneur";
    const taux = v["dz.ifu-taux"][e.activite];
    const calcule = redondear(porcentaje(e.ca, taux));
    const minimum = autoEntrepreneur ? v["dz.ifu-minimum"]["auto-entrepreneur"] : v["dz.ifu-minimum"].general;
    const ifu = Math.max(calcule, minimum);
    const observaciones: string[] = [];
    if (calcule < minimum) observaciones.push("Le montant calculé est inférieur au minimum d'imposition : c'est le minimum qui est dû.");
    if (!autoEntrepreneur && e.ca > v["dz.ifu-plafond"]) {
      observaciones.push("Ce chiffre d'affaires dépasse le plafond de l'IFU. Le régime reste applicable l'année du dépassement et l'année suivante.");
    }
    return {
      ifu,
      taux,
      calcule,
      minimum,
      mensuel: redondear(ifu / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "ifu", etiqueta: "IFU dû pour l'année", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 1 },
    { clave: "calcule", etiqueta: "Impôt calculé sur le chiffre d'affaires", formato: "moneda" },
    { clave: "minimum", etiqueta: "Minimum d'imposition", formato: "moneda" },
    { clave: "mensuel", etiqueta: "Équivalent par mois", formato: "moneda" },
  ],
});
