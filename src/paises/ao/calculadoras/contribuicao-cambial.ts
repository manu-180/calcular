import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.contribuicao-cambial",
  mercado: "ao",
  concepto: "propio",
  slug: "contribuicao-cambial",
  estado: "publicado",
  requiere: {
    "ao.ceoc": "mapa",
  },
  campos: [
    {
      id: "titular",
      tipo: "opcion",
      etiqueta: "Quem pede a transferência",
      opciones: [
        { valor: "singular", etiqueta: "Pessoa singular" },
        { valor: "colectiva", etiqueta: "Empresa ou outra pessoa colectiva" },
      ],
      porDefecto: "singular",
    },
    { id: "valor", tipo: "moneda", etiqueta: "Valor da transferência em kwanzas", min: 0, porDefecto: 1000000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const taxa = enMapa(valores["ao.ceoc"], entrada.titular);
    const contribuicao = redondear(porcentaje(entrada.valor, taxa));
    return { contribuicao, taxa, total: redondear(entrada.valor + contribuicao) };
  },
  resultado: [
    { clave: "contribuicao", etiqueta: "Contribuição Especial sobre Operações Cambiais", formato: "moneda", destacada: true },
    { clave: "taxa", etiqueta: "Taxa aplicada", formato: "porcentaje", decimales: 1 },
    { clave: "total", etiqueta: "Transferência mais a contribuição", formato: "moneda" },
  ],
});
