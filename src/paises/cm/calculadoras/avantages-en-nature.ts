import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.avantages-en-nature",
  mercado: "cm",
  concepto: "propio",
  slug: "avantages-en-nature",
  estado: "publicado",
  requiere: { "cm.avantages-nature": "mapa" },
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut taxable mensuel (sans les avantages)",
      min: 0,
      porDefecto: 400000,
    },
    { id: "logement", tipo: "si-no", etiqueta: "Logement fourni", porDefecto: false },
    { id: "electricite", tipo: "si-no", etiqueta: "Électricité payée par l'employeur", porDefecto: false },
    { id: "eau", tipo: "si-no", etiqueta: "Eau payée par l'employeur", porDefecto: false },
    { id: "domestiques", tipo: "entero", etiqueta: "Nombre de domestiques", min: 0, max: 10, porDefecto: 0 },
    { id: "vehicules", tipo: "entero", etiqueta: "Nombre de véhicules", min: 0, max: 10, porDefecto: 0 },
    { id: "nourriture", tipo: "si-no", etiqueta: "Nourriture fournie", porDefecto: false },
    { id: "telephone", tipo: "si-no", etiqueta: "Téléphone fourni", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const t = v["cm.avantages-nature"];
    const taux =
      (entrada.logement ? t.logement : 0) +
      (entrada.electricite ? t.electricite : 0) +
      (entrada.eau ? t.eau : 0) +
      entrada.domestiques * t.domestique +
      entrada.vehicules * t.vehicule +
      (entrada.nourriture ? t.nourriture : 0) +
      (entrada.telephone ? t.telephone : 0);
    const valeur = redondear(porcentaje(entrada.brut, taux));
    return { taux, valeur, brutTaxable: entrada.brut + valeur };
  },
  resultado: [
    { clave: "valeur", etiqueta: "Valeur imposable des avantages par mois", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux cumulé appliqué au salaire", formato: "porcentaje" },
    { clave: "brutTaxable", etiqueta: "Brut taxable avec les avantages", formato: "moneda" },
  ],
});
