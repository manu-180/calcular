import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.impot-sur-les-loyers",
  mercado: "tg",
  concepto: "propio",
  slug: "impot-sur-les-loyers",
  estado: "publicado",
  requiere: { "tg.irpp-bareme": "escala", "tg.foncier-abattement": "numero", "tg.loyers-retenue": "mapa" },
  campos: [
    {
      id: "loyers",
      tipo: "moneda",
      etiqueta: "Loyers bruts encaissés dans l'année",
      min: 0,
      porDefecto: 6000000,
      ayuda: "Pour toutes les propriétés louées, recettes accessoires comprises.",
    },
    {
      id: "taxeFonciere",
      tipo: "moneda",
      etiqueta: "Taxes foncières payées sur ces biens",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.loyers <= 0) throw new ErrorEntrada("Indiquez des loyers supérieurs à zéro.", "loyers");
    // Article 16 du CGI : déduction forfaitaire de 50 % puis des taxes foncières ; le barème de
    // l'article 74 s'applique ensuite (article 77), avec ses arrondis.
    const abattement = redondear(porcentaje(entrada.loyers, v["tg.foncier-abattement"]));
    const revenuNet = Math.floor(Math.max(0, entrada.loyers - abattement - entrada.taxeFonciere) / 1000) * 1000;
    const irpp = Math.floor(aplicarEscalaMarginal(v["tg.irpp-bareme"], revenuNet) / 10) * 10;
    const r = v["tg.loyers-retenue"];
    const retenue = redondear(porcentaje(entrada.loyers, r.total));
    const imputable = redondear(porcentaje(entrada.loyers, r.irpp));
    const solde = Math.max(0, irpp - imputable);
    return {
      irpp,
      abattement,
      revenuNet,
      retenue,
      imputable,
      solde,
      observaciones:
        imputable > irpp ? ["La part de la retenue imputable sur l'IRPP dépasse l'impôt calculé sur ces loyers."] : ([] as string[]),
    };
  },
  resultado: [
    { clave: "irpp", etiqueta: "IRPP sur les revenus fonciers", formato: "moneda", destacada: true },
    { clave: "abattement", etiqueta: "Déduction forfaitaire", formato: "moneda" },
    { clave: "revenuNet", etiqueta: "Revenu foncier net imposable", formato: "moneda" },
    { clave: "retenue", etiqueta: "Retenue ou acomptes sur les loyers", formato: "moneda" },
    { clave: "imputable", etiqueta: "Part de la retenue imputée sur l'IRPP", formato: "moneda" },
    { clave: "solde", etiqueta: "IRPP restant après imputation", formato: "moneda" },
  ],
});
