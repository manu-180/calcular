import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cn.jingying-suode-geshui",
  h1: "经营所得个税计算器（{{anio}}年个体工商户适用）",
  title: "经营所得个税计算器{{anio}}：{{cn.jingying-suode-shuilv[0].tasa}}至{{cn.jingying-suode-shuilv[-1].tasa}}超额累进",
  description: "按个人所得税法经营所得税率表（{{cn.jingying-suode-shuilv[0].tasa}}至{{cn.jingying-suode-shuilv[-1].tasa}}）计算{{anio}}年个体工商户等经营所得的个人所得税。",
  intro: [
    "个体工商户等取得的经营所得，按年单独计算个人所得税，适用{{cn.jingying-suode-shuilv[0].tasa}}到{{cn.jingying-suode-shuilv[-1].tasa}}的五级超额累进税率。",
    "应纳税所得额是全年收入总额减除成本、费用以及损失后的余额。填入全年收入和成本，就能看到应纳税额和实际税负。",
  ],
  comoSeCalcula: [
    "应纳税所得额＝全年收入总额－成本、费用以及损失。依法可以扣除的公益慈善捐赠等，可以填在“其他可以减除的金额”。",
    "按经营所得税率表分段计税：不超过{{cn.jingying-suode-shuilv[0].hasta}}的部分{{cn.jingying-suode-shuilv[0].tasa}}，{{cn.jingying-suode-shuilv[1].desde}}至{{cn.jingying-suode-shuilv[1].hasta}}的部分{{cn.jingying-suode-shuilv[1].tasa}}，超过{{cn.jingying-suode-shuilv[-1].desde}}的部分{{cn.jingying-suode-shuilv[-1].tasa}}。",
    "分段相加的结果，等于用全部应纳税所得额乘以最高适用税率，再减去速算扣除数。",
  ],
  ejemplo: [
    "一家个体工商户全年收入300000元，成本、费用和损失合计200000元，应纳税所得额100000元。",
    "前30000元按5%缴1500元，30000元至90000元的60000元按10%缴6000元，剩下10000元按20%缴2000元，全年应纳9500元，实际税负9.5%。",
  ],
  faq: [
    {
      pregunta: "经营所得的税率是多少？",
      respuesta: "个人所得税法第三条规定，经营所得适用百分之五至百分之三十五的超额累进税率。税率表二分五级，最高一档是全年应纳税所得额超过{{cn.jingying-suode-shuilv[-1].desde}}的部分，适用{{cn.jingying-suode-shuilv[-1].tasa}}。",
    },
    {
      pregunta: "经营所得的应纳税所得额怎么算？",
      respuesta: "个人所得税法第六条规定，经营所得以每一纳税年度的收入总额减除成本、费用以及损失后的余额，为应纳税所得额。",
    },
    {
      pregunta: "经营所得和工资要合并计税吗？",
      respuesta: "不合并。个人所得税法第二条规定，综合所得只包括工资薪金、劳务报酬、稿酬和特许权使用费四项；经营所得单独按经营所得税率表计税。",
    },
    {
      pregunta: "计算器包括税收优惠吗？",
      respuesta: "不包括。计算器只按个人所得税法的税率表计算，没有计入任何减免税优惠。如果您享受减免政策，实际税额以主管税务机关的规定为准。",
    },
  ],
  glosario: [
    { termino: "经营所得", definicion: "个人所得税法第二条列出的九项所得之一，按年单独计税，常见于个体工商户。" },
    { termino: "应纳税所得额", definicion: "收入总额减除成本、费用以及损失后的余额，是计算税额的基数。" },
    { termino: "超额累进税率", definicion: "所得分成几段，每段按各自税率计税，所得越高的部分税率越高。" },
  ],
});
