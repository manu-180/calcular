import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosTh: TextosUi<UiConversorSueldo> = {
  slug: "hourly-to-salary",
  ui: () => ({
    monto: "ค่าจ้าง",
    periodo: "ค่าจ้างนี้คิดเป็น",
    hora: "รายชั่วโมง",
    dia: "รายวัน",
    semana: "รายสัปดาห์",
    quincena: "รายครึ่งเดือน (ปีละ 24 ครั้ง)",
    mes: "รายเดือน",
    anio: "รายปี",
    horasSemana: "ชั่วโมงทำงานต่อสัปดาห์",
    diasSemana: "วันทำงานต่อสัปดาห์",
    semanasAnio: "จำนวนสัปดาห์ที่ได้รับค่าจ้างต่อปี",
    semanasAnioAyuda: "ใส่ 52 หากได้รับค่าจ้างในวันลาพักร้อนด้วย หากได้ค่าจ้างเฉพาะสัปดาห์ที่ทำงาน ให้หักสัปดาห์ที่เหลือออก",
    porHora: "ต่อชั่วโมง",
    porDia: "ต่อวัน",
    porSemana: "ต่อสัปดาห์",
    porQuincena: "ต่อครึ่งเดือน",
    porMes: "ต่อเดือน",
    porAnio: "ต่อปี",
    errorHoras: "กรุณากรอกจำนวนชั่วโมงทำงานต่อสัปดาห์",
    errorSemanas: "จำนวนสัปดาห์ที่ได้รับค่าจ้างต่อปีต้องมากกว่าศูนย์",
    observacionBruto: "เป็นจำนวนเงินเดียวกันที่แปลงเป็นรอบอื่น ไม่ได้รวมโบนัสและไม่ได้หักภาษี",
  }),
};
