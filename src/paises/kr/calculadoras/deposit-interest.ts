import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { truncar10 } from "../lib/impuestos";

export default definirCalculadora({
  id: "kr.deposit-interest",
  mercado: "kr",
  concepto: "plazo-fijo",
  slug: "deposit-interest",
  estado: "publicado",
  requiere: {
    "kr.interest-withholding-rate": "numero",
    "kr.local-income-tax-rate": "numero",
  },
  campos: [
    {
      id: "sangpum",
      tipo: "opcion",
      etiqueta: "상품",
      opciones: [
        { valor: "yegeum", etiqueta: "정기예금(한 번에 맡기기)" },
        { valor: "jeokgeum", etiqueta: "정기적금(매달 넣기)" },
      ],
      porDefecto: "yegeum",
    },
    { id: "geumaek", tipo: "moneda", etiqueta: "예치금액 또는 월 납입액", min: 0, porDefecto: 10000000 },
    { id: "iyul", tipo: "porcentaje", etiqueta: "연 이율(세전)", min: 0, max: 30, porDefecto: 3.5 },
    { id: "gigan", tipo: "entero", etiqueta: "기간(개월)", min: 1, max: 120, porDefecto: 12 },
    {
      id: "bangsik",
      tipo: "opcion",
      etiqueta: "이자 계산 방식",
      opciones: [
        { valor: "danri", etiqueta: "단리" },
        { valor: "bokri", etiqueta: "월복리" },
      ],
      porDefecto: "danri",
    },
    {
      id: "gwase",
      tipo: "opcion",
      etiqueta: "과세 방식",
      opciones: [
        { valor: "ilban", etiqueta: "일반과세" },
        { valor: "bigwase", etiqueta: "비과세" },
      ],
      porDefecto: "ilban",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.geumaek <= 0) throw new ErrorEntrada("금액을 입력하세요.", "geumaek");
    const r = e.iyul / 100 / 12;
    const n = e.gigan;
    const mensual = e.sangpum === "jeokgeum";
    let interes: number;
    if (!mensual) {
      interes = e.bangsik === "danri" ? e.geumaek * r * n : e.geumaek * ((1 + r) ** n - 1);
    } else if (e.bangsik === "danri") {
      interes = e.geumaek * r * ((n * (n + 1)) / 2);
    } else {
      interes = 0;
      for (let k = 1; k <= n; k++) interes += e.geumaek * ((1 + r) ** k - 1);
    }
    interes = redondear(interes);
    const principal = mensual ? e.geumaek * n : e.geumaek;
    const impuesto = e.gwase === "ilban" ? truncar10((interes * v["kr.interest-withholding-rate"]) / 100) : 0;
    const local = truncar10((impuesto * v["kr.local-income-tax-rate"]) / 100);
    const neto = interes - impuesto - local;
    return { total: principal + neto, neto, interes, impuesto: impuesto + local, principal };
  },
  resultado: [
    { clave: "total", etiqueta: "세후 만기 수령액", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "세후 이자", formato: "moneda" },
    { clave: "interes", etiqueta: "세전 이자", formato: "moneda" },
    { clave: "impuesto", etiqueta: "이자소득세(지방소득세 포함)", formato: "moneda" },
    { clave: "principal", etiqueta: "원금 합계", formato: "moneda" },
  ],
});
