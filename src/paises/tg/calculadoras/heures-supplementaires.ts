import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// En borrador : l'article 180 du Code du travail renvoie les majorations aux conventions
// collectives, dont le texte n'a pas été trouvé sur un site officiel.
export default definirCalculadora({
  id: "tg.heures-supplementaires",
  mercado: "tg",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "borrador",
  requiere: {
    "tg.heures-sup-majorations": "mapa",
    "tg.duree-legale-travail": "numero",
    "tg.heures-sup-max-semaine": "numero",
  },
  campos: [
    { id: "mensuel", tipo: "moneda", etiqueta: "Salaire mensuel de base", min: 0, porDefecto: 200000 },
    { id: "jour", tipo: "numero", etiqueta: "Heures supplémentaires de jour dans la semaine", min: 0, max: 60, porDefecto: 5 },
    { id: "nuit", tipo: "numero", etiqueta: "Heures supplémentaires de nuit dans la semaine", min: 0, max: 60, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensuel <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "mensuel");
    if (entrada.jour + entrada.nuit > v["tg.heures-sup-max-semaine"]) {
      throw new ErrorEntrada(`Le Code du travail limite les heures supplémentaires à ${v["tg.heures-sup-max-semaine"]} par semaine.`, "jour");
    }
    const taux = (entrada.mensuel * 12) / 52 / v["tg.duree-legale-travail"];
    const m = v["tg.heures-sup-majorations"];
    const montantJour = redondear(entrada.jour * taux * (1 + m.jour / 100));
    const montantNuit = redondear(entrada.nuit * taux * (1 + m.nuit / 100));
    return { total: redondear(montantJour + montantNuit), tauxHoraire: redondear(taux), montantJour, montantNuit };
  },
  resultado: [
    { clave: "total", etiqueta: "Paiement des heures supplémentaires de la semaine", formato: "moneda", destacada: true },
    { clave: "tauxHoraire", etiqueta: "Taux horaire de base", formato: "moneda" },
    { clave: "montantJour", etiqueta: "Heures de jour", formato: "moneda", ocultarSiCero: true },
    { clave: "montantNuit", etiqueta: "Heures de nuit", formato: "moneda", ocultarSiCero: true },
  ],
});
