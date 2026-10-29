import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.smig",
  mercado: "tg",
  concepto: "salario-minimo",
  slug: "smig",
  estado: "publicado",
  requiere: { "tg.smig": "numero", "tg.duree-legale-travail": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel de base proposé ou reçu",
      min: 0,
      porDefecto: 52500,
      ayuda: "Pour un emploi à temps plein, avant les retenues.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    const smig = v["tg.smig"];
    const ecart = redondear(entrada.salaire - smig);
    return {
      verdict: ecart >= 0 ? "Le salaire atteint au moins le SMIG." : "Le salaire est inférieur au SMIG.",
      smig,
      manque: ecart < 0 ? -ecart : 0,
      horaire: Math.round(((smig * 12) / 52 / v["tg.duree-legale-travail"]) * 100) / 100,
      smigAnnuel: redondear(smig * 12),
      enSmig: Math.round((entrada.salaire / smig) * 100) / 100,
    };
  },
  resultado: [
    { clave: "verdict", etiqueta: "Résultat", formato: "texto", destacada: true },
    { clave: "smig", etiqueta: "SMIG mensuel", formato: "moneda" },
    { clave: "manque", etiqueta: "Montant manquant pour atteindre le SMIG", formato: "moneda", ocultarSiCero: true },
    { clave: "horaire", etiqueta: "SMIG horaire sur la base de la durée légale", formato: "numero", decimales: 2 },
    { clave: "enSmig", etiqueta: "Salaire exprimé en SMIG", formato: "numero", decimales: 2 },
    { clave: "smigAnnuel", etiqueta: "SMIG sur 12 mois", formato: "moneda" },
  ],
});
