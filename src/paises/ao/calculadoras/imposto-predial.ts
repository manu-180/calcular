import { definirCalculadora, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Quadro do Imposto Predial sobre a detenção: na primeira linha a taxa aplica-se a todo o valor, na
// segunda paga-se um valor fixo e na terceira a taxa aplica-se ao excesso sobre o limite inferior da
// segunda linha (5 milhões), não sobre o valor todo.
function impostoDetencao(tabela: readonly FilaEscala[], valor: number): number {
  const [l1, l2, l3] = tabela;
  if (valor <= (l1.hasta ?? Infinity)) return porcentaje(valor, l1.tasa);
  if (valor <= (l2.hasta ?? Infinity)) return l2.cuotaFija ?? 0;
  return porcentaje(valor - l2.desde, l3.tasa);
}

export default definirCalculadora({
  id: "ao.imposto-predial",
  mercado: "ao",
  concepto: "propio",
  slug: "imposto-predial",
  estado: "publicado",
  requiere: {
    "ao.ip-detencao": "escala",
    "ao.ip-terreno": "numero",
    "ao.ip-adicional-desocupado": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tipo de imóvel",
      opciones: [
        { valor: "urbano", etiqueta: "Prédio urbano (casa, apartamento, loja)" },
        { valor: "terreno", etiqueta: "Terreno para construção" },
      ],
      porDefecto: "urbano",
    },
    { id: "valor", tipo: "moneda", etiqueta: "Valor patrimonial do imóvel", min: 0, porDefecto: 20000000, ayuda: "O valor que consta da matriz predial, fixado pela avaliação." },
    { id: "desocupado", tipo: "si-no", etiqueta: "Está desocupado há mais de um ano (ou o terreno não tem aproveitamento)", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const base = entrada.tipo === "terreno" ? porcentaje(entrada.valor, valores["ao.ip-terreno"]) : impostoDetencao(valores["ao.ip-detencao"], entrada.valor);
    const imposto = redondear(base);
    const agravamento = entrada.desocupado ? redondear(porcentaje(imposto, valores["ao.ip-adicional-desocupado"])) : 0;
    return {
      total: redondear(imposto + agravamento),
      imposto,
      agravamento,
      efectiva: entrada.valor > 0 ? ((imposto + agravamento) / entrada.valor) * 100 : 0,
      observaciones: ["Paga-se uma vez por ano, até ao último dia útil de março do ano seguinte. A pedido, pode ser pago em seis prestações."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Imposto Predial do ano", formato: "moneda", destacada: true },
    { clave: "imposto", etiqueta: "Imposto pela tabela", formato: "moneda" },
    { clave: "agravamento", etiqueta: "Agravamento por desocupação", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "Taxa efectiva sobre o valor", formato: "porcentaje", decimales: 3 },
  ],
});
