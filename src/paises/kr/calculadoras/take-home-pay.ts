import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { rentaAsalariado } from "../lib/impuestos";
import { REQ_RENTA, REQ_SEGUROS, tasasSeguros, valoresRenta } from "../lib/requisitos";
import { segurosMensuales } from "../lib/seguros";

export default definirCalculadora({
  id: "kr.take-home-pay",
  mercado: "kr",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: { ...REQ_RENTA, ...REQ_SEGUROS, "kr.meal-allowance-exempt": "numero" },
  campos: [
    { id: "yeonbong", tipo: "moneda", etiqueta: "연봉(세전, 비과세 포함)", min: 0, porDefecto: 40000000 },
    { id: "bigwase", tipo: "moneda", etiqueta: "월 비과세액(식대 등)", min: 0, porDefecto: 200000, ayuda: "식대는 월 20만원까지 비과세예요. 없으면 0을 넣으세요." },
    { id: "gajok", tipo: "entero", etiqueta: "부양가족 수(본인 포함)", min: 1, max: 11, porDefecto: 1 },
    { id: "janyeo", tipo: "entero", etiqueta: "8세 이상 20세 이하 자녀 수", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.yeonbong <= 0) throw new ErrorEntrada("연봉을 입력하세요.", "yeonbong");
    if (e.janyeo >= e.gajok) throw new ErrorEntrada("자녀 수는 본인을 뺀 부양가족 수보다 많을 수 없어요.", "janyeo");
    const mensual = e.yeonbong / 12;
    const exento = Math.min(e.bigwase, mensual);
    const bosu = mensual - exento;
    const s = segurosMensuales(bosu, tasasSeguros(v));
    const r = rentaAsalariado(
      { total: bosu * 12, personas: e.gajok, hijos: e.janyeo, pension: s.pension * 12, seguros: (s.salud + s.cuidado + s.empleo) * 12 },
      valoresRenta(v),
    );
    const impuestoMes = redondear((r.determinado + r.local) / 12);
    const neto = redondear(mensual - s.total - impuestoMes);
    const observaciones = [
      "소득세는 연말정산을 기준으로 1년 치를 계산해 12로 나눴어요. 매달 원천징수는 간이세액표로 하기 때문에 월별 금액은 조금 다를 수 있어요.",
    ];
    if (exento < e.bigwase) observaciones.push("비과세액이 월급보다 커서 월급만큼만 반영했어요.");
    if (exento > v["kr.meal-allowance-exempt"]) observaciones.push("식대 비과세는 월 20만원까지예요. 다른 비과세 항목이 아니라면 비과세액을 줄여 주세요.");
    if (s.basePension >= v["kr.pension-income-limits"].max) observaciones.push("월 보수가 국민연금 기준소득월액 상한을 넘어서 상한액 기준으로 계산했어요.");
    return {
      neto,
      netoAnual: neto * 12,
      seguros: s.total,
      pension: s.pension,
      salud: s.salud,
      cuidado: s.cuidado,
      empleo: s.empleo,
      renta: redondear(r.determinado / 12),
      local: redondear(r.local / 12),
      rentaAnual: r.determinado,
      base: r.base,
      marginal: r.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "월 실수령액", formato: "moneda", destacada: true },
    { clave: "netoAnual", etiqueta: "연간 실수령액", formato: "moneda" },
    { clave: "seguros", etiqueta: "4대보험 합계(월)", formato: "moneda" },
    { clave: "pension", etiqueta: "국민연금", formato: "moneda" },
    { clave: "salud", etiqueta: "건강보험", formato: "moneda" },
    { clave: "cuidado", etiqueta: "장기요양보험", formato: "moneda" },
    { clave: "empleo", etiqueta: "고용보험", formato: "moneda" },
    { clave: "renta", etiqueta: "근로소득세(월 평균)", formato: "moneda" },
    { clave: "local", etiqueta: "지방소득세(월 평균)", formato: "moneda" },
    { clave: "rentaAnual", etiqueta: "연간 결정세액(소득세)", formato: "moneda" },
    { clave: "base", etiqueta: "과세표준", formato: "moneda" },
    { clave: "marginal", etiqueta: "적용 최고 세율", formato: "porcentaje", decimales: 0 },
  ],
  mundo: { bruto: "yeonbong", periodoBruto: "anio", neto: "netoAnual", periodoNeto: "anio" },
});
