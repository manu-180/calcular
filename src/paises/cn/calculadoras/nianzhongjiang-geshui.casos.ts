import { definirCasos } from "@/motor/calculo";
import calculadora from "./nianzhongjiang-geshui";

const PDF = "https://www.gov.cn/zhengce/zhengceku/202308/P020230828633757032068.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "年终奖36000元，正好在3%档",
    origen: { tipo: "recalculado", detalle: "36000÷12＝3000，不超过3000元，税率3%，速算扣除数0，税额1080。" },
    fecha: "2026-10-29",
    entrada: { jiangjin: 36000, qitaSuode: 0 },
    esperado: { pingjun: 3000, tasa: 3, kouchu: 0, dandu: 1080, shuihou: 34920 },
  },
  {
    nombre: "年终奖36001元，多1元跳到10%档",
    origen: { tipo: "oficial", url: PDF, detalle: "36001÷12＝3000.08，适用10%、速算扣除数210：36001×10%−210＝3390.1。" },
    fecha: "2026-10-29",
    entrada: { jiangjin: 36001, qitaSuode: 0 },
    esperado: { tasa: 10, kouchu: 210, dandu: 3390.1 },
  },
  {
    nombre: "年终奖10万元，其他应纳税所得额5万元",
    origen: {
      tipo: "recalculado",
      detalle: "单独：100000÷12＝8333.33，10%档，100000×10%−210＝9790。并入：150000×20%−16920＝13080，减去50000×10%−2520＝2480，多缴10600。单独计税更省。",
    },
    fecha: "2026-10-29",
    entrada: { jiangjin: 100000, qitaSuode: 50000 },
    esperado: { dandu: 9790, bingru: 10600, jianyi: "单独计税更省" },
  },
  {
    nombre: "年终奖20000元，没有其他应纳税所得额",
    origen: { tipo: "recalculado", detalle: "单独：20000÷12＝1666.67，3%，600。并入：20000×3%＝600。两种方式相同。" },
    fecha: "2026-10-29",
    entrada: { jiangjin: 20000, qitaSuode: 0 },
    esperado: { dandu: 600, bingru: 600, jianyi: "两种方式税额相同" },
  },
  {
    nombre: "年终奖为0",
    origen: { tipo: "recalculado", detalle: "没有奖金无法计算。" },
    fecha: "2026-10-29",
    entrada: { jiangjin: 0, qitaSuode: 0 },
    esperaError: true,
  },
]);
