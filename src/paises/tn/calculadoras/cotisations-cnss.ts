import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tn.cotisations-cnss",
  mercado: "tn",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-cnss",
  estado: "publicado",
  requiere: {
    "tn.cnss-salarie": "numero",
    "tn.cnss-employeur": "numero",
    "tn.accidents-travail": "mapa",
  },
  campos: [{ id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 2000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const salarie = redondear(porcentaje(entrada.brut, v["tn.cnss-salarie"]));
    const employeur = redondear(porcentaje(entrada.brut, v["tn.cnss-employeur"]));
    return {
      salarie,
      employeur,
      total: redondear(salarie + employeur),
      trimestre: redondear((salarie + employeur) * 3),
      observaciones: ["Sans la cotisation accidents du travail, à la charge de l'employeur, dont le taux dépend de l'activité."],
    };
  },
  resultado: [
    { clave: "salarie", etiqueta: "Part salariale par mois", formato: "moneda", destacada: true },
    { clave: "employeur", etiqueta: "Part patronale par mois", formato: "moneda" },
    { clave: "total", etiqueta: "Total par mois", formato: "moneda" },
    { clave: "trimestre", etiqueta: "Total à déclarer par trimestre", formato: "moneda" },
  ],
});
