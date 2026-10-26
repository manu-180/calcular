import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nomeMes, variacaoEntreMeses } from "../lib/indice-precos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "ao.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "ao.atualizar-valor-inflacao",
  mercado: "ao",
  concepto: "inflacion",
  slug: "atualizar-valor-inflacao",
  estado: "publicado",
  requiere: {
    "ao.ipc": "serie",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor a actualizar", min: 0, porDefecto: 100000 },
    { id: "desde", tipo: "fecha", etiqueta: "Mês do valor original", min: "2015-01-01", porDefecto: "2021-01-01", ayuda: "Usa-se o índice desse mês. O dia não conta." },
    { id: "hasta", tipo: "fecha", etiqueta: "Mês para o qual quer actualizar", min: "2015-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = variacaoEntreMeses(IPC, valores["ao.ipc"], entrada.desde, entrada.hasta, { desde: "desde", hasta: "hasta" });
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
    { clave: "atualizado", etiqueta: "Valor actualizado", formato: "moneda", destacada: true },
    { clave: "diferenca", etiqueta: "Aumento pela inflação", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Inflação acumulada no período", formato: "porcentaje", decimales: 2 },
    { clave: "fator", etiqueta: "Factor de actualização", formato: "numero", decimales: 4 },
    { clave: "homologa", etiqueta: "Inflação homóloga do mês final", formato: "porcentaje", decimales: 2 },
    { clave: "mesInicial", etiqueta: "Mês inicial", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "IPCN do mês inicial", formato: "numero", decimales: 2 },
    { clave: "mesFinal", etiqueta: "Mês final", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "IPCN do mês final", formato: "numero", decimales: 2 },
  ],
});
