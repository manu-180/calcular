import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.droits-de-donation",
  mercado: "mg",
  concepto: "propio",
  slug: "droits-de-donation",
  estado: "publicado",
  requiere: {
    "mg.droit-donation": "numero",
    "mg.droit-donation-ligne-directe": "numero",
  },
  campos: [
    {
      id: "lien",
      tipo: "opcion",
      etiqueta: "Qui reçoit la donation",
      opciones: [
        { valor: "descendant", etiqueta: "Enfant, petit-enfant (ligne directe descendante)" },
        { valor: "autre", etiqueta: "Toute autre personne" },
      ],
      porDefecto: "descendant",
    },
    { id: "valeur", tipo: "moneda", etiqueta: "Valeur des biens donnés à chaque bénéficiaire", min: 0, porDefecto: 50000000 },
    { id: "donataires", tipo: "entero", etiqueta: "Nombre de bénéficiaires", min: 1, max: 50, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.valeur <= 0) throw new ErrorEntrada("Indiquez une valeur supérieure à zéro.", "valeur");
    const parDonataire = e.lien === "descendant" ? v["mg.droit-donation-ligne-directe"] : redondear(porcentaje(e.valeur, v["mg.droit-donation"]));
    return { total: parDonataire * e.donataires, parDonataire };
  },
  resultado: [
    { clave: "total", etiqueta: "Droits de donation", formato: "moneda", destacada: true },
    { clave: "parDonataire", etiqueta: "Par bénéficiaire", formato: "moneda" },
  ],
});
