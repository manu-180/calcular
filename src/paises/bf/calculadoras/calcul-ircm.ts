import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.calcul-ircm",
  mercado: "bf",
  concepto: "propio",
  slug: "calcul-ircm",
  estado: "publicado",
  requiere: { "bf.ircm-taux": "mapa" },
  campos: [
    { id: "nature", tipo: "opcion-dato", dato: "bf.ircm-taux", etiqueta: "Nature du revenu", porDefecto: "dividendes" },
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut du revenu", min: 0, porDefecto: 1000000 },
    {
      id: "nouvelle",
      tipo: "si-no",
      etiqueta: "Distribué par une société nouvelle (trois premiers exercices)",
      porDefecto: false,
      visibleSi: { nature: ["dividendes"] },
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le montant ne peut pas être négatif.", "montant");
    const tauxLegal = enMapa(v["bf.ircm-taux"], entrada.nature);
    // Article 141 : tarif réduit de moitié sur les produits distribués pendant les trois premiers
    // exercices d'une société nouvelle.
    const taux = entrada.nouvelle ? tauxLegal / 2 : tauxLegal;
    const impot = redondear(porcentaje(entrada.montant, taux));
    return { impot, taux, net: redondear(entrada.montant - impot) };
  },
  resultado: [
    { clave: "impot", etiqueta: "IRCM retenu", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 2 },
    { clave: "net", etiqueta: "Revenu net perçu", formato: "moneda" },
  ],
});
