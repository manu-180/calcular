import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sn.calcul-trimf",
  mercado: "sn",
  concepto: "propio",
  slug: "calcul-trimf",
  estado: "publicado",
  requiere: { "sn.trimf": "escala" },
  campos: [{ id: "salaire", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 300000, ayuda: "Avec les avantages en argent et en nature." }],
  calcular(e, v, { redondear }) {
    if (e.salaire <= 0) throw new ErrorEntrada("Inscrivez votre salaire brut mensuel.", "salaire");
    const annuel = aplicarEscala(v["sn.trimf"], e.salaire * 12);
    return { annuel, mensuel: redondear(annuel / 12), brut: e.salaire * 12 };
  },
  resultado: [
    { clave: "annuel", etiqueta: "TRIMF de l'année", formato: "moneda", destacada: true },
    { clave: "mensuel", etiqueta: "Retenue par mois", formato: "moneda" },
    { clave: "brut", etiqueta: "Revenu brut annuel", formato: "moneda" },
  ],
});
