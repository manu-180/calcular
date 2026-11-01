import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.impot-sur-les-societes",
  mercado: "tg",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: { "tg.is-taux": "numero", "tg.mfp": "mapa", "tg.mfp-minimum": "numero" },
  campos: [
    {
      id: "benefice",
      tipo: "moneda",
      etiqueta: "Bénéfice imposable de l'exercice",
      min: 0,
      porDefecto: 10000000,
      ayuda: "Après réintégrations et déductions fiscales. Mettez 0 en cas de déficit.",
    },
    { id: "ca", tipo: "moneda", etiqueta: "Chiffre d'affaires hors TVA de l'exercice", min: 0, porDefecto: 200000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.benefice < 0) throw new ErrorEntrada("Indiquez 0 en cas de déficit.", "benefice");
    if (entrada.ca < 0) throw new ErrorEntrada("Le chiffre d'affaires ne peut pas être négatif.", "ca");
    // Article 113 : la fraction du bénéfice inférieure à 1 000 F est négligée.
    const base = Math.floor(entrada.benefice / 1000) * 1000;
    const is = redondear(porcentaje(base, v["tg.is-taux"]));
    const mfp = Math.max(redondear(porcentaje(entrada.ca, v["tg.mfp"].taux)), v["tg.mfp-minimum"]);
    const du = Math.max(is, mfp);
    return {
      du,
      is,
      mfp,
      retenu: is >= mfp ? "Impôt sur les sociétés" : "Minimum forfaitaire de perception",
      acompte: Math.floor(du / 4 / 1000) * 1000,
    };
  },
  resultado: [
    { clave: "du", etiqueta: "Impôt dû pour l'exercice", formato: "moneda", destacada: true },
    { clave: "retenu", etiqueta: "Impôt retenu", formato: "texto" },
    { clave: "is", etiqueta: "Impôt sur les sociétés calculé", formato: "moneda" },
    { clave: "mfp", etiqueta: "Minimum forfaitaire de perception", formato: "moneda" },
    { clave: "acompte", etiqueta: "Acompte trimestriel de l'année suivante", formato: "moneda" },
  ],
});
