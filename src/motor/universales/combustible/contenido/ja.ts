import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `片道150マイルを燃費30mpgの車で往復すると、燃料は${formatearNumero(ctx, galones)}ガロン必要です。`,
          `1ガロン${m(precio)}なら${m(galones * precio)}で、2人で分けると1人${m((galones * precio) / 2)}です。`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `片道300kmを100kmあたり8リットル（12.5km/L）の車で往復すると、燃料は${formatearNumero(ctx, litros)}リットル必要です。`,
          `1リットル${m(precio)}なら${m(litros * precio)}で、2人で分けると1人${m((litros * precio) / 2)}です。`,
        ];
      })();
  return {
    h1: "ガソリン代の計算ツール",
    title: tituloQueEntre(`ガソリン代の計算ツール｜${ctx.nombrePais}`, "ガソリン代の計算ツール"),
    description: "走行距離、車の燃費、燃料の価格から、ドライブや旅行にかかるガソリン代と、1人あたりの負担額を計算します。",
    intro: [
      `距離、車の燃費、1${imperial ? "ガロン" : "リットル"}あたりの価格を入れると、必要な燃料の量と費用がわかります。`,
      imperial ? "燃費はマイル／ガロンで入れます。" : "燃費はkm/Lでも、100kmあたりのリットル数でも入れられます。",
    ],
    comoSeCalcula: imperial
      ? ["ガロン数 ＝ 距離 ÷ 燃費（マイル／ガロン）", "費用 ＝ ガロン数 × 1ガロンあたりの価格。往復なら距離は2倍です。"]
      : [
          "100kmあたりのリットル数の場合：リットル数 ＝ 距離 × 燃費 ÷ 100",
          "km/Lの場合：リットル数 ＝ 距離 ÷ 燃費",
          "費用 ＝ リットル数 × 1リットルあたりの価格。往復なら距離は2倍です。",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "km/Lと100kmあたりのリットル数は、どう換算しますか？",
        respuesta: `100を片方の値で割ります。燃費15km/Lの車なら、100kmあたり約${formatearNumero(ctx, 100 / 15, 1)}リットルです。`,
      },
      {
        pregunta: "高速料金も含まれますか？",
        respuesta: "含まれません。計算するのは燃料代だけです。高速料金や駐車場代は別に足してください。",
      },
      {
        pregunta: "街中だと燃費が悪くなるのはなぜですか？",
        respuesta: "発進と停止をくり返すと、一定の速度で走る高速道路よりも多くのエネルギーを使うためです。",
      },
    ],
    glosario: [
      { termino: "燃費", definicion: "一定量の燃料で車がどれだけ走れるかを表す数値です。" },
      { termino: "km/L", definicion: "1リットルで走れるkm数です。数値が大きいほど燃費がよい車です。" },
    ],
  };
};
