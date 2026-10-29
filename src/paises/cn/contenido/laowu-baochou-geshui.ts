import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cn.laowu-baochou-geshui",
  h1: "劳务报酬个税计算器（{{anio}}年预扣预缴）",
  title: "劳务报酬个税计算器{{anio}}：稿酬、特许权使用费预扣",
  description: "按预扣率表二（{{cn.yukou-laowu-shuilv[0].tasa}}至{{cn.yukou-laowu-shuilv[-1].tasa}}）计算{{anio}}年劳务报酬每次预扣的个税，稿酬和特许权使用费按{{cn.yukou-gaochou-lv}}预扣。",
  intro: [
    "单位或个人向居民个人支付劳务报酬时要预扣个税：每次收入不超过{{cn.yukou-feiyong-menkan}}的减除{{cn.yukou-feiyong-ding}}，超过的减除{{cn.laowu-feiyong-bili}}，余额按{{cn.yukou-laowu-shuilv[0].tasa}}到{{cn.yukou-laowu-shuilv[-1].tasa}}的预扣率计算。",
    "稿酬和特许权使用费也先减除费用，稿酬再减按{{cn.gaochou-jianan-bili}}计算，统一按{{cn.yukou-gaochou-lv}}预扣。",
  ],
  comoSeCalcula: [
    "减除费用：每次收入不超过{{cn.yukou-feiyong-menkan}}的，减除{{cn.yukou-feiyong-ding}}；超过的，减除收入的{{cn.laowu-feiyong-bili}}。",
    "劳务报酬：预扣预缴应纳税所得额不超过{{cn.yukou-laowu-shuilv[0].hasta}}的适用{{cn.yukou-laowu-shuilv[0].tasa}}，超过{{cn.yukou-laowu-shuilv[-1].desde}}的部分适用{{cn.yukou-laowu-shuilv[-1].tasa}}，按“应纳税所得额×预扣率－速算扣除数”计算。",
    "稿酬：收入减除费用后再乘以{{cn.gaochou-jianan-bili}}，按{{cn.yukou-gaochou-lv}}预扣。特许权使用费：收入减除费用后按{{cn.yukou-gaochou-lv}}预扣。",
  ],
  ejemplo: [
    "一次劳务报酬30000元，超过4000元，减除20%即6000元，预扣预缴应纳税所得额24000元，落在30%这一档，速算扣除数2000元。",
    "应预扣24000×30%−2000＝5200元，到手24800元。如果只拿到3000元，减除800元后按20%预扣440元。",
  ],
  faq: [
    {
      pregunta: "劳务报酬预扣的税是最终税负吗？",
      respuesta: "不是。国家税务总局公告2018年第61号规定，居民个人办理年度综合所得汇算清缴时，劳务报酬、稿酬、特许权使用费的收入额要并入综合所得计算应纳税款，多退少补。并入时收入额按减除{{cn.laowu-feiyong-bili}}费用后的余额计算，不再区分800元。",
    },
    {
      pregunta: "什么算一次收入？",
      respuesta: "同一公告第十一条规定，属于一次性收入的，以取得该项收入为一次；属于同一项目连续性收入的，以一个月内取得的收入为一次。",
    },
    {
      pregunta: "稿酬为什么税更低？",
      respuesta: "个人所得税法规定，稿酬所得的收入额减按{{cn.gaochou-jianan-bili}}计算。预扣时稿酬按{{cn.yukou-gaochou-lv}}的比例预扣率，所以同样金额的稿酬比劳务报酬预扣得少。",
    },
  ],
  glosario: [
    { termino: "劳务报酬所得", definicion: "个人提供劳务取得的报酬，比如讲课、咨询、设计。具体范围以个人所得税法实施条例为准。" },
    { termino: "预扣率表二", definicion: "居民个人劳务报酬所得预扣预缴适用的三级预扣率表。" },
    { termino: "收入额", definicion: "收入减除费用后的余额，稿酬还要再减按一定比例计算。" },
  ],
});
