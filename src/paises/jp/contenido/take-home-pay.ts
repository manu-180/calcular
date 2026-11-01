import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.take-home-pay",
  h1: "手取り計算（{{anio}}年版）",
  title: "手取り計算 {{anio}}｜年収から手取りを計算",
  description:
    "年収（額面）から社会保険料、所得税、住民税を引いた手取り額を計算します。協会けんぽの都道府県別料率と{{anio}}年分の税制に対応しています。",
  intro: [
    "年収を入れると、健康保険、厚生年金、雇用保険、所得税、住民税を引いて、実際に受け取る金額を計算します。",
    "健康保険料率は協会けんぽの令和8年度の都道府県別料率、所得税は令和8年分の基礎控除と給与所得控除を使っています。",
  ],
  comoSeCalcula: [
    "年収を12で割った月額から標準報酬月額を決め、健康保険料（東京都は{{jp.health-insurance-rate@tokyo}}）、子ども・子育て支援金（{{jp.child-support-rate}}）、厚生年金保険料（{{jp.pension-insurance-rate}}）を労使折半で計算します。40歳以上65歳未満は介護保険料（{{jp.long-term-care-rate}}）も加わります。",
    "雇用保険料は給与の{{jp.employment-insurance-worker[general]}}です。",
    "所得税は、給与所得控除後の金額から社会保険料と基礎控除（最高{{jp.basic-deduction[0].cuotaFija}}）を引いた課税所得に税率をかけ、{{jp.income-surtax-rate}}の復興特別所得税を加えます。",
    "住民税は、基礎控除{{jp.resident-basic-deduction[0].cuotaFija}}を引いた課税所得の{{jp.resident-tax-rate}}から調整控除を引き、均等割{{jp.resident-tax-per-capita}}と森林環境税{{jp.forest-environment-tax}}を加えます。",
  ],
  ejemplo: [
    "東京都で年収500万円、40歳未満の場合、社会保険料は年723,148円、所得税は91,600円、住民税は243,100円です。手取りは年3,942,152円、月あたり約328,513円です。",
  ],
  faq: [
    {
      pregunta: "給与明細の金額と少し違うのはなぜですか？",
      respuesta:
        "毎月の源泉徴収は月額表で計算され、年末調整で1年分を精算します。賞与の有無、通勤手当、扶養家族や生命保険料などの控除によっても変わります。このツールは賞与なし、扶養なしで、年収を12等分した月給を前提にしています。",
    },
    {
      pregunta: "住民税はいつから引かれますか？",
      respuesta: "住民税は前年1月から12月までの所得にかかり、会社員は6月から翌年5月までの12回に分けて給与から引かれます（特別徴収）。前年に所得がなかった年は、所得割はかかりません。",
    },
    {
      pregunta: "健康保険料は都道府県で違いますか？",
      respuesta:
        "協会けんぽの健康保険料率は支部（都道府県）ごとに決まり、令和8年度は{{jp.health-insurance-rate@niigata}}（新潟県）から{{jp.health-insurance-rate@saga}}（佐賀県）までです。このツールは協会けんぽの料率を使います。健康保険組合に加入している場合は、組合の料率をご確認ください。",
    },
    {
      pregunta: "2026年分の所得税で何が変わりましたか？",
      respuesta:
        "令和8年分から基礎控除と給与所得控除の最低保障額が引き上げられました。合計所得金額が489万円以下なら基礎控除は{{jp.basic-deduction[0].cuotaFija}}、給与所得控除は最低{{jp.employment-income-deduction[0].cuotaFija}}です。改正は令和8年12月1日施行で、年末調整で反映されます。",
    },
  ],
  glosario: [
    { termino: "標準報酬月額", definicion: "社会保険料の計算に使う月給の区分です。実際の月給を等級表に当てはめて決めます。" },
    { termino: "給与所得控除", definicion: "会社員の必要経費にあたる控除で、年収に応じて決まります。" },
    { termino: "課税所得", definicion: "所得から社会保険料や基礎控除などを引いた、税率をかける金額です。" },
  ],
});
