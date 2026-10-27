import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.calcul-irvm",
  mercado: "ml",
  concepto: "propio",
  slug: "calcul-irvm",
  estado: "publicado",
  requiere: { "ml.irvm-taux": "mapa" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut des revenus", min: 0, porDefecto: 1000000 },
    { id: "nature", tipo: "opcion-dato", etiqueta: "Nature des revenus", dato: "ml.irvm-taux", porDefecto: "dividendes" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const taux = v["ml.irvm-taux"][entrada.nature];
    const impot = redondear(porcentaje(entrada.montant, taux));
    return { net: redondear(entrada.montant - impot), impot, taux };
  },
  resultado: [
    { clave: "net", etiqueta: "Montant net après IRVM", formato: "moneda", destacada: true },
    { clave: "impot", etiqueta: "IRVM retenu", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 0 },
  ],
});
