import { definirCalculadora } from "@/motor/calculo";
import { irtGrupoA, linhaIrt } from "../lib/irt";

export default definirCalculadora({
  id: "ao.calcular-irt",
  mercado: "ao",
  concepto: "impuesto-renta",
  slug: "calcular-irt",
  estado: "publicado",
  requiere: { "ao.irt-grupo-a": "escala" },
  campos: [
    { id: "materia", tipo: "moneda", etiqueta: "Rendimento colectável mensal (salário já sem o INSS)", min: 0, porDefecto: 350000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tabela = valores["ao.irt-grupo-a"];
    const irt = redondear(irtGrupoA(tabela, entrada.materia));
    const { indice, fila } = linhaIrt(tabela, entrada.materia);
    const observaciones: string[] = [];
    if (indice === 1) {
      observaciones.push("Logo acima de 150 000 Kz a tabela aplica uma parcela fixa de 12 500 Kz. Por isso o imposto salta de zero para mais de 12 500 Kz com um kwanza a mais.");
    }
    return {
      irt,
      escalao: indice + 1,
      taxa: fila.tasa,
      parcela: fila.cuotaFija ?? 0,
      excesso: indice === 0 ? 0 : redondear(entrada.materia - fila.desde),
      efectiva: entrada.materia > 0 ? (irt / entrada.materia) * 100 : 0,
      depois: redondear(entrada.materia - irt),
      observaciones,
    };
  },
  resultado: [
    { clave: "irt", etiqueta: "IRT a reter por mês", formato: "moneda", destacada: true },
    { clave: "escalao", etiqueta: "Escalão da tabela", formato: "numero" },
    { clave: "parcela", etiqueta: "Parcela fixa do escalão", formato: "moneda" },
    { clave: "taxa", etiqueta: "Taxa sobre o excesso", formato: "porcentaje" },
    { clave: "excesso", etiqueta: "Excesso sobre o limite do escalão", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Taxa efectiva", formato: "porcentaje", decimales: 2 },
    { clave: "depois", etiqueta: "Rendimento depois do IRT", formato: "moneda" },
  ],
});
