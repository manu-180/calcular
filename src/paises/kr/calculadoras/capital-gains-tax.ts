import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { impuestoBasico, piso, truncar10 } from "../lib/impuestos";

// Las tablas de 장기보유 특별공제 tienen una clave por año entero; pasado el último año queda la tasa máxima.
function tasaPorAnios(mapa: Readonly<Record<string, number>>, anios: number): number {
  const claves = Object.keys(mapa).map(Number).sort((a, b) => a - b);
  if (anios < claves[0]) return 0;
  const clave = Math.min(anios, claves[claves.length - 1]);
  return enMapa(mapa, String(clave));
}

export default definirCalculadora({
  id: "kr.capital-gains-tax",
  mercado: "kr",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    "kr.income-tax-brackets": "escala",
    "kr.local-income-tax-rate": "numero",
    "kr.capital-gains-basic-deduction": "numero",
    "kr.capital-gains-short-rates": "mapa",
    "kr.long-term-holding-general": "mapa",
    "kr.long-term-holding-one-house": "mapa",
    "kr.long-term-residence-one-house": "mapa",
    "kr.luxury-house-threshold": "numero",
  },
  campos: [
    {
      id: "jongnyu",
      tipo: "opcion",
      etiqueta: "파는 자산",
      opciones: [
        { valor: "house", etiqueta: "주택(아파트, 단독주택 등)" },
        { valor: "other", etiqueta: "토지, 주택이 아닌 건물" },
      ],
      porDefecto: "house",
    },
    { id: "yangdo", tipo: "moneda", etiqueta: "양도가액(판 가격)", min: 0, porDefecto: 1500000000 },
    { id: "chwideuk", tipo: "moneda", etiqueta: "취득가액(산 가격)", min: 0, porDefecto: 700000000 },
    { id: "gyeongbi", tipo: "moneda", etiqueta: "필요경비(취득세, 중개보수, 수리비 등)", min: 0, porDefecto: 0 },
    { id: "boyu", tipo: "entero", etiqueta: "보유기간(년, 1년 미만은 버림)", min: 0, max: 60, porDefecto: 10 },
    { id: "geoju", tipo: "entero", etiqueta: "거주기간(년)", min: 0, max: 60, porDefecto: 10, visibleSi: { jongnyu: ["house"] } },
    { id: "ilju", tipo: "si-no", etiqueta: "1세대 1주택 비과세 요건을 갖췄어요", porDefecto: true, visibleSi: { jongnyu: ["house"] }, ayuda: "1세대가 국내에 1주택만 갖고 2년 이상 보유하는 등의 요건이에요." },
  ],
  calcular(e, v) {
    if (e.yangdo <= 0) throw new ErrorEntrada("양도가액을 입력하세요.", "yangdo");
    const casa = e.jongnyu === "house";
    const geoju = casa ? (e.geoju ?? 0) : 0;
    if (geoju > e.boyu) throw new ErrorEntrada("거주기간은 보유기간보다 길 수 없어요.", "geoju");
    const ilju = casa && e.ilju === true;
    const ganancia = Math.max(0, e.yangdo - e.chwideuk - e.gyeongbi);
    const umbral = v["kr.luxury-house-threshold"];
    const observaciones: string[] = [];
    if (ilju && e.yangdo <= umbral) {
      observaciones.push("1세대 1주택이고 양도가액이 기준 이하라서 양도소득세가 없어요.");
      return { total: 0, impuesto: 0, local: 0, ganancia, gravada: 0, deduccionLarga: 0, base: 0, tasaDeduccion: 0, observaciones };
    }
    // 고가주택: solo tributa la parte de la ganancia que corresponde al precio por encima del umbral.
    const proporcion = ilju ? (e.yangdo - umbral) / e.yangdo : 1;
    let tasaDeduccion = 0;
    if (e.boyu >= 3) {
      if (ilju && geoju >= 2) {
        tasaDeduccion = tasaPorAnios(v["kr.long-term-holding-one-house"], e.boyu) + tasaPorAnios(v["kr.long-term-residence-one-house"], geoju);
      } else {
        tasaDeduccion = tasaPorAnios(v["kr.long-term-holding-general"], e.boyu);
      }
    }
    const gravada = piso(ganancia * proporcion);
    const deduccionLarga = piso((ganancia * tasaDeduccion * proporcion) / 100);
    const base = Math.max(0, gravada - deduccionLarga - v["kr.capital-gains-basic-deduction"]);
    const cortas = v["kr.capital-gains-short-rates"];
    const tasaCorta = e.boyu < 1 ? enMapa(cortas, casa ? "housing1" : "other1") : e.boyu < 2 ? enMapa(cortas, casa ? "housing2" : "other2") : 0;
    const basico = impuestoBasico(base, v["kr.income-tax-brackets"]);
    const impuesto = truncar10(Math.max(basico, piso((base * tasaCorta) / 100)));
    const local = truncar10((impuesto * v["kr.local-income-tax-rate"]) / 100);
    if (tasaCorta > 0) observaciones.push("보유기간이 2년 미만이라 단기 양도 세율을 적용했어요.");
    if (ilju) observaciones.push("양도가액 중 기준을 넘는 부분의 비율만큼만 과세했어요.");
    return { total: impuesto + local, impuesto, local, ganancia, gravada, deduccionLarga, base, tasaDeduccion, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "양도소득세와 지방소득세 합계", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "양도소득세", formato: "moneda" },
    { clave: "local", etiqueta: "지방소득세", formato: "moneda" },
    { clave: "ganancia", etiqueta: "양도차익", formato: "moneda" },
    { clave: "gravada", etiqueta: "과세 대상 양도차익", formato: "moneda" },
    { clave: "tasaDeduccion", etiqueta: "장기보유 특별공제율", formato: "porcentaje", decimales: 0 },
    { clave: "deduccionLarga", etiqueta: "장기보유 특별공제액", formato: "moneda" },
    { clave: "base", etiqueta: "과세표준", formato: "moneda" },
  ],
});
