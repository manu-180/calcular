import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nomeMes, variacaoEntreMeses } from "../lib/indice-precos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "pt.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "pt.atualizar-valor-inflacao",
  mercado: "pt",
  concepto: "inflacion",
  slug: "atualizar-valor-inflacao",
  estado: "publicado",
  requiere: {
    "pt.ipc": "serie",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor a atualizar", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "fecha", etiqueta: "Mês do valor original", min: "2010-01-01", porDefecto: "2020-01-01", ayuda: "Usa-se o IPC desse mês. O dia não conta." },
    { id: "hasta", tipo: "fecha", etiqueta: "Mês para o qual quer atualizar", min: "2010-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = variacaoEntreMeses(IPC, valores["pt.ipc"], entrada.desde, entrada.hasta, { desde: "desde", hasta: "hasta" });
    return {
      atualizado: redondear(entrada.valor * v.fator),
      diferenca: redondear(entrada.valor * v.fator - entrada.valor),
      acumulada: v.acumulada,
      fator: v.fator,
      homologa: v.homologa,
      mesInicial: nomeMes(v.mesInicial),
      indiceInicial: v.indiceInicial,
      mesFinal: nomeMes(v.mesFinal),
      indiceFinal: v.indiceFinal,
      observaciones: v.observaciones,
    };
  },
  resultado: [
    { clave: "atualizado", etiqueta: "Valor atualizado", formato: "moneda", destacada: true },
    { clave: "diferenca", etiqueta: "Aumento pela inflação", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Variação do IPC no período", formato: "porcentaje", decimales: 2 },
    { clave: "fator", etiqueta: "Fator de atualização", formato: "numero", decimales: 4 },
    { clave: "homologa", etiqueta: "Variação homóloga do mês final", formato: "porcentaje", decimales: 1 },
    { clave: "mesInicial", etiqueta: "Mês inicial", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "IPC do mês inicial", formato: "numero", decimales: 1 },
    { clave: "mesFinal", etiqueta: "Mês final", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "IPC do mês final", formato: "numero", decimales: 1 },
  ],
});
