import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosJa: TextosUi<UiTasaEfectiva> = {
  slug: "apr-to-apy",
  ui: () => ({
    direccion: "わかっている金利",
    nominalAEfectiva: "名目年利（実効年利に換算）",
    efectivaANominal: "実効年利（名目年利に換算）",
    tasa: "年利（%）",
    tasaAyuda: "見積もりや契約書に書かれているとおりに入れてください。",
    capitalizacion: "複利の計算期間",
    capitalizacionAyuda: "利息が元本に組み入れられる頻度です。ローンやクレジットカードは月ごとが一般的です。",
    mensual: "毎月（年12回）",
    trimestral: "四半期ごと（年4回）",
    semestral: "半年ごと（年2回）",
    diaria: "毎日（年365回）",
    efectiva: "実効年利",
    nominal: "名目年利",
    periodica: "1期間あたりの金利",
    errorNegativa: "金利はマイナスにできません。0以上の数を入れてください。",
    observacionDiferencia: (puntos) => `利息にも利息がつくため、実効年利は名目年利より${puntos}ポイント高くなります。`,
  }),
};
