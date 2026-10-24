import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosTh: TextosUi<UiConsumoElectrico> = {
  slug: "electricity-cost",
  ui: () => ({
    potencia: "กำลังไฟของเครื่องใช้ไฟฟ้า (วัตต์)",
    potenciaAyuda: "ดูได้จากฉลากหรือคู่มือ เป็นหน่วยวัตต์ (W) หากระบุเป็น kW ให้คูณ 1000",
    cantidad: "จำนวนเครื่องที่เหมือนกัน",
    horas: "จำนวนชั่วโมงที่ใช้ต่อวัน",
    dias: "จำนวนวันที่ใช้ต่อเดือน",
    precio: "ค่าไฟต่อหน่วย (kWh)",
    precioAyuda: "ดูได้จากใบแจ้งค่าไฟฟ้า ใช้ค่าไฟต่อหน่วยรวมภาษีหากต้องการค่าใช้จ่ายทั้งหมด",
    kwhDia: "หน่วยไฟฟ้าต่อวัน (kWh)",
    kwhMes: "หน่วยไฟฟ้าต่อเดือน (kWh)",
    kwhAnio: "หน่วยไฟฟ้าต่อปี (kWh)",
    costoDia: "ค่าไฟต่อวัน",
    costoMes: "ค่าไฟต่อเดือน",
    costoAnio: "ค่าไฟต่อปี",
    errorHoras: "หนึ่งวันมี 24 ชั่วโมง จำนวนชั่วโมงที่ใช้ต้องอยู่ระหว่าง 0 ถึง 24",
  }),
};
