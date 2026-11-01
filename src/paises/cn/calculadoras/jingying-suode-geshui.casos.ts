import { definirCasos } from "@/motor/calculo";
import calculadora from "./jingying-suode-geshui";

export default definirCasos(calculadora, [
  {
    nombre: "收入30万元，成本费用20万元",
    origen: { tipo: "recalculado", detalle: "应纳税所得额100000：30000×5%＋60000×10%＋10000×20%＝1500＋6000＋2000＝9500（即100000×20%−10500）。" },
    fecha: "2026-10-29",
    entrada: { shouru: 300000, chengben: 200000, qita: 0 },
    esperado: { suode: 100000, yingna: 9500, tasa: 20, kouchu: 10500, shuihou: 90500 },
  },
  {
    nombre: "应纳税所得额60万元，最高一档",
    origen: { tipo: "recalculado", detalle: "1500＋6000＋42000＋60000＋100000×35%＝144500（即600000×35%−65500）。" },
    fecha: "2026-10-29",
    entrada: { shouru: 1000000, chengben: 400000, qita: 0 },
    esperado: { suode: 600000, yingna: 144500, tasa: 35, kouchu: 65500 },
  },
  {
    nombre: "亏损时不交税",
    origen: { tipo: "recalculado", detalle: "收入100000，成本120000，应纳税所得额为0。" },
    fecha: "2026-10-29",
    entrada: { shouru: 100000, chengben: 120000, qita: 0 },
    esperado: { suode: 0, yingna: 0 },
  },
  {
    nombre: "收入为0",
    origen: { tipo: "recalculado", detalle: "没有收入无法计算。" },
    fecha: "2026-10-29",
    entrada: { shouru: 0, chengben: 0, qita: 0 },
    esperaError: true,
  },
]);
