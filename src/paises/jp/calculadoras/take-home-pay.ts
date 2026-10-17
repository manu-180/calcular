import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { juminzei, kyuyoShotoku, montoDeFila, shotokuzei } from "../lib/impuestos";
import { shakaiMensual } from "../lib/shakai";

export default definirCalculadora({
  id: "jp.take-home-pay",
  mercado: "jp",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "jp.health-insurance-rate": "numero-por-region",
    "jp.long-term-care-rate": "numero",
    "jp.child-support-rate": "numero",
    "jp.pension-insurance-rate": "numero",
    "jp.standard-monthly-remuneration": "escala",
    "jp.pension-remuneration-limits": "mapa",
    "jp.employment-insurance-worker": "mapa",
    "jp.employment-income-deduction": "escala",
    "jp.basic-deduction": "escala",
    "jp.income-tax-brackets": "escala",
    "jp.income-surtax-rate": "numero",
    "jp.resident-basic-deduction": "escala",
    "jp.resident-tax-rate": "numero",
    "jp.resident-tax-per-capita": "numero",
    "jp.forest-environment-tax": "numero",
    "jp.resident-adjustment": "mapa",
  },
  campos: [
    { id: "nenshu", tipo: "moneda", etiqueta: "年収（額面）", min: 0, porDefecto: 5000000 },
    { id: "region", tipo: "region", etiqueta: "勤務先の都道府県（協会けんぽの支部）", porDefecto: "tokyo" },
    { id: "kaigo", tipo: "si-no", etiqueta: "40歳以上65歳未満です（介護保険料がかかります）", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.nenshu <= 0) throw new ErrorEntrada("年収を入力してください。", "nenshu");
    const s = shakaiMensual(
      entrada.nenshu / 12,
      v["jp.standard-monthly-remuneration"],
      v["jp.pension-remuneration-limits"],
      {
        kenpo: porRegion(v["jp.health-insurance-rate"], entrada.region),
        kaigo: v["jp.long-term-care-rate"],
        shien: v["jp.child-support-rate"],
        nenkin: v["jp.pension-insurance-rate"],
        koyo: v["jp.employment-insurance-worker"].general,
      },
      entrada.kaigo,
    );
    const kenpo = redondear(s.kenpo * 12);
    const kaigo = redondear(s.kaigo * 12);
    const shien = redondear(s.shien * 12);
    const nenkin = redondear(s.nenkin * 12);
    const koyo = redondear(s.koyo * 12);
    const shakai = kenpo + kaigo + shien + nenkin + koyo;
    const shotoku = kyuyoShotoku(entrada.nenshu, v["jp.employment-income-deduction"]);
    const kiso = montoDeFila(v["jp.basic-deduction"], shotoku);
    const it = shotokuzei(shotoku - shakai - kiso, v["jp.income-tax-brackets"], v["jp.income-surtax-rate"]);
    const jm = juminzei({
      shotoku,
      kojo: shakai,
      kisoEscala: v["jp.resident-basic-deduction"],
      tasa: v["jp.resident-tax-rate"],
      kintowari: v["jp.resident-tax-per-capita"],
      shinrin: v["jp.forest-environment-tax"],
      ajuste: v["jp.resident-adjustment"] as { gap: number; rate: number; threshold: number },
    });
    const anual = entrada.nenshu - shakai - it.total - jm.total;
    const observaciones = ["住民税は前年の所得をもとに、翌年6月から12回に分けて給与から引かれます。ここでは同じ年収が続く場合の1年分を表示しています。"];
    if (s.hyojun >= v["jp.standard-monthly-remuneration"][v["jp.standard-monthly-remuneration"].length - 1].desde) {
      observaciones.push("標準報酬月額が健康保険の最高等級に達しています。");
    }
    return {
      anual,
      mensual: redondear(anual / 12),
      shakai,
      kenpo,
      kaigo,
      shien,
      nenkin,
      koyo,
      shotokuzei: it.total,
      juminzei: jm.total,
      hyojun: s.hyojun,
      kyuyoShotoku: shotoku,
      marginal: it.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "手取り年収", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "手取り月額（12等分）", formato: "moneda" },
    { clave: "shakai", etiqueta: "社会保険料の合計", formato: "moneda" },
    { clave: "kenpo", etiqueta: "健康保険料", formato: "moneda" },
    { clave: "kaigo", etiqueta: "介護保険料", formato: "moneda", ocultarSiCero: true },
    { clave: "shien", etiqueta: "子ども・子育て支援金", formato: "moneda" },
    { clave: "nenkin", etiqueta: "厚生年金保険料", formato: "moneda" },
    { clave: "koyo", etiqueta: "雇用保険料", formato: "moneda" },
    { clave: "shotokuzei", etiqueta: "所得税（復興特別所得税を含む）", formato: "moneda" },
    { clave: "juminzei", etiqueta: "住民税", formato: "moneda" },
    { clave: "hyojun", etiqueta: "標準報酬月額", formato: "moneda" },
    { clave: "kyuyoShotoku", etiqueta: "給与所得（給与所得控除後）", formato: "moneda" },
    { clave: "marginal", etiqueta: "所得税の最高税率", formato: "porcentaje", decimales: 0 },
  ],
});
