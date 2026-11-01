import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "cn.guangzhou-zuidi-gongzi-2026",
    fecha: "2026-10-29",
    titulo: "广州月最低工资标准调整为2680元",
    texto: "自2026年9月1日起，广州市全日制就业劳动者月最低工资标准为2680元，非全日制小时最低工资标准为25.4元。最低工资计算器已按新标准更新。",
    vigenteDesde: "2026-09-01",
    calculadoras: ["cn.guangzhou-zuidi-gongzi", "cn.shiyongqi-gongzi"],
    fuente: {
      organismo: "广州市人民政府",
      titulo: "广州市人力资源和社会保障局关于调整我市最低工资标准的通知",
      url: "https://www.gz.gov.cn/xw/tzgg/content/post_10981840.html",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "cn.zhufang-gongjijin-tiaoli-2026",
    fecha: "2026-10-29",
    titulo: "修订后的《住房公积金管理条例》自2026年9月20日起施行",
    texto: "修订后的条例第十八条仍规定，职工和单位的住房公积金缴存比例均不得低于职工上一年度月平均工资的5%。税后工资计算器按这一下限提示公积金比例。",
    vigenteDesde: "2026-09-20",
    calculadoras: ["cn.shuihou-gongzi"],
    fuente: {
      organismo: "国家法律法规数据库",
      titulo: "住房公积金管理条例（2026年8月10日修订）",
      url: "https://flk.npc.gov.cn/detail?id=ff8081819ff54a6401a01df735565134",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "cn.zengzhishuifa-2026",
    fecha: "2026-10-29",
    titulo: "《增值税法》自2026年1月1日起施行",
    texto: "增值税法把13%、9%、6%三档税率和3%的征收率写入法律。增值税计算器按法律规定的税率计算。",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cn.zengzhishui"],
    fuente: {
      organismo: "国家法律法规数据库",
      titulo: "中华人民共和国增值税法",
      url: "https://flk.npc.gov.cn/detail?id=ff808181927b083b0193fd65a0eb02cb",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
