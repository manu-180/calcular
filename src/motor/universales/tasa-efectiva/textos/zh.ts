import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosZh: TextosUi<UiTasaEfectiva> = textosPorEscritura<UiTasaEfectiva>(
  "apr-to-apy",
  () => ({
    direccion: "您手上的是哪一種利率？",
    nominalAEfectiva: "名目年利率（換算成有效年利率）",
    efectivaANominal: "有效年利率（換算成名目年利率）",
    tasa: "年利率（%）",
    tasaAyuda: "照方案或合約上的寫法輸入。",
    capitalizacion: "複利頻率",
    capitalizacionAyuda: "利息多久併入本金一次。貸款和信用卡通常是每月。",
    mensual: "每月（一年 12 次）",
    trimestral: "每季（一年 4 次）",
    semestral: "每半年（一年 2 次）",
    diaria: "每日（一年 365 次）",
    efectiva: "有效年利率",
    nominal: "名目年利率",
    periodica: "每期利率",
    errorNegativa: "利率不能是負數，請輸入 0 以上的數字。",
    observacionDiferencia: (puntos) => `因為利息也會生利息，有效年利率比名目年利率高 ${puntos} 個百分點。`,
  }),
  () => ({
    direccion: "您手上的是哪一种利率？",
    nominalAEfectiva: "名义年利率（换算成实际年利率）",
    efectivaANominal: "实际年利率（换算成名义年利率）",
    tasa: "年利率（%）",
    tasaAyuda: "按方案或合同上的写法输入。",
    capitalizacion: "复利频率",
    capitalizacionAyuda: "利息多久计入本金一次。贷款和信用卡通常是每月。",
    mensual: "每月（一年 12 次）",
    trimestral: "每季度（一年 4 次）",
    semestral: "每半年（一年 2 次）",
    diaria: "每日（一年 365 次）",
    efectiva: "实际年利率",
    nominal: "名义年利率",
    periodica: "每期利率",
    errorNegativa: "利率不能为负数，请输入 0 以上的数字。",
    observacionDiferencia: (puntos) => `因为利息也会产生利息，实际年利率比名义年利率高 ${puntos} 个百分点。`,
  }),
);
