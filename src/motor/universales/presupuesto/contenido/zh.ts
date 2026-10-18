import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const ingreso = montoEjemplo(ctx, 2000);
    return {
      h1: "50/30/20 預算計算機",
      title: tituloQueEntre(`50/30/20 預算計算機｜${ctx.nombrePais}`, "50/30/20 預算計算機"),
      description: "用 50/30/20 法則分配每月實領薪資：多少給必要支出、多少給想要的支出、多少存起來，比例也可以自己調整。",
      intro: ["50/30/20 法則是規劃每月開銷的簡單方法：一半給必需品，30% 給喜歡的事，20% 存起來。", "輸入實領薪資，就能看到每一部分有多少。如果情況不同，例如房租很高，可以調整比例。"],
      comoSeCalcula: ["必要支出 ＝ 收入 × 50%。", "想要的支出 ＝ 收入 × 30%。", "儲蓄 ＝ 收入 × 20%。三個比例加起來必須是 100%。"],
      ejemplo: [`每月 ${m(ingreso)}：必要支出 ${m(ingreso * 0.5)}、想要的支出 ${m(ingreso * 0.3)}、儲蓄 ${m(ingreso * 0.2)}。`, `一年下來，這 20% 累積成 ${m(ingreso * 0.2 * 12)} 的存款。`],
      faq: [
        { pregunta: "哪些算必要支出，哪些算想要的支出？", respuesta: "必要支出是非付不可的帳單：住、基本伙食、水電瓦斯、交通、醫療和債務的最低還款。想要的支出是必要時可以刪減的東西。" },
        { pregunta: "必要支出超過 50% 怎麼辦？", respuesta: "這很常見，特別是房租高的時候。試試 60/20/20 或 70/20/10，盡量不要把儲蓄砍到零。" },
        { pregunta: "還債算儲蓄嗎？", respuesta: "最低還款算必要支出。為了提早還清而多還的部分算儲蓄，因為它和存錢一樣能增加淨資產。" },
      ],
      glosario: [
        { termino: "實領薪資", definicion: "扣除稅金和各項保險費後實際拿到的錢。" },
        { termino: "50/30/20 法則", definicion: "把收入分成必要支出、想要的支出和儲蓄的方法。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const ingreso = montoEjemplo(ctx, 2000);
    return {
      h1: "50/30/20 预算计算器",
      title: tituloQueEntre(`50/30/20 预算计算器｜${ctx.nombrePais}`, "50/30/20 预算计算器"),
      description: "用 50/30/20 法则分配每月到手收入：多少给必要支出、多少给想要的支出、多少存起来，比例也可以自己调整。",
      intro: ["50/30/20 法则是规划每月开销的简单方法：一半给必需品，30% 给喜欢的事，20% 存起来。", "输入到手收入，就能看到每一部分有多少。如果情况不同，比如房租很高，可以调整比例。"],
      comoSeCalcula: ["必要支出 ＝ 收入 × 50%。", "想要的支出 ＝ 收入 × 30%。", "储蓄 ＝ 收入 × 20%。三个比例加起来必须是 100%。"],
      ejemplo: [`每月 ${m(ingreso)}：必要支出 ${m(ingreso * 0.5)}、想要的支出 ${m(ingreso * 0.3)}、储蓄 ${m(ingreso * 0.2)}。`, `一年下来，这 20% 累积成 ${m(ingreso * 0.2 * 12)} 的存款。`],
      faq: [
        { pregunta: "哪些算必要支出，哪些算想要的支出？", respuesta: "必要支出是非付不可的账单：住房、基本伙食、水电燃气、交通、医疗和债务的最低还款。想要的支出是必要时可以削减的东西。" },
        { pregunta: "必要支出超过 50% 怎么办？", respuesta: "这很常见，特别是房租高的时候。试试 60/20/20 或 70/20/10，尽量不要把储蓄砍到零。" },
        { pregunta: "还债算储蓄吗？", respuesta: "最低还款算必要支出。为了提前还清而多还的部分算储蓄，因为它和存钱一样能增加净资产。" },
      ],
      glosario: [
        { termino: "到手收入", definicion: "扣除个税和五险一金后实际拿到的钱。" },
        { termino: "50/30/20 法则", definicion: "把收入分成必要支出、想要的支出和储蓄的方法。" },
      ],
    };
  },
);
