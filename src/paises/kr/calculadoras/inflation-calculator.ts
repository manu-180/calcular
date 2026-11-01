import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nombreMes, variacionEntreMeses } from "../lib/indice-precios";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "kr.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "kr.inflation-calculator",
  mercado: "kr",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "kr.cpi": "serie",
  },
  campos: [
    { id: "geumaek", tipo: "moneda", etiqueta: "금액", min: 0, porDefecto: 1000000 },
    { id: "desde", tipo: "fecha", etiqueta: "처음 금액의 달", min: "2000-01-01", porDefecto: "2015-01-01", ayuda: "그달의 소비자물가지수를 써요. 날짜의 일은 상관없어요." },
    { id: "hasta", tipo: "fecha", etiqueta: "바꿀 달", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    const r = variacionEntreMeses(IPC, v["kr.cpi"], e.desde, e.hasta, { desde: "desde", hasta: "hasta" });
    return {
      actualizado: redondear(e.geumaek * r.factor),
      diferencia: redondear(e.geumaek * r.factor - e.geumaek),
      acumulada: r.acumulada,
      interanual: r.interanual,
      mesInicial: nombreMes(r.mesInicial),
      indiceInicial: r.indiceInicial,
      mesFinal: nombreMes(r.mesFinal),
      indiceFinal: r.indiceFinal,
      observaciones: r.observaciones,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "물가를 반영한 금액", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "늘어난 금액", formato: "moneda" },
    { clave: "acumulada", etiqueta: "기간 물가상승률", formato: "porcentaje", decimales: 2 },
    { clave: "interanual", etiqueta: "끝 달의 전년 동월 대비 상승률", formato: "porcentaje", decimales: 1 },
    { clave: "mesInicial", etiqueta: "시작 달", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "시작 달 지수(2020=100)", formato: "numero", decimales: 2 },
    { clave: "mesFinal", etiqueta: "끝 달", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "끝 달 지수(2020=100)", formato: "numero", decimales: 2 },
  ],
});
