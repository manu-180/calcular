import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.impot-revenus-fonciers",
  mercado: "bj",
  concepto: "propio",
  slug: "impot-revenus-fonciers",
  estado: "publicado",
  requiere: { "bj.irf-taux": "numero", "bj.irf-redevance-ortb": "numero", "bj.irf-retenue": "mapa" },
  campos: [
    { id: "loyer", tipo: "moneda", etiqueta: "Loyer mensuel brut", min: 0, porDefecto: 150000, ayuda: "Le montant du bail, charges du locataire prises en charge par le propriétaire comprises." },
    { id: "mois", tipo: "entero", etiqueta: "Mois de location dans l'année", min: 1, max: 12, porDefecto: 12 },
    {
      id: "retenue",
      tipo: "opcion",
      etiqueta: "Retenue à la source opérée par le locataire",
      opciones: [
        { valor: "aucune", etiqueta: "Aucune retenue (locataire particulier)" },
        { valor: "general", etiqueta: "Retenue au taux normal" },
        { valor: "bailleur-entreprise", etiqueta: "Retenue au taux réduit (bailleur soumis à l'IBA ou à l'IS)" },
      ],
      porDefecto: "aucune",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.loyer <= 0) throw new ErrorEntrada("Indiquez un loyer supérieur à zéro.", "loyer");
    const brut = redondear(e.loyer * e.mois);
    const impot = redondear(porcentaje(brut, v["bj.irf-taux"]));
    const redevance = v["bj.irf-redevance-ortb"];
    const retenue = e.retenue === "aucune" ? 0 : redondear(porcentaje(brut, v["bj.irf-retenue"][e.retenue]));
    const du = Math.max(0, redondear(impot + redevance - retenue));
    return { du, brut, impot, redevance, retenue, netProprietaire: redondear(brut - impot - redevance) };
  },
  resultado: [
    { clave: "du", etiqueta: "Reste à payer à l'administration", formato: "moneda", destacada: true },
    { clave: "brut", etiqueta: "Loyers bruts de l'année", formato: "moneda" },
    { clave: "impot", etiqueta: "Impôt sur les revenus fonciers", formato: "moneda" },
    { clave: "redevance", etiqueta: "Redevance de radiodiffusion et télévision", formato: "moneda" },
    { clave: "retenue", etiqueta: "Retenues déjà opérées par les locataires", formato: "moneda", ocultarSiCero: true },
    { clave: "netProprietaire", etiqueta: "Loyers après impôt et redevance", formato: "moneda" },
  ],
});
