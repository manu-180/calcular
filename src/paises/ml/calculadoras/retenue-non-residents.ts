import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.retenue-non-residents",
  mercado: "ml",
  concepto: "propio",
  slug: "retenue-non-residents",
  estado: "publicado",
  requiere: { "ml.retenue-non-residents-taux": "numero", "ml.retenue-non-residents-abattement": "mapa" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut payé au prestataire", min: 0, porDefecto: 10000000 },
    { id: "nature", tipo: "opcion-dato", etiqueta: "Nature de l'opération", dato: "ml.retenue-non-residents-abattement", porDefecto: "prestations" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const abattement = v["ml.retenue-non-residents-abattement"][entrada.nature];
    const base = redondear(entrada.montant - porcentaje(entrada.montant, abattement));
    const retenue = redondear(porcentaje(base, v["ml.retenue-non-residents-taux"]));
    return { retenue, base, abattement, tauxEffectif: (retenue / entrada.montant) * 100, net: redondear(entrada.montant - retenue) };
  },
  resultado: [
    { clave: "retenue", etiqueta: "Retenue à la source", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Base après déduction forfaitaire", formato: "moneda" },
    { clave: "abattement", etiqueta: "Déduction forfaitaire pour charges", formato: "porcentaje", decimales: 0 },
    { clave: "tauxEffectif", etiqueta: "Taux effectif sur le montant brut", formato: "porcentaje", decimales: 2 },
    { clave: "net", etiqueta: "Montant versé au prestataire", formato: "moneda" },
  ],
});
