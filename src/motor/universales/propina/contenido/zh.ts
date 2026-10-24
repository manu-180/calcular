import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const cuenta = montoEjemplo(ctx, 60);
    const propina = cuenta * 0.15;
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "小費計算機",
      title: tituloQueEntre(`小費計算機｜${ctx.nombrePais}`, "小費計算機"),
      description: "算出小費、含小費的總額，以及分帳時每個人要付多少，還可以把每人金額進位成整數。",
      intro: ["輸入帳單金額、小費比例和分攤人數，就能看到小費、總額和每人應付的金額。", "如果想付整數，可以把每人金額無條件進位，多出來的部分算進小費。"],
      comoSeCalcula: ["小費 ＝ 帳單金額 × 小費比例 ÷ 100。", "總額 ＝ 帳單金額 ＋ 小費。", "每人應付 ＝ 總額 ÷ 人數。"],
      ejemplo: [`帳單 ${m(cuenta)}，加 15% 小費是多 ${m(propina)}，總額 ${m(cuenta + propina)}。`, `3 個人分攤，每人付 ${m((cuenta + propina) / 3)}。`],
      faq: [
        { pregunta: "小費應該給多少？", respuesta: `要看當地習慣。請確認${ctx.nombrePais}一般怎麼做，以及帳單是否已經包含服務費。` },
        { pregunta: "小費要用稅前還是稅後金額計算？", respuesta: "大多數人用帳單上顯示的總額來算。如果想用稅前金額，就輸入那個數字。" },
        { pregunta: "15% 的小費怎麼快速心算？", respuesta: "把帳單除以 10 得到 10%，再加上它的一半。40 的話就是 4 加 2，等於 6。" },
      ],
      glosario: [
        { termino: "小費", definicion: "在價格之外，為了服務另外給的金額。" },
        { termino: "服務費", definicion: "店家已經加在帳單上的服務費用。" },
      ],
    };
  },
  (ctx) => {
    const cuenta = montoEjemplo(ctx, 60);
    const propina = cuenta * 0.15;
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "小费计算器",
      title: tituloQueEntre(`小费计算器｜${ctx.nombrePais}`, "小费计算器"),
      description: "算出小费、含小费的总额，以及AA制时每个人要付多少，还可以把每人金额向上取整。",
      intro: ["输入账单金额、小费比例和分摊人数，就能看到小费、总额和每人应付的金额。", "如果想付整数，可以把每人金额向上取整，多出来的部分算进小费。"],
      comoSeCalcula: ["小费 ＝ 账单金额 × 小费比例 ÷ 100。", "总额 ＝ 账单金额 ＋ 小费。", "每人应付 ＝ 总额 ÷ 人数。"],
      ejemplo: [`账单 ${m(cuenta)}，加 15% 小费是多 ${m(propina)}，总额 ${m(cuenta + propina)}。`, `3 个人分摊，每人付 ${m((cuenta + propina) / 3)}。`],
      faq: [
        { pregunta: "小费应该给多少？", respuesta: `要看当地习惯。请确认${ctx.nombrePais}一般怎么做，以及账单是否已经包含服务费。` },
        { pregunta: "小费按税前还是税后金额计算？", respuesta: "大多数人按账单上显示的总额来算。如果想按税前金额，就输入那个数字。" },
        { pregunta: "15% 的小费怎么快速心算？", respuesta: "把账单除以 10 得到 10%，再加上它的一半。40 的话就是 4 加 2，等于 6。" },
      ],
      glosario: [
        { termino: "小费", definicion: "在价格之外，为了服务另外给的金额。" },
        { termino: "服务费", definicion: "商家已经加在账单上的服务费用。" },
      ],
    };
  },
);
