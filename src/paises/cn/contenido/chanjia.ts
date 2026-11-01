import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cn.chanjia",
  h1: "产假天数计算器（{{anio}}年国家标准）",
  title: "产假计算器{{anio}}：{{cn.chanjia[jiben]}}产假、难产和多胞胎增加天数",
  description: "按《女职工劳动保护特别规定》计算{{anio}}年产假：生育{{cn.chanjia[jiben]}}，难产增加{{cn.chanjia[nanchan]}}，多胞胎每多1个婴儿增加{{cn.chanjia[duotai]}}，以及流产假。",
  intro: [
    "女职工生育享受{{cn.chanjia[jiben]}}产假，其中产前可以休假{{cn.chanjia[chanqian]}}。难产的增加{{cn.chanjia[nanchan]}}；生育多胞胎的，每多生育1个婴儿增加{{cn.chanjia[duotai]}}。",
    "怀孕未满4个月流产的，享受{{cn.chanjia[liuchan-xiao]}}产假；怀孕满4个月流产的，享受{{cn.chanjia[liuchan-da]}}产假。选择情形就能算出总天数。",
  ],
  comoSeCalcula: [
    "生育：基本产假{{cn.chanjia[jiben]}}，其中产前最多{{cn.chanjia[chanqian]}}。",
    "难产再加{{cn.chanjia[nanchan]}}；双胞胎加{{cn.chanjia[duotai]}}，三胞胎加两个{{cn.chanjia[duotai]}}，依此类推。",
    "流产：未满4个月{{cn.chanjia[liuchan-xiao]}}，满4个月{{cn.chanjia[liuchan-da]}}。",
    "计算器只计算《女职工劳动保护特别规定》的国家标准，不包括各地规定的其他假期。",
  ],
  ejemplo: [
    "一位女职工难产，生了双胞胎。基本产假98天，难产增加15天，多1个婴儿再增加15天。",
    "她的产假一共是98＋15＋15＝128天，其中产前可以休15天。",
  ],
  faq: [
    {
      pregunta: "产假是哪条规定的？",
      respuesta: "国务院令第619号《女职工劳动保护特别规定》第七条规定了生育、难产、多胞胎和流产的产假天数，自2012年4月28日起施行。",
    },
    {
      pregunta: "产假期间工资怎么发？",
      respuesta: "第八条规定，女职工产假期间的生育津贴，对已经参加生育保险的，按照用人单位上年度职工月平均工资的标准由生育保险基金支付；对未参加生育保险的，按照女职工产假前工资的标准由用人单位支付。",
    },
    {
      pregunta: "所在省份规定的产假更长怎么办？",
      respuesta: "这里算的是国家规定的天数。如果您所在地区另有规定，请再查看当地的规定和单位的制度。",
    },
  ],
  glosario: [
    { termino: "产假", definicion: "女职工因生育或流产依法享受的休假。" },
    { termino: "产前假", definicion: "产假中可以在分娩前休的部分。" },
    { termino: "生育津贴", definicion: "产假期间代替工资发放的津贴，参加生育保险的由生育保险基金支付。" },
  ],
});
