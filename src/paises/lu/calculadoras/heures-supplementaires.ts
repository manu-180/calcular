import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lu.heures-supplementaires",
  mercado: "lu",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "publicado",
  requiere: { "lu.majoration-heures-sup": "numero", "lu.heures-par-mois": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 5190 },
    { id: "heures", tipo: "numero", etiqueta: "Nombre d'heures supplémentaires", min: 0, porDefecto: 10 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.heures < 0) throw new ErrorEntrada("Le nombre d'heures ne peut pas être négatif.", "heures");
    const horaire = redondear(entrada.brut / valores["lu.heures-par-mois"]);
    const majoration = valores["lu.majoration-heures-sup"];
    return {
      paiement: redondear((horaire * entrada.heures * (100 + majoration)) / 100),
      horaire,
      repos: entrada.heures * 1.5,
      observaciones: [
        "En principe, chaque heure supplémentaire est compensée par une heure et demie de repos rémunéré. Le paiement majoré ne s'applique que si la récupération est impossible ou si le salarié quitte l'entreprise avant de récupérer.",
        "Ces 140 % sont exempts d'impôts et de cotisations sociales, sauf les cotisations pour prestations en nature sur l'heure non majorée.",
      ],
    };
  },
  resultado: [
    { clave: "paiement", etiqueta: "Paiement des heures (majoré)", formato: "moneda", destacada: true },
    { clave: "repos", etiqueta: "Ou repos compensatoire rémunéré", formato: "horas", decimales: 1 },
    { clave: "horaire", etiqueta: "Salaire horaire (brut mensuel / 173)", formato: "moneda" },
  ],
});
