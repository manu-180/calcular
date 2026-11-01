import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.impot-sur-dividendes",
  mercado: "dz",
  concepto: "propio",
  slug: "impot-sur-dividendes",
  estado: "publicado",
  requiere: { "dz.irg-dividendes": "numero" },
  campos: [{ id: "dividendes", tipo: "moneda", etiqueta: "Dividendes bruts distribués", min: 0, porDefecto: 500000 }],
  calcular(e, v, { redondear }) {
    if (e.dividendes <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "dividendes");
    const retenue = redondear(porcentaje(e.dividendes, v["dz.irg-dividendes"]));
    return { retenue, net: redondear(e.dividendes - retenue), taux: v["dz.irg-dividendes"] };
  },
  resultado: [
    { clave: "retenue", etiqueta: "Retenue à la source (IRG)", formato: "moneda", destacada: true },
    { clave: "net", etiqueta: "Dividendes nets perçus", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux de la retenue", formato: "porcentaje" },
  ],
});
