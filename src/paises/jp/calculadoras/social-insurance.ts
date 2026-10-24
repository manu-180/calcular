import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { shakaiMensual } from "../lib/shakai";

export default definirCalculadora({
  id: "jp.social-insurance",
  mercado: "jp",
  concepto: "aportes-seguridad-social",
  slug: "social-insurance",
  estado: "publicado",
  requiere: {
    "jp.health-insurance-rate": "numero-por-region",
    "jp.long-term-care-rate": "numero",
    "jp.child-support-rate": "numero",
    "jp.pension-insurance-rate": "numero",
    "jp.standard-monthly-remuneration": "escala",
    "jp.pension-remuneration-limits": "mapa",
    "jp.employment-insurance-worker": "mapa",
    "jp.employment-insurance-employer": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "報酬月額（通勤手当などを含む月給）", min: 0, porDefecto: 300000 },
    { id: "region", tipo: "region", etiqueta: "勤務先の都道府県（協会けんぽの支部）", porDefecto: "tokyo" },
    { id: "kaigo", tipo: "si-no", etiqueta: "40歳以上65歳未満です（介護保険料がかかります）", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("報酬月額を入力してください。", "sueldo");
    const tasas = {
      kenpo: porRegion(v["jp.health-insurance-rate"], entrada.region),
      kaigo: v["jp.long-term-care-rate"],
      shien: v["jp.child-support-rate"],
      nenkin: v["jp.pension-insurance-rate"],
      koyo: v["jp.employment-insurance-worker"].general,
    };
    const s = shakaiMensual(entrada.sueldo, v["jp.standard-monthly-remuneration"], v["jp.pension-remuneration-limits"], tasas, entrada.kaigo);
    const koyoEmpresa = (entrada.sueldo * v["jp.employment-insurance-employer"].general) / 100;
    const empresa = s.kenpo + s.kaigo + s.shien + s.nenkin + koyoEmpresa;
    return {
      total: redondear(s.total),
      kenpo: s.kenpo,
      kaigo: s.kaigo,
      shien: s.shien,
      nenkin: s.nenkin,
      koyo: redondear(s.koyo),
      empresa: redondear(empresa),
      anual: redondear(s.total * 12),
      hyojun: s.hyojun,
      hyojunNenkin: s.hyojunNenkin,
      observaciones: ["給与から引くときは1円未満の端数を処理するので、給与明細と1円程度違うことがあります。このツールは端数をそのまま表示しています。"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "本人負担の合計（月額）", formato: "moneda", destacada: true },
    { clave: "kenpo", etiqueta: "健康保険料（本人負担）", formato: "moneda", decimales: 1 },
    { clave: "kaigo", etiqueta: "介護保険料（本人負担）", formato: "moneda", decimales: 1, ocultarSiCero: true },
    { clave: "shien", etiqueta: "子ども・子育て支援金（本人負担）", formato: "moneda", decimales: 1 },
    { clave: "nenkin", etiqueta: "厚生年金保険料（本人負担）", formato: "moneda", decimales: 1 },
    { clave: "koyo", etiqueta: "雇用保険料（本人負担）", formato: "moneda" },
    { clave: "empresa", etiqueta: "会社負担の合計（月額）", formato: "moneda" },
    { clave: "anual", etiqueta: "本人負担の合計（年額、賞与を除く）", formato: "moneda" },
    { clave: "hyojun", etiqueta: "標準報酬月額（健康保険）", formato: "moneda" },
    { clave: "hyojunNenkin", etiqueta: "標準報酬月額（厚生年金）", formato: "moneda" },
  ],
});
