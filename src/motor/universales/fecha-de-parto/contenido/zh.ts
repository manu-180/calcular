import { contenidoPorEscritura } from "../../comun/chino";
import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

const FUM = "2026-01-10";
const FPP = aFecha(aDia(FUM) + DURACION);
const FPP32 = aFecha(aDia(FUM) + DURACION + 4);

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const f = (iso: string) => fechaLarga(ctx.locale, iso);
    return {
      h1: "預產期計算機",
      title: tituloQueEntre(`預產期計算機｜${ctx.nombrePais}`, "預產期計算機"),
      description: "用最後一次月經或受孕日推算預產期，並看看今天懷孕幾週又幾天、目前在哪個孕期階段。",
      intro: ["填入最後一次月經的第一天（如果知道，也可以填受孕日），就能看到預產期、懷孕週數和孕期階段。", "這是估計值。產檢和超音波能給出最準確的日期。"],
      comoSeCalcula: [
        "採用內格萊氏法則：預產期是最後一次月經第一天加上 280 天（40 週）。",
        "月經週期比 28 天長或短時，預產期會依差距的天數前後移動。",
        "從受孕日計算時，加上 266 天（38 週）。",
        "懷孕週數是從最後一次月經算起，不是從受孕日算起。",
      ],
      ejemplo: [`最後一次月經在${f(FUM)}、週期 28 天，預產期是${f(FPP)}。`, `如果週期是 32 天，就往後延 4 天，變成${f(FPP32)}。`],
      faq: [
        { pregunta: "預產期怎麼算？", respuesta: "最後一次月經的第一天加上 280 天。有個結果幾乎相同的速算法：月份減 3（或加 9），日期加 7。" },
        { pregunta: "為什麼懷孕週數從最後一次月經算起？", respuesta: "因為幾乎每個人都記得這個日期。所以在懷孕第 2 週時，其實還沒有受孕。" },
        { pregunta: "有多少寶寶在預產期當天出生？", respuesta: "很少。大多數在第 37 到 42 週之間出生，所以預產期是參考，不是確切的日子。" },
      ],
      glosario: [
        { termino: "最後一次月經", definicion: "最後一次月經出血的第一天。" },
        { termino: "內格萊氏法則", definicion: "把最後一次月經第一天加上 280 天來推算預產期的方法。" },
      ],
    };
  },
  (ctx) => {
    const f = (iso: string) => fechaLarga(ctx.locale, iso);
    return {
      h1: "预产期计算器",
      title: tituloQueEntre(`预产期计算器｜${ctx.nombrePais}`, "预产期计算器"),
      description: "用末次月经或受孕日推算预产期，并看看今天怀孕几周零几天、目前处在哪个孕期阶段。",
      intro: ["填入末次月经的第一天（如果知道，也可以填受孕日），就能看到预产期、孕周和孕期阶段。", "这是估计值。产检和 B 超能给出最准确的日期。"],
      comoSeCalcula: [
        "采用内格莱法则：预产期是末次月经第一天加上 280 天（40 周）。",
        "月经周期比 28 天长或短时，预产期会按相差的天数前后移动。",
        "从受孕日计算时，加上 266 天（38 周）。",
        "孕周是从末次月经算起，不是从受孕日算起。",
      ],
      ejemplo: [`末次月经在${f(FUM)}、周期 28 天，预产期是${f(FPP)}。`, `如果周期是 32 天，就往后推 4 天，变成${f(FPP32)}。`],
      faq: [
        { pregunta: "预产期怎么算？", respuesta: "末次月经的第一天加上 280 天。有个结果几乎相同的速算法：月份减 3（或加 9），日期加 7。" },
        { pregunta: "为什么孕周从末次月经算起？", respuesta: "因为几乎每个人都记得这个日期。所以在孕第 2 周时，其实还没有受孕。" },
        { pregunta: "有多少宝宝在预产期当天出生？", respuesta: "很少。大多数在第 37 到 42 周之间出生，所以预产期是参考，不是确切的日子。" },
      ],
      glosario: [
        { termino: "末次月经", definicion: "最后一次月经出血的第一天。" },
        { termino: "内格莱法则", definicion: "把末次月经第一天加上 280 天来推算预产期的方法。" },
      ],
    };
  },
);
