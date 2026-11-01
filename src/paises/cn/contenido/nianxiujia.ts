import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cn.nianxiujia",
  h1: "带薪年休假计算器（{{anio}}年天数和未休工资）",
  title: "年假天数计算器{{anio}}：{{cn.nianxiujia[yi]}}、{{cn.nianxiujia[shi]}}、{{cn.nianxiujia[ershi]}}和未休年假工资",
  description: "按职工带薪年休假条例，根据累计工作年限算出{{anio}}年可休{{cn.nianxiujia[yi]}}、{{cn.nianxiujia[shi]}}或{{cn.nianxiujia[ershi]}}年假，并计算应休未休按{{cn.nianxiujia-beilv}}支付的工资报酬。",
  intro: [
    "职工带薪年休假条例第三条规定：累计工作已满1年不满10年的，年休假{{cn.nianxiujia[yi]}}；已满10年不满20年的，{{cn.nianxiujia[shi]}}；已满20年的，{{cn.nianxiujia[ershi]}}。国家法定休假日、休息日不计入年休假。",
    "单位因工作需要不安排休年假、职工本人同意的，应休未休的天数按日工资收入的{{cn.nianxiujia-beilv}}支付年休假工资报酬。",
  ],
  comoSeCalcula: [
    "先看累计工作年限：不满1年没有年休假，1年至不满10年{{cn.nianxiujia[yi]}}，10年至不满20年{{cn.nianxiujia[shi]}}，20年以上{{cn.nianxiujia[ershi]}}。",
    "日工资按月工资收入除以月计薪天数{{cn.jixin-tianshu}}天折算。",
    "应休未休年休假工资报酬＝日工资×未休天数×{{cn.nianxiujia-beilv}}。",
  ],
  ejemplo: [
    "参加工作3年，月工资8700元，今年有5天年假，休了3天，还有2天单位安排不开。",
    "日工资8700÷21.75＝400元，2天未休年假的工资报酬是400×2×300%＝2400元。",
  ],
  faq: [
    {
      pregunta: "换了单位，工作年限要重新算吗？",
      respuesta: "条例第三条用的是“累计工作”年限，按职工参加工作以来的累计年限确定年假天数，不只看在本单位的年限。第二条规定，连续工作1年以上才享受年休假。",
    },
    {
      pregunta: "哪些情况当年不能休年假？",
      respuesta: "条例第四条规定：依法享受寒暑假且天数多于年休假的；请事假累计20天以上且单位按规定不扣工资的；累计工作满1年不满10年请病假累计2个月以上的；满10年不满20年请病假累计3个月以上的；满20年以上请病假累计4个月以上的。",
    },
    {
      pregunta: "年假可以跨年休吗？",
      respuesta: "条例第五条规定，年休假在1个年度内可以集中安排，也可以分段安排，一般不跨年度安排。单位因生产、工作特点确有必要的，可以跨1个年度安排。",
    },
    {
      pregunta: "单位不给年假也不给钱怎么办？",
      respuesta: "条例第七条规定，由县级以上地方人民政府人事部门或者劳动保障部门责令限期改正；逾期不改正的，除责令支付年休假工资报酬外，单位还应当按年休假工资报酬的数额向职工加付赔偿金。",
    },
  ],
  glosario: [
    { termino: "带薪年休假", definicion: "职工每年享有的、期间工资照发的休假，简称年假。" },
    { termino: "累计工作年限", definicion: "职工参加工作以来在各单位工作时间的合计。" },
    { termino: "年休假工资报酬", definicion: "应休未休年假时单位按日工资收入的{{cn.nianxiujia-beilv}}支付的报酬。" },
  ],
});
