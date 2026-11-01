import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.sepakanutyan-hark",
  mercado: "am",
  concepto: "propio",
  slug: "sepakanutyan-hark",
  estado: "publicado",
  requiere: { "am.guyq-bnakaran": "escala", "am.guyq-tun": "escala" },
  campos: [
    {
      id: "tesak",
      tipo: "opcion",
      etiqueta: "Գույքի տեսակը",
      opciones: [
        { valor: "bnakaran", etiqueta: "Բնակարան կամ բազմաբնակարան շենքի տարածք" },
        { valor: "tun", etiqueta: "Անհատական բնակելի տուն կամ այգետնակ" },
      ],
      porDefecto: "bnakaran",
    },
    { id: "arzheq", tipo: "moneda", etiqueta: "Հարկման բազան (կադաստրային արժեք)", min: 0, porDefecto: 30000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.arzheq <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ արժեք։", "arzheq");
    const escala = e.tesak === "tun" ? v["am.guyq-tun"] : v["am.guyq-bnakaran"];
    const hark = redondear(aplicarEscala(escala, e.arzheq));
    return { hark, amsakan: redondear(hark / 12), bazhin: (hark / e.arzheq) * 100 };
  },
  resultado: [
    { clave: "hark", etiqueta: "Անշարժ գույքի հարկը տարեկան", formato: "moneda", decimales: 0, destacada: true },
    { clave: "amsakan", etiqueta: "Միջինը ամսական", formato: "moneda", decimales: 0 },
    { clave: "bazhin", etiqueta: "Հարկը արժեքի նկատմամբ", formato: "porcentaje", decimales: 2 },
  ],
});
