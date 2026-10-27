import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.impot-sur-les-dividendes",
  mercado: "tg",
  concepto: "propio",
  slug: "impot-sur-les-dividendes",
  estado: "publicado",
  requiere: { "tg.ircm-taux": "mapa" },
  campos: [
    {
      id: "revenu",
      tipo: "opcion-dato",
      etiqueta: "Type de revenu",
      dato: "tg.ircm-taux",
      porDefecto: "distribues",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut perçu", min: 0, porDefecto: 1000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const taux = v["tg.ircm-taux"][entrada.revenu];
    const retenue = redondear(porcentaje(entrada.montant, taux));
    return { retenue, taux, net: redondear(entrada.montant - retenue) };
  },
  resultado: [
    { clave: "retenue", etiqueta: "Retenue à la source", formato: "moneda", destacada: true },
    { clave: "net", etiqueta: "Montant net encaissé", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
  ],
});
