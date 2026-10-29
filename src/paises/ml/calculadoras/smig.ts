import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.smig",
  mercado: "ml",
  concepto: "salario-minimo",
  slug: "smig",
  estado: "publicado",
  requiere: { "ml.smig": "numero", "ml.smig-horaire": "numero" },
  campos: [
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel proposé ou perçu", min: 0, porDefecto: 40000, ayuda: "Pour un temps plein, primes non comprises." },
    { id: "heures", tipo: "numero", etiqueta: "Heures travaillées dans le mois", min: 0, max: 400, porDefecto: 0, ayuda: "Laissez 0 pour un temps plein. Pour un temps partiel, la comparaison se fait sur le taux horaire." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    const smig = v["ml.smig"];
    const horaire = v["ml.smig-horaire"];
    const partiel = entrada.heures > 0;
    const minimum = partiel ? redondear(horaire * entrada.heures) : smig;
    const ecart = redondear(entrada.salaire - minimum);
    return {
      minimum,
      smig,
      horaire,
      ecart,
      verdict: ecart >= 0 ? "Au moins égal au SMIG" : "Inférieur au SMIG",
      observaciones: partiel ? ["Pour un temps partiel, le minimum est le SMIG horaire multiplié par les heures du mois."] : [],
    };
  },
  resultado: [
    { clave: "verdict", etiqueta: "Comparaison avec le minimum légal", formato: "texto", destacada: true },
    { clave: "minimum", etiqueta: "Minimum légal pour ce temps de travail", formato: "moneda" },
    { clave: "ecart", etiqueta: "Écart avec le minimum", formato: "moneda" },
    { clave: "smig", etiqueta: "SMIG mensuel", formato: "moneda" },
    { clave: "horaire", etiqueta: "SMIG horaire", formato: "moneda", decimales: 2 },
  ],
});
