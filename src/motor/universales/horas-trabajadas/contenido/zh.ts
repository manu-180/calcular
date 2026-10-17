import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

const JORNADA = minutosTrabajados("09:00", "17:30", 30) / 60;
const LARGA = minutosTrabajados("08:00", "18:00", 60) / 60;
const EXTRA = LARGA * 5 - 40;

function ayudas(ctx: ContextoUniversal) {
  return {
    m: (x: number) => formatearMonto(ctx, x),
    n: (x: number, decimales = 0) => formatearNumero(ctx, x, decimales),
    hora: (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v,
    pago: montoEjemplo(ctx, 15),
  };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const { m, n, hora, pago } = ayudas(ctx);
    return {
      h1: "工時計算機",
      title: tituloQueEntre(`工時計算機（含加班費）｜${ctx.nombrePais}`, `工時計算機｜${ctx.nombrePais}`, "工時計算機"),
      description: "依每天的上下班時間和休息時間，加總本週的工作時數與加班時數，並算出含加班費的整週薪資。",
      intro: ["填入每天的上下班時間、無薪休息時間和時薪，就能看到總工時、加班時數和本週薪資。", "可以用來核對薪資單、填工時表，或計算按時收費的工作。"],
      comoSeCalcula: ["每日工時 ＝ 下班 − 上班 − 休息。下班時間比上班早，代表跨到隔天。", "加班時數 ＝ 本週總工時 − 正常工時（總工時超過時）。", "薪資 ＝ 正常工時 × 時薪 ＋ 加班時數 × 時薪 ×（1 ＋ 加給）。"],
      ejemplo: [
        `${hora("09:00")} 到 ${hora("17:30")}、休息 30 分鐘，每天 ${n(JORNADA)} 小時。週一到週五共 ${n(JORNADA * 5)} 小時，時薪 ${m(pago)} 的話是 ${m(JORNADA * 5 * pago)}。`,
        `${hora("08:00")} 到 ${hora("18:00")}、休息 1 小時，一週 ${n(LARGA * 5)} 小時，其中 ${n(EXTRA)} 小時是加班。加給 50% 的話，薪資是 ${m(40 * pago + EXTRA * pago * 1.5)}。`,
      ],
      faq: [
        { pregunta: "工作時數怎麼算？", respuesta: "用下班時間減上班時間，再扣掉休息時間，最後把一週每天加起來。" },
        { pregunta: "分鐘怎麼換成小數的小時？", respuesta: `分鐘除以 60。半小時是 ${n(0.5, 1)}，15 分鐘是 ${n(0.25, 2)}，45 分鐘是 ${n(0.75, 2)}。所以 7 小時 45 分鐘是 ${n(7.75, 2)} 小時。` },
        { pregunta: "可以加班多久？加班費怎麼算？", respuesta: "要看您工作地的法律和勞動契約。這個計算機只用您輸入的加給和正常工時，不套用任何特定規定。" },
      ],
      glosario: [
        { termino: "加班", definicion: "超過正常工時的工作時間，以較高的費率支薪。" },
        { termino: "加給", definicion: "加班每小時在正常時薪之外多給的比例。" },
      ],
    };
  },
  (ctx) => {
    const { m, n, hora, pago } = ayudas(ctx);
    return {
      h1: "工时计算器",
      title: tituloQueEntre(`工时计算器（含加班费）｜${ctx.nombrePais}`, `工时计算器｜${ctx.nombrePais}`, "工时计算器"),
      description: "根据每天的上下班时间和休息时间，汇总本周的工作时长与加班时长，并算出含加班费的整周工资。",
      intro: ["填入每天的上下班时间、无薪休息时间和时薪，就能看到总工时、加班时长和本周工资。", "可以用来核对工资条、填写考勤表，或者计算按小时收费的工作。"],
      comoSeCalcula: ["每日工时 ＝ 下班 − 上班 − 休息。下班时间比上班早，表示跨到了第二天。", "加班时长 ＝ 本周总工时 − 标准工时（总工时超过时）。", "工资 ＝ 标准工时 × 时薪 ＋ 加班时长 × 时薪 ×（1 ＋ 加成）。"],
      ejemplo: [
        `${hora("09:00")} 到 ${hora("17:30")}、休息 30 分钟，每天 ${n(JORNADA)} 小时。周一到周五共 ${n(JORNADA * 5)} 小时，时薪 ${m(pago)} 的话是 ${m(JORNADA * 5 * pago)}。`,
        `${hora("08:00")} 到 ${hora("18:00")}、休息 1 小时，一周 ${n(LARGA * 5)} 小时，其中 ${n(EXTRA)} 小时是加班。加成 50% 的话，工资是 ${m(40 * pago + EXTRA * pago * 1.5)}。`,
      ],
      faq: [
        { pregunta: "工作时长怎么算？", respuesta: "用下班时间减上班时间，再扣掉休息时间，最后把一周每天加起来。" },
        { pregunta: "分钟怎么换成小数的小时？", respuesta: `分钟除以 60。半小时是 ${n(0.5, 1)}，15 分钟是 ${n(0.25, 2)}，45 分钟是 ${n(0.75, 2)}。所以 7 小时 45 分钟是 ${n(7.75, 2)} 小时。` },
        { pregunta: "能加班多久？加班费怎么算？", respuesta: "要看您工作地的法律和劳动合同。这个计算器只用您输入的加成和标准工时，不套用任何特定规定。" },
      ],
      glosario: [
        { termino: "加班", definicion: "超过标准工时的工作时间，按更高的费率计薪。" },
        { termino: "加成", definicion: "加班每小时在标准时薪之外多给的比例。" },
      ],
    };
  },
);
