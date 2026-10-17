import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosJa: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-even",
  ui: () => ({
    fijos: "毎月の固定費",
    fijosAyuda: "まったく売れなくてもかかる費用です。家賃、固定給、光熱費、ソフトウェアなど。",
    precio: "1個あたりの売価",
    variable: "1個あたりの変動費",
    variableAyuda: "1個売るごとにかかる費用です。材料、仕入れ、手数料、送料など。",
    objetivo: "毎月の目標利益（任意）",
    objetivoAyuda: "費用をまかなったうえで、どれだけ売ればいいかを見るために使います。",
    unidades: "損益分岐点の販売数",
    facturacion: "損益分岐点の売上高",
    contribucion: "1個あたりの限界利益",
    contribucionAyuda: "1個売るごとに固定費の支払いに回せる金額です（売価 − 変動費）。",
    contribucionPct: "限界利益率（%）",
    unidadesObjetivo: "目標利益に必要な販売数",
    facturacionObjetivo: "目標利益に必要な売上高",
    errorPrecio: "1個あたりの売価を入れてください。",
    errorMargen: "変動費が売価と同じか上回っています。売るたびに損をするので、損益分岐点に届きません。売価か費用を見直してください。",
    observacionRedondeo: "1個未満は売れないので、販売数は切り上げています。",
  }),
};
