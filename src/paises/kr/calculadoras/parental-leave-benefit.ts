import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kr.parental-leave-benefit",
  mercado: "kr",
  concepto: "propio",
  slug: "parental-leave-benefit",
  estado: "publicado",
  requiere: {
    "kr.parental-leave-caps": "mapa",
    "kr.parental-leave-late-rate": "numero",
  },
  campos: [
    { id: "tongsang", tipo: "moneda", etiqueta: "월 통상임금", min: 0, porDefecto: 3000000, ayuda: "육아휴직을 시작하는 날을 기준으로 한 월 통상임금이에요." },
    { id: "meses", tipo: "entero", etiqueta: "육아휴직 개월 수", min: 1, max: 18, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tongsang <= 0) throw new ErrorEntrada("월 통상임금을 입력하세요.", "tongsang");
    const m = v["kr.parental-leave-caps"];
    const piso = enMapa(m, "piso");
    const limitar = (monto: number, tope: number) => Math.min(Math.max(monto, piso), tope);
    const tramo1 = limitar(e.tongsang, enMapa(m, "m1"));
    const tramo2 = limitar(e.tongsang, enMapa(m, "m4"));
    const tramo3 = limitar(redondear((e.tongsang * v["kr.parental-leave-late-rate"]) / 100), enMapa(m, "m7"));
    const n1 = Math.min(3, e.meses);
    const n2 = Math.min(3, Math.max(0, e.meses - 3));
    const n3 = Math.max(0, e.meses - 6);
    return {
      total: tramo1 * n1 + tramo2 * n2 + tramo3 * n3,
      tramo1,
      tramo2: n2 > 0 ? tramo2 : null,
      tramo3: n3 > 0 ? tramo3 : null,
      promedio: redondear((tramo1 * n1 + tramo2 * n2 + tramo3 * n3) / e.meses),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "육아휴직 급여 총액", formato: "moneda", destacada: true },
    { clave: "tramo1", etiqueta: "1~3개월 월 지급액", formato: "moneda" },
    { clave: "tramo2", etiqueta: "4~6개월 월 지급액", formato: "moneda" },
    { clave: "tramo3", etiqueta: "7개월째부터 월 지급액", formato: "moneda" },
    { clave: "promedio", etiqueta: "월 평균", formato: "moneda" },
  ],
});
