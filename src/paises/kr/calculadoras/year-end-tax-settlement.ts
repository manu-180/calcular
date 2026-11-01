import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { rentaAsalariado, truncar10 } from "../lib/impuestos";
import { REQ_RENTA, REQ_SEGUROS, tasasSeguros, valoresRenta } from "../lib/requisitos";
import { segurosMensuales } from "../lib/seguros";

export default definirCalculadora({
  id: "kr.year-end-tax-settlement",
  mercado: "kr",
  concepto: "propio",
  slug: "year-end-tax-settlement",
  estado: "publicado",
  requiere: { ...REQ_RENTA, ...REQ_SEGUROS },
  campos: [
    { id: "chonggeup", tipo: "moneda", etiqueta: "총급여(1년, 비과세 제외)", min: 0, porDefecto: 50000000 },
    { id: "ginabbu", tipo: "moneda", etiqueta: "1년간 원천징수된 소득세(지방소득세 제외)", min: 0, porDefecto: 2000000, ayuda: "근로소득 원천징수영수증이나 월급명세서의 소득세를 더한 금액이에요." },
    { id: "gajok", tipo: "entero", etiqueta: "기본공제 대상자 수(본인 포함)", min: 1, max: 11, porDefecto: 1 },
    { id: "janyeo", tipo: "entero", etiqueta: "8세 이상 자녀 수", min: 0, max: 10, porDefecto: 0 },
    { id: "boheom", tipo: "moneda", etiqueta: "1년간 낸 국민연금·건강·고용보험료", min: 0, requerido: false, ayuda: "비워 두면 총급여로 추정해요." },
    { id: "chugaGongje", tipo: "moneda", etiqueta: "그 밖의 소득공제(신용카드, 주택자금 등)", min: 0, porDefecto: 0 },
    { id: "chugaSeaek", tipo: "moneda", etiqueta: "특별세액공제 합계(보험료, 의료비, 교육비, 기부금 등)", min: 0, porDefecto: 0, ayuda: "넣은 금액이 표준세액공제보다 적으면 표준세액공제를 써요." },
  ],
  calcular(e, v) {
    if (e.chonggeup <= 0) throw new ErrorEntrada("총급여를 입력하세요.", "chonggeup");
    if (e.janyeo >= e.gajok) throw new ErrorEntrada("자녀 수는 본인을 뺀 기본공제 대상자 수보다 많을 수 없어요.", "janyeo");
    let pension: number;
    let seguros: number;
    if (e.boheom === null) {
      const s = segurosMensuales(e.chonggeup / 12, tasasSeguros(v));
      pension = s.pension * 12;
      seguros = (s.salud + s.cuidado + s.empleo) * 12;
    } else {
      pension = e.boheom;
      seguros = 0;
    }
    const r = rentaAsalariado(
      { total: e.chonggeup, personas: e.gajok, hijos: e.janyeo, pension, seguros, otrasDeducciones: e.chugaGongje, otrosCreditos: e.chugaSeaek },
      valoresRenta(v),
    );
    const diferencia = r.determinado - e.ginabbu;
    const localPagado = truncar10((e.ginabbu * v["kr.local-income-tax-rate"]) / 100);
    const diferenciaLocal = r.local - localPagado;
    const observaciones = [
      diferencia + diferenciaLocal < 0 ? "이미 낸 세금이 더 많아서 차액을 돌려받아요." : "이미 낸 세금보다 결정세액이 많아서 차액을 더 내요.",
      "이미 낸 지방소득세는 원천징수 소득세의 10%로 보고 계산했어요.",
    ];
    return {
      resultado: diferencia + diferenciaLocal,
      diferencia,
      diferenciaLocal,
      determinado: r.determinado,
      local: r.local,
      base: r.base,
      calculado: r.calculado,
      creditoTrabajo: r.creditoTrabajo,
      deduccion: r.deduccion,
      marginal: r.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "추가 납부(+) 또는 환급(−) 예상액", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "소득세 차감징수세액", formato: "moneda" },
    { clave: "diferenciaLocal", etiqueta: "지방소득세 차감징수세액", formato: "moneda" },
    { clave: "determinado", etiqueta: "결정세액(소득세)", formato: "moneda" },
    { clave: "local", etiqueta: "결정세액(지방소득세)", formato: "moneda" },
    { clave: "calculado", etiqueta: "산출세액", formato: "moneda" },
    { clave: "creditoTrabajo", etiqueta: "근로소득세액공제", formato: "moneda" },
    { clave: "base", etiqueta: "과세표준", formato: "moneda" },
    { clave: "deduccion", etiqueta: "근로소득공제", formato: "moneda" },
    { clave: "marginal", etiqueta: "적용 최고 세율", formato: "porcentaje", decimales: 0 },
  ],
});
