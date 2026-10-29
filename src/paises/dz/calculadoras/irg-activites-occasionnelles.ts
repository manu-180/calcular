import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.irg-activites-occasionnelles",
  mercado: "dz",
  concepto: "retencion-honorarios",
  slug: "irg-activites-occasionnelles",
  estado: "publicado",
  requiere: { "dz.irg-occasionnelles": "mapa" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Rémunération brute", min: 0, porDefecto: 50000 },
    { id: "activite", tipo: "opcion-dato", dato: "dz.irg-occasionnelles", etiqueta: "Nature de l'activité", porDefecto: "enseignement" },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "montant");
    const taux = v["dz.irg-occasionnelles"][e.activite];
    const retenue = redondear(porcentaje(e.montant, taux));
    return { retenue, taux, net: redondear(e.montant - retenue) };
  },
  resultado: [
    { clave: "retenue", etiqueta: "Retenue à la source (IRG)", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
    { clave: "net", etiqueta: "Montant versé après retenue", formato: "moneda" },
  ],
});
