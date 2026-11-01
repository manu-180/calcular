import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cn.guangzhou-zuidi-gongzi",
  h1: "广州最低工资标准查询（{{anio}}年）",
  title: "广州最低工资标准{{anio}}：月薪{{cn.guangzhou-zuidi-yue}}，时薪{{cn.guangzhou-zuidi-xiaoshi}}",
  description: "广州市现行全日制月最低工资{{cn.guangzhou-zuidi-yue}}，非全日制小时最低工资{{cn.guangzhou-zuidi-xiaoshi}}。输入您的工资，看{{anio}}年是否达标。",
  intro: [
    "自{{cn.guangzhou-zuidi-yue#desde}}起，广州市全日制就业劳动者月最低工资标准是{{cn.guangzhou-zuidi-yue}}，非全日制小时最低工资标准是{{cn.guangzhou-zuidi-xiaoshi}}。",
    "选择就业形式，填入您的月工资或小时工资，就能看出是否达到广州市最低工资标准，以及差多少。",
  ],
  comoSeCalcula: [
    "全日制：把实际月工资和{{cn.guangzhou-zuidi-yue}}比较，低于标准的部分就是差额。",
    "非全日制：把小时工资和{{cn.guangzhou-zuidi-xiaoshi}}比较；按小时标准乘以本月工作小时数，得出本月至少应得的报酬。",
    "标准由广州市人力资源和社会保障局公布。其他城市的最低工资标准不同，请查看当地人社部门的通知。",
  ],
  ejemplo: [
    "在广州做全日制工作，每月工资2500元，比2680元的月最低工资标准少180元，没有达标。",
    "做非全日制工作，每小时26元，高于25.4元的小时标准。本月工作80小时，按标准至少应得80×25.4＝2032元。",
  ],
  faq: [
    {
      pregunta: "广州最低工资是多少？",
      respuesta: "广州市人力资源和社会保障局关于调整最低工资标准的通知规定，全日制就业劳动者月最低工资标准调整为{{cn.guangzhou-zuidi-yue}}，非全日制小时最低工资标准调整为{{cn.guangzhou-zuidi-xiaoshi}}。",
    },
    {
      pregunta: "新标准从哪天开始执行？",
      respuesta: "同一通知规定，调整后的最低工资标准从{{cn.guangzhou-zuidi-yue#desde}}起执行。",
    },
    {
      pregunta: "试用期工资可以低于最低工资吗？",
      respuesta: "不可以。劳动合同法第二十条规定，劳动者在试用期的工资不得低于用人单位所在地的最低工资标准。",
    },
  ],
  glosario: [
    { termino: "全日制就业", definicion: "按正常工作时间全天工作的用工形式，最低工资按月计算。" },
    { termino: "非全日制用工", definicion: "以小时计酬为主的用工形式，最低工资按小时计算。" },
    { termino: "最低工资标准", definicion: "当地政府公布的工资下限，用人单位支付的工资不得低于它。" },
  ],
});
