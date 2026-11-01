import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.impot-sur-les-societes",
  mercado: "bf",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: { "bf.is-taux": "numero", "bf.mfp-taux": "numero", "bf.mfp-minimum": "mapa", "bf.mfp-reduction-cga": "numero" },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice imposable de l'exercice", min: 0, porDefecto: 10000000, ayuda: "Indiquez 0 en cas de déficit." },
    { id: "chiffre", tipo: "moneda", etiqueta: "Chiffre d'affaires hors taxes de l'exercice", min: 0, porDefecto: 100000000 },
    { id: "regime", tipo: "opcion-dato", dato: "bf.mfp-minimum", etiqueta: "Régime d'imposition", porDefecto: "reel-normal" },
    { id: "cga", tipo: "si-no", etiqueta: "Adhérent d'un centre de gestion agréé", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.benefice < 0) throw new ErrorEntrada("Le bénéfice ne peut pas être négatif : indiquez 0 en cas de déficit.", "benefice");
    if (entrada.chiffre < 0) throw new ErrorEntrada("Le chiffre d'affaires ne peut pas être négatif.", "chiffre");
    // Articles 87 et 89 du CGI : le bénéfice néglige les fractions de 1 000 F, le chiffre d'affaires
    // est arrondi aux 100 000 F inférieurs.
    const is = redondear(porcentaje(Math.floor(entrada.benefice / 1000) * 1000, v["bf.is-taux"]));
    const mfpBrut = Math.max(
      redondear(porcentaje(Math.floor(entrada.chiffre / 100000) * 100000, v["bf.mfp-taux"])),
      enMapa(v["bf.mfp-minimum"], entrada.regime),
    );
    const mfp = entrada.cga ? redondear(mfpBrut - porcentaje(mfpBrut, v["bf.mfp-reduction-cga"])) : mfpBrut;
    const du = Math.max(is, mfp);
    return {
      du,
      is,
      mfp,
      retenu: is >= mfp ? "Impôt sur les sociétés" : "Minimum forfaitaire de perception",
    };
  },
  resultado: [
    { clave: "du", etiqueta: "Impôt dû pour l'exercice", formato: "moneda", destacada: true },
    { clave: "retenu", etiqueta: "Montant retenu", formato: "texto" },
    { clave: "is", etiqueta: "Impôt sur les sociétés calculé", formato: "moneda" },
    { clave: "mfp", etiqueta: "Minimum forfaitaire de perception", formato: "moneda" },
  ],
});
