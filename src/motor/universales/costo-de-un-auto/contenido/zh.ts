import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

function ejemplo(ctx: ContextoUniversal) {
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  return { imperial, g, mensual: costoMensual(g, imperial) };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { imperial, g, mensual } = ejemplo(ctx);
    const u = imperial ? "英里" : "公里";
    return {
      h1: "養車成本計算機",
      title: tituloQueEntre(`養車成本計算機｜${ctx.nombrePais}`, "養車成本計算機"),
      description: `把油錢、保險、保養、停車費和折舊都算進去，看看您的車每月、每年和每${u}實際花多少。`,
      intro: ["大多數人知道油錢花多少，但很少人把保險、保養、停車費，尤其是車子每年貶值的部分加起來。", "填入各項費用，就能看到車子實際花了您多少錢，幫助您決定要買車、換車，還是改用其他交通方式。"],
      comoSeCalcula: [
        imperial ? "每月油錢 ＝ 每月英里數 ÷ 每加侖英里數 × 每加侖油價。" : "每月油錢 ＝ 每月公里數 × 每 100 公里公升數 ÷ 100 × 每公升油價。",
        "每月折舊 ＝ 車輛價值 × 每年折舊率 ÷ 12。",
        "實際成本 ＝ 油錢 ＋ 保險 ＋ 保養 ＋ 停車 ＋ 其他費用 ＋ 折舊。",
        `每${u}成本 ＝ 每月實際成本 ÷ 當月行駛距離。`,
      ],
      ejemplo: [
        `價值 ${m(g.precio)} 的車，每月開 ${formatearNumero(ctx, g.distancia)} ${u}，連同折舊每月要花 ${m(mensual)}。`,
        `一年是 ${m(mensual * 12)}，每${u} ${formatearMonto(ctx, mensual / g.distancia)}。`,
      ],
      faq: [
        { pregunta: "什麼是車輛折舊？", respuesta: "車子隨時間失去的價值。它不是每月要付的錢，但賣車時就會感受到。新車的最大成本往往就是折舊。" },
        { pregunta: "為什麼車貸不算進去？", respuesta: "車貸有一部分是車子本身的錢，已經算在折舊裡。兩個都加會把車子算兩次。車貸利息則是另外的成本。" },
        { pregunta: "怎麼降低養車成本？", respuesta: "每年比較保險方案、注意胎壓和定期保養，也不要太常換車：車子在最初幾年貶值最多。" },
      ],
      glosario: [
        { termino: "折舊", definicion: "車子因時間和使用而失去的價值。" },
        { termino: `每${u}成本`, definicion: `把所有費用算進去後，每開一${u}的平均成本。` },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { imperial, g, mensual } = ejemplo(ctx);
    const u = imperial ? "英里" : "公里";
    return {
      h1: "养车成本计算器",
      title: tituloQueEntre(`养车成本计算器｜${ctx.nombrePais}`, "养车成本计算器"),
      description: `把油费、保险、保养、停车费和折旧都算进去，看看您的车每月、每年和每${u}实际花多少。`,
      intro: ["大多数人知道油费花多少，但很少有人把保险、保养、停车费，尤其是车每年贬值的部分加起来。", "填入各项费用，就能看到车实际花了您多少钱，帮助您决定要买车、换车，还是改用其他出行方式。"],
      comoSeCalcula: [
        imperial ? "每月油费 ＝ 每月英里数 ÷ 每加仑英里数 × 每加仑油价。" : "每月油费 ＝ 每月公里数 × 百公里油耗 ÷ 100 × 每升油价。",
        "每月折旧 ＝ 车辆价值 × 每年折旧率 ÷ 12。",
        "实际成本 ＝ 油费 ＋ 保险 ＋ 保养 ＋ 停车 ＋ 其他费用 ＋ 折旧。",
        `每${u}成本 ＝ 每月实际成本 ÷ 当月行驶距离。`,
      ],
      ejemplo: [
        `价值 ${m(g.precio)} 的车，每月开 ${formatearNumero(ctx, g.distancia)} ${u}，连同折旧每月要花 ${m(mensual)}。`,
        `一年是 ${m(mensual * 12)}，每${u} ${formatearMonto(ctx, mensual / g.distancia)}。`,
      ],
      faq: [
        { pregunta: "什么是车辆折旧？", respuesta: "车随时间失去的价值。它不是每月要付的钱，但卖车时就会感受到。新车的最大成本往往就是折旧。" },
        { pregunta: "为什么车贷不算进去？", respuesta: "车贷有一部分是车本身的钱，已经算在折旧里。两个都加会把车算两次。车贷利息则是另外的成本。" },
        { pregunta: "怎么降低养车成本？", respuesta: "每年比较保险方案、注意胎压和定期保养，也不要太频繁地换车：车在最初几年贬值最多。" },
      ],
      glosario: [
        { termino: "折旧", definicion: "车因时间和使用而失去的价值。" },
        { termino: `每${u}成本`, definicion: `把所有费用算进去后，每开一${u}的平均成本。` },
      ],
    };
  },
);
