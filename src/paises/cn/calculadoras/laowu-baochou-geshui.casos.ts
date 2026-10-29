import { definirCasos } from "@/motor/calculo";
import calculadora from "./laowu-baochou-geshui";

export default definirCasos(calculadora, [
  {
    nombre: "劳务报酬3000元，不超过4000元减800元",
    origen: { tipo: "recalculado", detalle: "(3000−800)×20%＝440。" },
    fecha: "2026-10-29",
    entrada: { shouru: 3000, leixing: "laowu" },
    esperado: { feiyong: 800, suode: 2200, yukou: 440, shuihou: 2560, tasa: 20 },
  },
  {
    nombre: "劳务报酬30000元，适用30%",
    origen: { tipo: "recalculado", detalle: "30000×(1−20%)＝24000，24000×30%−2000＝5200。" },
    fecha: "2026-10-29",
    entrada: { shouru: 30000, leixing: "laowu" },
    esperado: { feiyong: 6000, suode: 24000, yukou: 5200, tasa: 30, kouchu: 2000 },
  },
  {
    nombre: "劳务报酬10万元，适用40%",
    origen: { tipo: "recalculado", detalle: "100000×80%＝80000，80000×40%−7000＝25000。" },
    fecha: "2026-10-29",
    entrada: { shouru: 100000, leixing: "laowu" },
    esperado: { suode: 80000, yukou: 25000, tasa: 40, kouchu: 7000 },
  },
  {
    nombre: "稿酬10000元",
    origen: { tipo: "recalculado", detalle: "10000×80%×70%＝5600，5600×20%＝1120。" },
    fecha: "2026-10-29",
    entrada: { shouru: 10000, leixing: "gaochou" },
    esperado: { suode: 5600, yukou: 1120, tasa: 20 },
  },
  {
    nombre: "特许权使用费4000元，正好按800元减除",
    origen: { tipo: "recalculado", detalle: "收入不超过4000元减除800元：3200×20%＝640。" },
    fecha: "2026-10-29",
    entrada: { shouru: 4000, leixing: "texu" },
    esperado: { feiyong: 800, suode: 3200, yukou: 640 },
  },
  {
    nombre: "收入为0",
    origen: { tipo: "recalculado", detalle: "没有收入无法计算。" },
    fecha: "2026-10-29",
    entrada: { shouru: 0, leixing: "laowu" },
    esperaError: true,
  },
]);
