import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lu.indemnite-de-depart",
  mercado: "lu",
  concepto: "indemnizacion-despido",
  slug: "indemnite-de-depart",
  estado: "publicado",
  requiere: { "lu.indemnite-depart": "mapa" },
  campos: [
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire brut mensuel moyen des douze derniers mois", min: 0, porDefecto: 4000, ayuda: "Sans heures supplémentaires ni gratifications." },
    { id: "anciennete", tipo: "numero", etiqueta: "Ancienneté à la fin du préavis (années)", min: 0, max: 60, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.anciennete < 0) throw new ErrorEntrada("L'ancienneté ne peut pas être négative.", "anciennete");
    let mois = 0;
    for (const [seuil, m] of Object.entries(valores["lu.indemnite-depart"])) if (entrada.anciennete >= Number(seuil)) mois = Math.max(mois, m);
    return {
      indemnite: redondear(entrada.salaire * mois),
      mois,
      observaciones:
        mois === 0
          ? ["L'indemnité de départ est due à partir de cinq années d'ancienneté."]
          : ["Un employeur de moins de vingt salariés peut opter dans la lettre de licenciement pour un préavis prolongé au lieu de l'indemnité."],
    };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de départ minimale", formato: "moneda", destacada: true },
    { clave: "mois", etiqueta: "Mois de salaire", formato: "meses" },
  ],
});
