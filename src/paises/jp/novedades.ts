import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "jp.basic-deduction-2026",
    fecha: "2026-10-17",
    titulo: "令和8年分から基礎控除と給与所得控除が引き上げられました",
    texto:
      "合計所得金額が489万円以下の人の基礎控除は104万円、給与所得控除の最低保障額は74万円になりました。改正は令和8年12月1日施行で、年末調整で反映されます。手取りと所得税の計算は新しい金額を使っています。",
    vigenteDesde: "2026-12-01",
    calculadoras: ["jp.take-home-pay", "jp.income-tax", "jp.year-end-adjustment", "jp.furusato-nozei"],
    fuente: {
      organismo: "国税庁",
      titulo: "No.1199 基礎控除",
      url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1199.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-17",
    },
  },
  {
    id: "jp.minimum-wage-2026",
    fecha: "2026-10-17",
    titulo: "令和8年度の最低賃金は全国加重平均1,177円",
    texto: "東京都は1,280円、神奈川県は1,279円になります。発効日は都道府県ごとに10月1日から12月2日まで分かれていて、最低賃金の計算は発効日に合わせて切り替わります。",
    vigenteDesde: "2026-10-01",
    calculadoras: ["jp.minimum-wage"],
    fuente: {
      organismo: "厚生労働省",
      titulo: "令和8年度地域別最低賃金全国一覧",
      url: "https://www.mhlw.go.jp/content/11200000/001753404.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-17",
    },
  },
  {
    id: "jp.child-support-levy-2026",
    fecha: "2026-10-17",
    titulo: "子ども・子育て支援金の徴収が始まりました",
    texto: "令和8年4月分（5月納付分）から、健康保険料とあわせて子ども・子育て支援金（0.23％、労使折半）が徴収されています。協会けんぽの健康保険料率も3月分から改定されました。",
    vigenteDesde: "2026-04-01",
    calculadoras: ["jp.take-home-pay", "jp.social-insurance"],
    fuente: {
      organismo: "全国健康保険協会（協会けんぽ）",
      titulo: "令和8年度都道府県単位保険料率",
      url: "https://www.kyoukaikenpo.or.jp/about/business/insurance_rate/rate_prefectures/r08/index.html",
      tipo: "primaria",
      verificadoEl: "2026-10-17",
    },
  },
];
