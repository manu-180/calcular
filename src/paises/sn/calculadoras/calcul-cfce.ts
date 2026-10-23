import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sn.calcul-cfce",
  mercado: "sn",
  concepto: "propio",
  slug: "calcul-cfce",
  estado: "publicado",
  requiere: { "sn.cfce": "numero" },
  campos: [{ id: "masse", tipo: "moneda", etiqueta: "Salaires bruts versés dans le mois", min: 0, porDefecto: 2000000, ayuda: "Avec les congés payés, primes, indemnités et avantages, sans les remboursements de frais ni les prestations familiales." }],
  calcular(e, v, { redondear }) {
    if (e.masse <= 0) throw new ErrorEntrada("Inscrivez la masse salariale du mois.", "masse");
    const cfce = redondear(porcentaje(e.masse, v["sn.cfce"]));
    return { cfce, annuel: cfce * 12, taux: v["sn.cfce"] };
  },
  resultado: [
    { clave: "cfce", etiqueta: "CFCE du mois", formato: "moneda", destacada: true },
    { clave: "annuel", etiqueta: "Sur douze mois au même niveau", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 0 },
  ],
});
