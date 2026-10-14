import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQUIERE_COTISATIONS, salaireMensuel } from "../lib/cotisations";

export default definirCalculadora({
  id: "fr.smic",
  mercado: "fr",
  concepto: "salario-minimo",
  slug: "smic",
  estado: "publicado",
  requiere: {
    ...REQUIERE_COTISATIONS,
    "fr.smic-horaire": "numero",
    "fr.smic-mensuel": "numero",
  },
  campos: [
    { id: "heures", tipo: "numero", etiqueta: "Heures de travail par semaine", min: 1, max: 48, porDefecto: 35 },
    { id: "mois", tipo: "entero", etiqueta: "Nombre de mois", min: 1, max: 12, porDefecto: 12, ayuda: "Pour obtenir le total sur une partie de l'année." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.heures <= 0) throw new ErrorEntrada("Indiquez un nombre d'heures supérieur à zéro.", "heures");
    const horaire = valores["fr.smic-horaire"];
    const heuresMois = (entrada.heures * 52) / 12;
    const brutMensuel = redondear(horaire * heuresMois);
    const d = salaireMensuel(brutMensuel, { cadre: false, alsaceMoselle: false }, valores, redondear);
    return {
      horaire,
      heuresMois: redondear(heuresMois),
      brutMensuel,
      netMensuel: d.net,
      netHoraire: redondear(d.net / heuresMois),
      brutAnnuel: redondear((horaire * entrada.heures * 52 * entrada.mois) / 12),
      netAnnuel: redondear(d.net * entrada.mois),
      observaciones:
        entrada.heures > 35
          ? ["Au-delà de 35 heures, les heures supplémentaires sont majorées. Ce calcul les compte au taux normal du Smic : utilisez le calcul des heures supplémentaires pour la majoration."]
          : [],
    };
  },
  resultado: [
    { clave: "horaire", etiqueta: "Smic horaire brut", formato: "moneda" },
    { clave: "heuresMois", etiqueta: "Heures payées par mois", formato: "horas", decimales: 2 },
    { clave: "brutMensuel", etiqueta: "Smic mensuel brut", formato: "moneda" },
    { clave: "netMensuel", etiqueta: "Smic mensuel net (avant impôt)", formato: "moneda", destacada: true },
    { clave: "netHoraire", etiqueta: "Smic horaire net", formato: "moneda" },
    { clave: "brutAnnuel", etiqueta: "Total brut sur la période", formato: "moneda" },
    { clave: "netAnnuel", etiqueta: "Total net sur la période", formato: "moneda" },
  ],
});
