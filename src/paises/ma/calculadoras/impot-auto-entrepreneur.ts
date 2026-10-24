import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ma.impot-auto-entrepreneur",
  mercado: "ma",
  concepto: "regimen-simplificado",
  slug: "impot-auto-entrepreneur",
  estado: "publicado",
  requiere: {
    "ma.auto-entrepreneur-taux": "mapa",
    "ma.auto-entrepreneur-plafonds": "mapa",
  },
  campos: [
    { id: "ca", tipo: "moneda", etiqueta: "Chiffre d'affaires encaissé sur l'année", min: 0, porDefecto: 120000 },
    {
      id: "activite",
      tipo: "opcion",
      etiqueta: "Type d'activité",
      opciones: [
        { valor: "commerce", etiqueta: "Activité commerciale, industrielle ou artisanale" },
        { valor: "services", etiqueta: "Prestation de services" },
      ],
      porDefecto: "services",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ca <= 0) throw new ErrorEntrada("Indiquez un chiffre d'affaires supérieur à zéro.", "ca");
    const taux = v["ma.auto-entrepreneur-taux"][entrada.activite];
    const plafond = v["ma.auto-entrepreneur-plafonds"][entrada.activite];
    const impot = redondear(porcentaje(entrada.ca, taux));
    const observaciones: string[] = [];
    if (entrada.ca > plafond)
      observaciones.push("Votre chiffre d'affaires dépasse le plafond du régime. Si cela se produit deux années de suite, l'option pour l'auto-entrepreneur cesse de s'appliquer.");
    return { impot, parTrimestre: redondear(impot / 4), taux, plafond, observaciones };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt sur le revenu de l'année", formato: "moneda", destacada: true },
    { clave: "parTrimestre", etiqueta: "En moyenne par trimestre", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué au chiffre d'affaires", formato: "porcentaje", decimales: 1 },
    { clave: "plafond", etiqueta: "Plafond annuel du régime pour votre activité", formato: "moneda" },
  ],
});
