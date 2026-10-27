import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.taxe-fonciere",
  mercado: "cm",
  concepto: "propio",
  slug: "taxe-fonciere",
  estado: "publicado",
  requiere: { "cm.taxe-fonciere": "escala" },
  campos: [
    {
      id: "valeur",
      tipo: "moneda",
      etiqueta: "Valeur totale de vos propriétés",
      min: 0,
      porDefecto: 40000000,
      ayuda: "La valeur déclarée selon la zone, ou à défaut la valeur administrative.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valeur < 0) throw new ErrorEntrada("La valeur ne peut pas être négative.", "valeur");
    const taxe = redondear(aplicarEscalaMarginal(v["cm.taxe-fonciere"], entrada.valeur));
    const observaciones: string[] = [];
    if (entrada.valeur > (v["cm.taxe-fonciere"][0].hasta ?? Infinity)) {
      observaciones.push("Au-delà du premier seuil, chaque tranche paie son taux. La loi parle d'un barème progressif sans plus de détail : confirmez le montant au centre des impôts.");
    }
    return { taxe, tauxMoyen: entrada.valeur > 0 ? Math.round((taxe / entrada.valeur) * 100000) / 1000 : 0, observaciones };
  },
  resultado: [
    { clave: "taxe", etiqueta: "Taxe sur la propriété foncière de l'année", formato: "moneda", destacada: true },
    { clave: "tauxMoyen", etiqueta: "Taux moyen", formato: "porcentaje", decimales: 3 },
  ],
});
