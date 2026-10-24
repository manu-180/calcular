import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const imperial = ctx.unidades === "imperial";
    const precio = montoEjemplo(ctx, imperial ? 3.5 : 1.2);
    const cantidad = imperial ? 300 / 30 : (600 * 8) / 100;
    return {
      h1: "油錢計算機",
      title: tituloQueEntre(`油錢計算機｜${ctx.nombrePais}`, "油錢計算機"),
      description: "依行駛距離、車子的油耗和油價，算出一趟路要花多少油錢，以及每個人要分攤多少。",
      intro: [
        `輸入距離、車輛油耗和每${imperial ? "加侖" : "公升"}油價，就能看到需要多少燃料和這趟的花費。`,
        imperial ? "油耗以英里／加侖輸入。" : "油耗可以用每公升公里數（km/L）或每 100 公里耗油公升數輸入。",
      ],
      comoSeCalcula: imperial
        ? ["加侖數 ＝ 距離 ÷ 每加侖英里數。", "費用 ＝ 加侖數 × 每加侖油價。來回的話距離加倍。"]
        : ["用每 100 公里公升數：公升數 ＝ 距離 × 油耗 ÷ 100。", "用每公升公里數：公升數 ＝ 距離 ÷ 油耗。", "費用 ＝ 公升數 × 每公升油價。來回的話距離加倍。"],
      ejemplo: imperial
        ? [
            `單程 150 英里，開油耗 30 mpg 的車來回，需要 ${formatearNumero(ctx, cantidad)} 加侖。`,
            `每加侖 ${m(precio)}，共 ${m(cantidad * precio)}。2 個人分攤，每人 ${m((cantidad * precio) / 2)}。`,
          ]
        : [
            `單程 300 公里，開每 100 公里耗油 8 公升（12.5 km/L）的車來回，需要 ${formatearNumero(ctx, cantidad)} 公升。`,
            `每公升 ${m(precio)}，共 ${m(cantidad * precio)}。2 個人分攤，每人 ${m((cantidad * precio) / 2)}。`,
          ],
      faq: [
        { pregunta: "km/L 和每 100 公里公升數怎麼換算？", respuesta: `用 100 除以其中一個數值。油耗 15 km/L 的車，每 100 公里約耗油 ${formatearNumero(ctx, 100 / 15, 1)} 公升。` },
        { pregunta: "有包含過路費嗎？", respuesta: "沒有，只計算燃料。過路費和停車費請另外加上。" },
        { pregunta: "為什麼在市區比較耗油？", respuesta: "走走停停比在高速公路上等速行駛更耗能，所以市區油耗通常比較差。" },
      ],
      glosario: [
        { termino: "油耗", definicion: "車輛用一定量的燃料能跑多遠。" },
        { termino: "km/L", definicion: "每公升燃料能跑的公里數，數字越大越省油。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const imperial = ctx.unidades === "imperial";
    const precio = montoEjemplo(ctx, imperial ? 3.5 : 1.2);
    const cantidad = imperial ? 300 / 30 : (600 * 8) / 100;
    return {
      h1: "油费计算器",
      title: tituloQueEntre(`油费计算器｜${ctx.nombrePais}`, "油费计算器"),
      description: "根据行驶距离、车辆油耗和油价，算出一趟路要花多少油费，以及每个人要分摊多少。",
      intro: [
        `输入距离、车辆油耗和每${imperial ? "加仑" : "升"}油价，就能看到需要多少燃油和这趟的花费。`,
        imperial ? "油耗以英里／加仑输入。" : "油耗可以用百公里油耗（升）或每升公里数（km/L）输入。",
      ],
      comoSeCalcula: imperial
        ? ["加仑数 ＝ 距离 ÷ 每加仑英里数。", "费用 ＝ 加仑数 × 每加仑油价。往返的话距离加倍。"]
        : ["用百公里油耗：升数 ＝ 距离 × 油耗 ÷ 100。", "用每升公里数：升数 ＝ 距离 ÷ 油耗。", "费用 ＝ 升数 × 每升油价。往返的话距离加倍。"],
      ejemplo: imperial
        ? [
            `单程 150 英里，开油耗 30 mpg 的车往返，需要 ${formatearNumero(ctx, cantidad)} 加仑。`,
            `每加仑 ${m(precio)}，共 ${m(cantidad * precio)}。2 个人分摊，每人 ${m((cantidad * precio) / 2)}。`,
          ]
        : [
            `单程 300 公里，开百公里油耗 8 升（12.5 km/L）的车往返，需要 ${formatearNumero(ctx, cantidad)} 升。`,
            `每升 ${m(precio)}，共 ${m(cantidad * precio)}。2 个人分摊，每人 ${m((cantidad * precio) / 2)}。`,
          ],
      faq: [
        { pregunta: "km/L 和百公里油耗怎么换算？", respuesta: `用 100 除以其中一个数值。油耗 15 km/L 的车，百公里油耗约 ${formatearNumero(ctx, 100 / 15, 1)} 升。` },
        { pregunta: "包括过路费吗？", respuesta: "不包括，只计算燃油。过路费和停车费请另外加上。" },
        { pregunta: "为什么在市区更费油？", respuesta: "走走停停比在高速公路上匀速行驶更耗能，所以市区油耗通常更高。" },
      ],
      glosario: [
        { termino: "油耗", definicion: "车辆用一定量的燃油能跑多远。" },
        { termino: "百公里油耗", definicion: "每行驶 100 公里消耗的燃油升数，数字越小越省油。" },
      ],
    };
  },
);
