import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cn.zengzhishui",
  h1: "增值税计算器（{{anio}}年价税分离）",
  title: "增值税计算器{{anio}}：{{cn.zengzhishui[huowu]}}、{{cn.zengzhishui[dishui]}}、{{cn.zengzhishui[fuwu]}}价税分离",
  description: "按《增值税法》现行税率{{cn.zengzhishui[huowu]}}、{{cn.zengzhishui[dishui]}}、{{cn.zengzhishui[fuwu]}}和征收率{{cn.zengzhishui[jianyi]}}，{{anio}}年含税价和不含税价互相换算，算出增值税额。",
  intro: [
    "《增值税法》自{{cn.zengzhishui#desde}}起施行。销售货物、加工修理修配服务、有形动产租赁服务和进口货物，税率一般是{{cn.zengzhishui[huowu]}}；交通运输、建筑、不动产租赁、农产品等是{{cn.zengzhishui[dishui]}}；其他服务和无形资产是{{cn.zengzhishui[fuwu]}}。",
    "适用简易计税方法的征收率是{{cn.zengzhishui[jianyi]}}。输入含税价可以做价税分离，输入不含税价可以算出价税合计。",
  ],
  comoSeCalcula: [
    "已知含税价：不含税金额＝含税价÷（1＋税率），增值税额＝含税价－不含税金额。",
    "已知不含税价：增值税额＝不含税金额×税率，价税合计＝不含税金额＋增值税额。",
    "一般计税方法下，应纳税额是销项税额抵扣进项税额后的余额；简易计税方法下，应纳税额是销售额乘以征收率{{cn.zengzhishui[jianyi]}}。计算器算的是一笔交易的税额，不做进项抵扣。",
  ],
  ejemplo: [
    "一张货物销售发票价税合计11300元，税率13%。不含税金额是11300÷1.13＝10000元，增值税额1300元。",
    "一笔咨询服务不含税报价10000元，按6%计算增值税600元，价税合计10600元。",
  ],
  faq: [
    {
      pregunta: "增值税税率有几档？",
      respuesta: "《增值税法》第十条规定了{{cn.zengzhishui[huowu]}}、{{cn.zengzhishui[dishui]}}、{{cn.zengzhishui[fuwu]}}三档税率，出口货物和规定范围内的跨境服务、无形资产税率为零。第十一条规定简易计税方法的征收率为{{cn.zengzhishui[jianyi]}}。",
    },
    {
      pregunta: "什么是小规模纳税人？",
      respuesta: "《增值税法》第九条规定，小规模纳税人是指年应征增值税销售额未超过五百万元的纳税人，可以按照销售额和征收率计算应纳税额。会计核算健全的，可以登记为按一般计税方法纳税。",
    },
    {
      pregunta: "一张合同涉及不同税率怎么办？",
      respuesta: "第十二条规定，纳税人发生两项以上应税交易涉及不同税率、征收率的，应当分别核算销售额；未分别核算的，从高适用税率。",
    },
    {
      pregunta: "哪些进项税额不能抵扣？",
      respuesta: "第二十二条列明，用于简易计税项目、免税项目、集体福利或者个人消费，以及直接用于消费的餐饮服务、居民日常服务和娱乐服务等对应的进项税额，不得从销项税额中抵扣。",
    },
  ],
  glosario: [
    { termino: "价税合计", definicion: "不含税金额加上增值税额，也就是含税价。" },
    { termino: "征收率", definicion: "简易计税方法使用的比例，按销售额直接计算应纳税额，不抵扣进项。" },
    { termino: "进项税额", definicion: "购进货物、服务等时支付或负担的增值税额，可以按规定从销项税额中抵扣。" },
  ],
});
