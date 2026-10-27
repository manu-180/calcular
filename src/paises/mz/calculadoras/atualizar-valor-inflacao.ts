import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { actualizar, nomeMes } from "../lib/inflacao";
import series from "../series.json";

const INFLACAO = (series.series.find((s) => s.id === "mz.inflacao-mensal")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "mz.atualizar-valor-inflacao",
  mercado: "mz",
  concepto: "inflacion",
  slug: "atualizar-valor-inflacao",
  estado: "publicado",
  requiere: {
    "mz.inflacao-mensal": "serie",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor a actualizar", min: 0, porDefecto: 10000 },
    { id: "desde", tipo: "fecha", etiqueta: "Mês do valor original", min: "2022-03-01", porDefecto: "2024-01-01", ayuda: "O dia não conta, só o mês." },
    { id: "hasta", tipo: "fecha", etiqueta: "Mês para o qual quer actualizar", min: "2022-03-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const a = actualizar(INFLACAO, valores["mz.inflacao-mensal"], entrada.desde, entrada.hasta, { desde: "desde", hasta: "hasta" });
    const atualizado = redondear(entrada.valor * a.fator);
    return {
      atualizado,
      diferenca: redondear(atualizado - entrada.valor),
      acumulada: a.acumulada,
      fator: a.fator,
      meses: a.meses,
      mesInicial: nomeMes(a.mesInicial),
      mesFinal: nomeMes(a.mesFinal),
      observaciones: a.observaciones,
    };
  },
  resultado: [
    { clave: "atualizado", etiqueta: "Valor actualizado", formato: "moneda", destacada: true },
    { clave: "diferenca", etiqueta: "Aumento pela inflação", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Inflação acumulada no período", formato: "porcentaje", decimales: 2 },
    { clave: "fator", etiqueta: "Factor de actualização", formato: "numero", decimales: 4 },
    { clave: "meses", etiqueta: "Meses de inflação somados", formato: "meses" },
    { clave: "mesInicial", etiqueta: "Mês inicial", formato: "texto" },
    { clave: "mesFinal", etiqueta: "Mês final", formato: "texto" },
  ],
});
