import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.acompte-aib",
  mercado: "bj",
  concepto: "propio",
  slug: "acompte-aib",
  estado: "publicado",
  requiere: { "bj.aib-taux": "mapa", "bj.tva": "numero" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant de l'achat ou de la prestation", min: 0, porDefecto: 1000000 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Le montant saisi est",
      opciones: [
        { valor: "ht", etiqueta: "Hors TVA" },
        { valor: "ttc", etiqueta: "TVA comprise" },
      ],
      porDefecto: "ht",
    },
    {
      id: "operation",
      tipo: "opcion",
      etiqueta: "Opération",
      opciones: [
        { valor: "ifu", etiqueta: "Achat ou travaux avec un fournisseur muni d'un IFU" },
        { valor: "services-ifu", etiqueta: "Prestation de services d'une personne munie d'un IFU" },
        { valor: "sans-ifu", etiqueta: "Fournisseur ou prestataire sans IFU" },
      ],
      porDefecto: "ifu",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const base = e.base === "ttc" ? redondear(e.montant / (1 + v["bj.tva"] / 100)) : e.montant;
    const taux = v["bj.aib-taux"][e.operation];
    const acompte = redondear(porcentaje(base, taux));
    return { acompte, base, taux };
  },
  resultado: [
    { clave: "acompte", etiqueta: "Acompte sur impôt assis sur les bénéfices (AIB)", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Base de calcul hors TVA", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
  ],
});
