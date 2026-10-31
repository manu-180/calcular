import { definirCasos } from "@/motor/calculo";
import calculadora from "./zhuanxiang-fujia-kouchu";

export default definirCasos(calculadora, [
  {
    nombre: "两个孩子上学、北京租房、独生子女赡养老人",
    origen: {
      tipo: "recalculado",
      detalle: "子女教育2×2000＝4000，住房租金1500，赡养老人3000，每月8500，全年102000。",
    },
    fecha: "2026-10-29",
    entrada: { zinv: 2, yingyouer: 0, fumuBili: "100", zhufang: "zujin-yi", shanyang: "dusheng", fenshanE: null, jixuXueli: false, jixuZhengshu: false, dabing: 0 },
    esperado: { zinv: 4000, zhufang: 1500, shanyang: 3000, meiyue: 8500, nian: 102000 },
  },
  {
    nombre: "一个婴幼儿双方各扣50%、房贷利息、分摊赡养、大病医疗5万元",
    origen: {
      tipo: "recalculado",
      detalle: "婴幼儿2000×50%＝1000，房贷1000，分摊1000，每月3000，全年36000；大病50000−15000＝35000；职业资格证书3600。合计74600。",
    },
    fecha: "2026-10-29",
    entrada: { zinv: 0, yingyouer: 1, fumuBili: "50", zhufang: "daikuan", shanyang: "fenshan", fenshanE: 1000, jixuXueli: false, jixuZhengshu: true, dabing: 50000 },
    esperado: { yingyouer: 1000, meiyue: 3000, dabing: 35000, jixu: 3600, nian: 74600 },
  },
  {
    nombre: "大病医疗超过限额",
    origen: { tipo: "recalculado", detalle: "自付150000−15000＝135000，超过80000元限额，按80000扣除。学历继续教育400×12＝4800。" },
    fecha: "2026-10-29",
    entrada: { zinv: 0, yingyouer: 0, fumuBili: "100", zhufang: "wu", shanyang: "wu", fenshanE: null, jixuXueli: true, jixuZhengshu: false, dabing: 150000 },
    esperado: { dabing: 80000, jixu: 4800, nian: 84800 },
  },
  {
    nombre: "分摊额超过1500元",
    origen: { tipo: "recalculado", detalle: "非独生子女每人每月不能超过1500元。" },
    fecha: "2026-10-29",
    entrada: { zinv: 0, yingyouer: 0, fumuBili: "100", zhufang: "wu", shanyang: "fenshan", fenshanE: 2000, jixuXueli: false, jixuZhengshu: false, dabing: 0 },
    esperaError: true,
  },
]);
