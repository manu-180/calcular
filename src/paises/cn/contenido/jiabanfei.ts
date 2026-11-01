import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cn.jiabanfei",
  h1: "加班费计算器（{{anio}}年1.5倍、2倍、3倍）",
  title: "加班费计算器{{anio}}：工作日、周末、节假日加班工资",
  description: "按劳动法第四十四条的{{cn.jiaban-beilv[yanchang]}}、{{cn.jiaban-beilv[xiuxi]}}、{{cn.jiaban-beilv[fading]}}和月计薪天数{{cn.jixin-tianshu}}天，计算{{anio}}年工作日、休息日和法定节假日的加班费。",
  intro: [
    "劳动法第四十四条规定：工作日延长工作时间，支付不低于工资{{cn.jiaban-beilv[yanchang]}}的工资报酬；休息日加班又不能补休的，不低于{{cn.jiaban-beilv[xiuxi]}}；法定休假日加班的，不低于{{cn.jiaban-beilv[fading]}}。",
    "日工资按月工资除以月计薪天数{{cn.jixin-tianshu}}天折算，小时工资再除以8。填入月工资和加班小时数，就能算出加班费。",
  ],
  comoSeCalcula: [
    "日工资＝月工资收入÷月计薪天数（{{cn.jixin-tianshu}}天）；小时工资＝月工资收入÷（{{cn.jixin-tianshu}}×8小时）。",
    "工作日延时加班费＝小时工资×加班小时×{{cn.jiaban-beilv[yanchang]}}。",
    "休息日加班且不能补休的加班费＝小时工资×加班小时×{{cn.jiaban-beilv[xiuxi]}}；法定休假日加班费＝小时工资×加班小时×{{cn.jiaban-beilv[fading]}}。",
  ],
  ejemplo: [
    "月工资8700元，日工资是8700÷21.75＝400元，小时工资50元。",
    "某月工作日加班10小时，加班费750元；周六加班8小时没有补休，加班费800元；国庆节加班8小时，加班费1200元。三项合计2750元。",
  ],
  faq: [
    {
      pregunta: "为什么用21.75天，不是20.67天？",
      respuesta: "人社部发〔2025〕2号规定，月工作日是20.67天，用来计算工作时间；折算日工资、小时工资时不剔除13天法定节假日，月计薪天数为（365天－104天）÷12月＝{{cn.jixin-tianshu}}天。",
    },
    {
      pregunta: "周末加班一定是两倍工资吗？",
      respuesta: "劳动法第四十四条规定，休息日安排劳动者工作又不能安排补休的，才支付不低于工资{{cn.jiaban-beilv[xiuxi]}}的工资报酬。单位安排了补休的，可以不付这部分加班费。",
    },
    {
      pregunta: "法定节假日有几天？",
      respuesta: "按国务院修改后的全国年节及纪念日放假办法，全体公民的法定节日假期是13天。这些日子安排工作的，劳动法第四十四条规定按不低于工资{{cn.jiaban-beilv[fading]}}支付。",
    },
  ],
  glosario: [
    { termino: "月计薪天数", definicion: "折算日工资、小时工资时使用的天数，现行是{{cn.jixin-tianshu}}天。" },
    { termino: "延长工作时间", definicion: "在法定标准工作时间以外安排的工作，俗称延时加班。" },
    { termino: "补休", definicion: "单位安排的、用来抵扣休息日加班的休息时间。" },
  ],
});
