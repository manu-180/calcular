import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.redevance-audiovisuelle",
  mercado: "cm",
  concepto: "propio",
  slug: "redevance-audiovisuelle",
  estado: "publicado",
  requiere: { "cm.rav-bareme": "escala" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 250000 },
    {
      id: "exonere",
      tipo: "si-no",
      etiqueta: "Personnel domestique ou ouvrier agricole",
      porDefecto: false,
      ayuda: "Ces salaires, comme les pensions et rentes viagères, ne paient pas la redevance.",
    },
  ],
  calcular(entrada, v) {
    if (entrada.brut < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "brut");
    const mois = entrada.exonere ? 0 : aplicarEscala(v["cm.rav-bareme"], entrada.brut);
    return { mois, annee: mois * 12 };
  },
  resultado: [
    { clave: "mois", etiqueta: "Redevance retenue chaque mois", formato: "moneda", destacada: true },
    { clave: "annee", etiqueta: "Redevance sur 12 mois", formato: "moneda" },
  ],
});
