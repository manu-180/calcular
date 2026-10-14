import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.conges-payes",
  mercado: "fr",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: {
    "fr.cp-jours-par-mois": "numero",
    "fr.cp-jours-max": "numero",
    "fr.cp-dixieme": "numero",
  },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de travail effectif sur la période de référence", min: 0, max: 12, porDefecto: 12, ayuda: "La période va en général du 1er juin au 31 mai." },
    { id: "brutPeriode", tipo: "moneda", etiqueta: "Rémunération brute totale sur la période de référence", min: 0, porDefecto: 24000 },
    { id: "salaireMensuel", tipo: "moneda", etiqueta: "Salaire mensuel brut actuel", min: 0, porDefecto: 2000 },
    { id: "joursPris", tipo: "entero", etiqueta: "Jours de congé pris (jours ouvrés)", min: 1, max: 25, porDefecto: 10, ayuda: "Du lundi au vendredi : une semaine compte 5 jours ouvrés." },
    { id: "joursMois", tipo: "entero", etiqueta: "Jours ouvrés du mois des congés", min: 18, max: 23, porDefecto: 21 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.joursPris <= 0) throw new ErrorEntrada("Indiquez au moins un jour de congé.", "joursPris");
    const joursOuvrablesAn = valores["fr.cp-jours-max"];
    const joursOuvresAn = (joursOuvrablesAn * 5) / 6;
    const acquis = Math.min(joursOuvrablesAn, Math.ceil(valores["fr.cp-jours-par-mois"] * entrada.mois));
    const dixieme = redondear((porcentaje(entrada.brutPeriode, valores["fr.cp-dixieme"]) * entrada.joursPris) / joursOuvresAn);
    const maintien = redondear((entrada.salaireMensuel * entrada.joursPris) / entrada.joursMois);
    const indemnite = Math.max(dixieme, maintien);
    return {
      acquisOuvrables: acquis,
      acquisSemaines: redondear(acquis / 6),
      dixieme,
      maintien,
      indemnite,
      methode: dixieme >= maintien ? "Règle du dixième" : "Maintien de salaire",
    };
  },
  resultado: [
    { clave: "acquisOuvrables", etiqueta: "Congés acquis (jours ouvrables)", formato: "dias" },
    { clave: "acquisSemaines", etiqueta: "Soit en semaines", formato: "numero", decimales: 2 },
    { clave: "dixieme", etiqueta: "Indemnité selon la règle du dixième", formato: "moneda" },
    { clave: "maintien", etiqueta: "Indemnité selon le maintien de salaire", formato: "moneda" },
    { clave: "indemnite", etiqueta: "Indemnité de congés payés due", formato: "moneda", destacada: true },
    { clave: "methode", etiqueta: "Méthode la plus favorable", formato: "texto" },
  ],
});
