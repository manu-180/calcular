import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.heures-supplementaires",
  mercado: "dz",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "publicado",
  requiere: {
    "dz.heures-supplementaires": "mapa",
    "dz.heures-mensuelles": "numero",
    "dz.duree-legale": "numero",
  },
  campos: [
    { id: "mensuel", tipo: "moneda", etiqueta: "Salaire mensuel brut", min: 0, porDefecto: 60000 },
    { id: "heures", tipo: "numero", etiqueta: "Heures supplémentaires effectuées dans le mois", min: 0, porDefecto: 8 },
    {
      id: "majoration",
      tipo: "porcentaje",
      etiqueta: "Majoration appliquée",
      min: 0,
      max: 300,
      requerido: false,
      ayuda: "Laissez vide pour le minimum légal. Votre convention collective peut prévoir davantage.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensuel <= 0) throw new ErrorEntrada("Indiquez un salaire mensuel supérieur à zéro.", "mensuel");
    const hs = v["dz.heures-supplementaires"];
    if (e.majoration !== null && e.majoration < hs.majoration) {
      throw new ErrorEntrada("La majoration ne peut pas être inférieure au minimum légal.", "majoration");
    }
    const taux = e.majoration ?? hs.majoration;
    const horaire = redondear(e.mensuel / v["dz.heures-mensuelles"]);
    const base = redondear(horaire * e.heures);
    const majoration = redondear(porcentaje(base, taux));
    const plafondSemaine = redondear(porcentaje(v["dz.duree-legale"], hs.plafond));
    const observaciones = [
      `La loi limite les heures supplémentaires à ${String(hs.plafond).replace(".", ",")} % de la durée légale, soit ${String(plafondSemaine).replace(".", ",")} heures par semaine.`,
    ];
    return {
      total: redondear(base + majoration),
      horaire,
      base,
      majoration,
      taux,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Montant brut des heures supplémentaires", formato: "moneda", destacada: true },
    { clave: "horaire", etiqueta: "Salaire horaire normal", formato: "moneda" },
    { clave: "base", etiqueta: "Paiement des heures au taux normal", formato: "moneda" },
    { clave: "majoration", etiqueta: "Majoration", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux de majoration", formato: "porcentaje" },
  ],
});
