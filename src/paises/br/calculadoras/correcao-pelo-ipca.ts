import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nomeMes } from "../lib/datas";
import { limpo } from "../lib/folha";
import { variacaoEntreMeses } from "../lib/indice";
import series from "../series.json";

const IPCA = (series.series.find((s) => s.id === "br.ipca")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "br.correcao-ipca",
  mercado: "br",
  concepto: "inflacion",
  slug: "correcao-pelo-ipca",
  estado: "publicado",
  requiere: {
    "br.ipca": "serie",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor a corrigir", min: 0, porDefecto: 1000 },
    { id: "de", tipo: "fecha", etiqueta: "Mês do valor original", min: "2000-02-01", ayuda: "Vale o IPCA do mês. O dia não importa." },
    { id: "ate", tipo: "fecha", etiqueta: "Mês até o qual corrigir", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const v = variacaoEntreMeses(IPCA, valores["br.ipca"], entrada.de, entrada.ate);
    return {
      corrigido: redondear(entrada.valor * v.fator),
      diferenca: redondear(entrada.valor * v.fator - entrada.valor),
      acumulada: v.acumulada,
      fator: v.fator,
      mensal: v.mensal,
      dozeMeses: v.dozeMeses,
      mesInicial: nomeMes(v.mesInicial),
      indiceInicial: v.indiceInicial,
      mesFinal: nomeMes(v.mesFinal),
      indiceFinal: v.indiceFinal,
      observaciones: v.observaciones,
    };
  },
  resultado: [
    { clave: "corrigido", etiqueta: "Valor corrigido", formato: "moneda", destacada: true },
    { clave: "diferenca", etiqueta: "Aumento pela inflação", formato: "moneda" },
    { clave: "acumulada", etiqueta: "IPCA acumulado no período", formato: "porcentaje", decimales: 2 },
    { clave: "fator", etiqueta: "Fator de correção", formato: "numero", decimales: 6 },
    { clave: "mensal", etiqueta: "IPCA do mês final", formato: "porcentaje", decimales: 2 },
    { clave: "dozeMeses", etiqueta: "IPCA em 12 meses", formato: "porcentaje", decimales: 2 },
    { clave: "mesInicial", etiqueta: "Mês inicial", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "Número-índice do mês anterior ao inicial", formato: "numero", decimales: 2 },
    { clave: "mesFinal", etiqueta: "Mês final", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "Número-índice final", formato: "numero", decimales: 2 },
  ],
});
