import { esHongKong, textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosZh: TextosUi<UiConversorSueldo> = textosPorEscritura<UiConversorSueldo>(
  "hourly-to-salary",
  (locale) => {
    const sueldo = esHongKong(locale) ? "薪金" : "薪資";
    return {
      monto: sueldo,
      periodo: `${sueldo}單位`,
      hora: "每小時",
      dia: "每天",
      semana: "每週",
      quincena: "每半個月（一年 24 次）",
      mes: "每月",
      anio: "每年",
      horasSemana: "每週工作時數",
      diasSemana: "每週工作天數",
      semanasAnio: "每年支薪週數",
      semanasAnioAyuda: "有帶薪休假就填 52。如果只有上班的週數才領錢，請扣掉其他週。",
      porHora: "時薪",
      porDia: "日薪",
      porSemana: "週薪",
      porQuincena: "半月薪",
      porMes: "月薪",
      porAnio: "年薪",
      errorHoras: "請輸入每週工作時數。",
      errorSemanas: "每年支薪週數必須大於 0。",
      observacionBruto: "這是同一筆金額換算成其他單位，沒有加上獎金，也沒有扣稅。",
    };
  },
  () => ({
    monto: "工资",
    periodo: "工资单位",
    hora: "每小时",
    dia: "每天",
    semana: "每周",
    quincena: "每半个月（一年 24 次）",
    mes: "每月",
    anio: "每年",
    horasSemana: "每周工作小时数",
    diasSemana: "每周工作天数",
    semanasAnio: "每年计薪周数",
    semanasAnioAyuda: "有带薪年假就填 52。如果只有上班的周才领工资，请扣掉其他周。",
    porHora: "时薪",
    porDia: "日薪",
    porSemana: "周薪",
    porQuincena: "半月薪",
    porMes: "月薪",
    porAnio: "年薪",
    errorHoras: "请输入每周工作小时数。",
    errorSemanas: "每年计薪周数必须大于 0。",
    observacionBruto: "这是同一笔金额换算成其他单位，没有加上奖金，也没有扣税。",
  }),
);
