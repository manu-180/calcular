import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosJa: TextosUi<UiTarifaFreelance> = {
  slug: "freelance-rate",
  ui: () => ({
    ingreso: "1年で手元に残したい金額",
    ingresoAyuda: "税金と経費を引いたあとの金額で、フリーランスとしての給料にあたります。",
    gastos: "1年の事業経費",
    gastosAyuda: "機材、ソフトウェア、通信費、講座、税理士、保険、老後資金などです。",
    impuestos: "税金と社会保険料の目安（%）",
    impuestosAyuda: "売上から経費を引いた額にかかる税金などの割合です。わからなければ税理士に確認してください。25%が目安です。",
    diasLibres: "1年の休日数",
    diasLibresAyuda: "休暇、祝日、病気で休む日です。誰も払ってくれないので、単価でまかなう必要があります。",
    diasSemana: "週の稼働日数",
    horasSemana: "週の請求できる時間",
    horasSemanaAyuda: "請求できる時間だけです。営業、事務、勉強の時間は含みません。40時間のうち20〜30時間が一般的です。",
    tarifaHora: "時間単価",
    tarifaDia: "日当",
    facturacionMensual: "必要な月の売上",
    facturacionAnual: "必要な年の売上",
    horasAnio: "1年の請求できる時間",
    errorIngreso: "1年で手元に残したい金額を入れてください。",
    errorImpuestos: "税金の割合は100%未満にしてください。",
    errorDias: "その休日数だと、1年の稼働日が残りません。",
    errorHoras: "週に何時間請求できるかを入れてください。",
    observacionFacturables: "これより安く請け負うと、予定より収入が減るか、働く時間が増えます。",
  }),
};
