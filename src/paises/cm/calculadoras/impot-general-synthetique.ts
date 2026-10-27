import { aplicarEscala, definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.impot-general-synthetique",
  mercado: "cm",
  concepto: "regimen-simplificado",
  slug: "impot-general-synthetique",
  estado: "publicado",
  requiere: { "cm.igs-bareme": "escala", "cm.igs-reduction-cga": "numero", "cm.igs-seuils": "mapa" },
  campos: [
    { id: "chiffreAffaires", tipo: "moneda", etiqueta: "Chiffre d'affaires annuel hors taxes", min: 0, porDefecto: 8000000 },
    { id: "activite", tipo: "opcion-dato", etiqueta: "Activité", dato: "cm.igs-seuils", porDefecto: "commercial" },
    {
      id: "cga",
      tipo: "si-no",
      etiqueta: "Adhérent d'un centre de gestion agréé",
      porDefecto: false,
      ayuda: "La réduction vaut pour les contribuables tenus d'avoir une comptabilité.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.chiffreAffaires < 0) throw new ErrorEntrada("Le chiffre d'affaires ne peut pas être négatif.", "chiffreAffaires");
    const seuil = enMapa(v["cm.igs-seuils"], entrada.activite);
    if (entrada.chiffreAffaires >= seuil) {
      return {
        tarif: null,
        reduction: null,
        igs: null,
        trimestre: null,
        observaciones: ["Avec ce chiffre d'affaires, vous relevez du régime du réel et non de l'impôt général synthétique."],
      };
    }
    const tarif = aplicarEscala(v["cm.igs-bareme"], Math.max(entrada.chiffreAffaires, 0.01));
    const reduction = entrada.cga ? redondear(porcentaje(tarif, v["cm.igs-reduction-cga"])) : 0;
    const igs = tarif - reduction;
    return { tarif, reduction, igs, trimestre: redondear(igs / 4), observaciones: [] };
  },
  resultado: [
    { clave: "igs", etiqueta: "Impôt général synthétique de l'année", formato: "moneda", destacada: true },
    { clave: "tarif", etiqueta: "Tarif de votre tranche", formato: "moneda" },
    { clave: "reduction", etiqueta: "Réduction centre de gestion agréé", formato: "moneda", ocultarSiCero: true },
    { clave: "trimestre", etiqueta: "Versement par trimestre", formato: "moneda" },
  ],
});
