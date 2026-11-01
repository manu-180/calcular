import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.assurance-volontaire-cnss",
  mercado: "bf",
  concepto: "propio",
  slug: "assurance-volontaire-cnss",
  estado: "publicado",
  requiere: { "bf.cnss-assurance-volontaire": "numero" },
  campos: [
    {
      id: "revenu",
      tipo: "moneda",
      etiqueta: "Revenu mensuel sur lequel vous cotisez",
      min: 0,
      porDefecto: 100000,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.revenu <= 0) throw new ErrorEntrada("Indiquez un revenu supérieur à zéro.", "revenu");
    const taux = v["bf.cnss-assurance-volontaire"];
    const mensuelle = redondear(porcentaje(entrada.revenu, taux));
    return { mensuelle, taux, trimestrielle: redondear(mensuelle * 3), annuelle: redondear(mensuelle * 12) };
  },
  resultado: [
    { clave: "mensuelle", etiqueta: "Cotisation mensuelle", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux de cotisation", formato: "porcentaje" },
    { clave: "trimestrielle", etiqueta: "Cotisation par trimestre", formato: "moneda" },
    { clave: "annuelle", etiqueta: "Cotisation sur 12 mois", formato: "moneda" },
  ],
});
