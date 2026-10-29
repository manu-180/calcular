import { definirCasos } from "@/motor/calculo";
import calculadora from "./shuihou-gongzi";

export default definirCasos(calculadora, [
  {
    nombre: "月薪1万元，失业保险0.5%，公积金12%",
    origen: {
      tipo: "recalculado",
      detalle:
        "养老10000×8%＝800，医疗200，失业50，公积金1200，合计2250。每月应纳税所得额10000−5000−2250＝2750，全年33000×3%＝990；1月预扣82.5，12月预扣990−907.5＝82.5。全年税后120000−27000−990＝92010，月均7667.5。",
    },
    fecha: "2026-10-29",
    entrada: { yuexin: 10000, jishu: null, shiye: 0.5, gongjijin: 12, fujia: 0 },
    esperado: { yanglao: 800, yiliao: 200, shiye: 50, gongjijin: 1200, zhuanxiang: 2250, geshuiYue1: 82.5, geshuiYue12: 82.5, geshuiNian: 990, shuihouNian: 92010, shuihou: 7667.5 },
  },
  {
    nombre: "月薪3万元，缴费基数2.5万元，赡养老人3000元",
    origen: {
      tipo: "recalculado",
      detalle:
        "个人缴纳25000×(8%＋2%＋0.5%＋7%)＝4375。每月应纳税所得额30000−5000−4375−3000＝17625。1月 17625×3%＝528.75。全年211500×20%−16920＝25380；前11个月193875×20%−16920＝21855，12月预扣3525。全年税后360000−52500−25380＝282120，月均23510。",
    },
    fecha: "2026-10-29",
    entrada: { yuexin: 30000, jishu: 25000, shiye: 0.5, gongjijin: 7, fujia: 3000 },
    esperado: { zhuanxiang: 4375, geshuiYue1: 528.75, geshuiYue12: 3525, geshuiNian: 25380, shuihouNian: 282120, shuihou: 23510, tasa: 20 },
  },
  {
    nombre: "月薪5000元以下不交个税",
    origen: { tipo: "recalculado", detalle: "养老400，医疗100，公积金5%为250，每月应纳税所得额为负，个税0。全年税后(5000−750)×12＝51000，月均4250。" },
    fecha: "2026-10-29",
    entrada: { yuexin: 5000, jishu: null, shiye: 0, gongjijin: 5, fujia: 0 },
    esperado: { zhuanxiang: 750, geshuiNian: 0, shuihou: 4250 },
  },
  {
    nombre: "月薪为0",
    origen: { tipo: "recalculado", detalle: "没有月薪无法计算。" },
    fecha: "2026-10-29",
    entrada: { yuexin: 0, jishu: null, shiye: 0, gongjijin: 5, fujia: 0 },
    esperaError: true,
  },
]);
