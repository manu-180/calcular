import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cn.zhuanxiang-fujia-kouchu",
  h1: "个税专项附加扣除计算器（{{anio}}年标准）",
  title: "专项附加扣除计算器{{anio}}：子女教育、房租、赡养老人",
  description: "按现行标准计算{{anio}}年个税专项附加扣除：子女教育每月{{cn.zhuanxiang-yiyang[zinv]}}、赡养老人最高{{cn.zhuanxiang-yiyang[shanyang-dusheng]}}、住房租金最高{{cn.zhuanxiang-zhufang[zujin-yi]}}。",
  intro: [
    "子女教育和3岁以下婴幼儿照护每个孩子每月扣除{{cn.zhuanxiang-yiyang[zinv]}}，独生子女赡养老人每月{{cn.zhuanxiang-yiyang[shanyang-dusheng]}}，这三项标准自{{cn.zhuanxiang-yiyang#desde}}起执行。",
    "住房贷款利息、住房租金、继续教育和大病医疗按国务院专项附加扣除暂行办法的标准。勾选适合您的项目，就能算出每月在工资里能扣多少、全年合计多少。",
  ],
  comoSeCalcula: [
    "子女教育、3岁以下婴幼儿照护：每个子女每月{{cn.zhuanxiang-yiyang[zinv]}}，父母可以选择一方按100%扣除，也可以双方各按50%扣除。",
    "赡养老人：独生子女每月{{cn.zhuanxiang-yiyang[shanyang-dusheng]}}；非独生子女与兄弟姐妹分摊，每人每月不超过{{cn.zhuanxiang-yiyang[shanyang-fenshan]}}。",
    "住房：首套住房贷款利息每月{{cn.zhuanxiang-zhufang[daikuan]}}；没有自有住房租房的，按城市分别扣{{cn.zhuanxiang-zhufang[zujin-yi]}}、{{cn.zhuanxiang-zhufang[zujin-er]}}或{{cn.zhuanxiang-zhufang[zujin-san]}}。两者不能同时享受。",
    "继续教育：学历（学位）继续教育每月{{cn.zhuanxiang-zhufang[jixu-xueli]}}；职业资格继续教育在取得证书的当年扣{{cn.zhuanxiang-zhufang[jixu-zhengshu]}}。大病医疗：医保目录内个人自付累计超过{{cn.zhuanxiang-zhufang[dabing-qifu]}}的部分，在{{cn.zhuanxiang-zhufang[dabing-xiane]}}限额内据实扣除。",
  ],
  ejemplo: [
    "一位在北京工作的独生子女，两个孩子都在上学，在北京租房。子女教育每月2×2000＝4000元，住房租金1500元，赡养老人3000元，每月合计8500元。",
    "全年专项附加扣除102000元。按10%的税率估算，一年大约可以少交10200元个税。",
  ],
  faq: [
    {
      pregunta: "专项附加扣除的标准什么时候提高的？",
      respuesta: "国务院国发〔2023〕13号和国家税务总局公告2023年第14号规定，自2023年1月1日起，3岁以下婴幼儿照护和子女教育由每月1000元提高到{{cn.zhuanxiang-yiyang[zinv]}}，赡养老人由每月2000元提高到{{cn.zhuanxiang-yiyang[shanyang-dusheng]}}。",
    },
    {
      pregunta: "住房贷款利息和住房租金能同时扣吗？",
      respuesta: "不能。个人所得税专项附加扣除暂行办法第二十条规定，纳税人及其配偶在一个纳税年度内不能同时分别享受住房贷款利息和住房租金专项附加扣除。房贷利息扣除期限最长不超过240个月。",
    },
    {
      pregunta: "大病医疗什么时候扣？",
      respuesta: "暂行办法第十一条规定，大病医疗由纳税人在办理年度汇算清缴时，在{{cn.zhuanxiang-zhufang[dabing-xiane]}}限额内据实扣除，平时工资预扣时不扣。",
    },
    {
      pregunta: "当年扣不完可以留到明年吗？",
      respuesta: "不可以。暂行办法第三十条规定，专项附加扣除额一个纳税年度扣除不完的，不能结转以后年度扣除。",
    },
  ],
  glosario: [
    { termino: "专项附加扣除", definicion: "个人所得税法规定的子女教育、继续教育、大病医疗、住房贷款利息或住房租金、赡养老人等支出扣除，另有3岁以下婴幼儿照护。" },
    { termino: "主要工作城市", definicion: "纳税人任职受雇的直辖市、计划单列市、副省级城市、地级市的全部行政区域，用来确定住房租金的扣除标准。" },
    { termino: "被赡养人", definicion: "年满60岁的父母，以及子女均已去世的年满60岁的祖父母、外祖父母。" },
  ],
});
