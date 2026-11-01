import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.impot-revenus-fonciers",
  mercado: "ml",
  concepto: "propio",
  slug: "impot-revenus-fonciers",
  estado: "publicado",
  requiere: { "ml.irf-taux": "mapa" },
  campos: [
    { id: "loyer", tipo: "moneda", etiqueta: "Loyer mensuel", min: 0, porDefecto: 150000 },
    { id: "mois", tipo: "entero", etiqueta: "Mois loués dans l'année", min: 0, max: 12, porDefecto: 12 },
    { id: "type", tipo: "opcion-dato", etiqueta: "Type de construction", dato: "ml.irf-taux", porDefecto: "dur" },
    {
      id: "chargesLocataire",
      tipo: "moneda",
      etiqueta: "Charges du propriétaire payées par le locataire sur l'année",
      min: 0,
      porDefecto: 0,
      ayuda: "Elles s'ajoutent au revenu brut. À l'inverse, les charges du locataire que vous payez s'en déduisent.",
    },
    { id: "chargesProprietaire", tipo: "moneda", etiqueta: "Charges du locataire payées par le propriétaire sur l'année", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.loyer <= 0) throw new ErrorEntrada("Indiquez un loyer supérieur à zéro.", "loyer");
    const brut = Math.max(0, entrada.loyer * entrada.mois + entrada.chargesLocataire - entrada.chargesProprietaire);
    // CGI, article 22 : la base taxable est arrondie aux mille francs inférieurs.
    const base = Math.floor(brut / 1000) * 1000;
    const taux = v["ml.irf-taux"][entrada.type];
    const impot = redondear(porcentaje(base, taux));
    return { impot, brut, base, taux, parMois: entrada.mois > 0 ? redondear(impot / entrada.mois) : 0 };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt sur les revenus fonciers de l'année", formato: "moneda", destacada: true },
    { clave: "brut", etiqueta: "Revenu brut de l'année", formato: "moneda" },
    { clave: "base", etiqueta: "Base taxable arrondie", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 0 },
    { clave: "parMois", etiqueta: "Équivalent par mois loué", formato: "moneda" },
  ],
});
