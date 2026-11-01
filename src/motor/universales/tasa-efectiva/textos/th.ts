import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosTh: TextosUi<UiTasaEfectiva> = {
  slug: "apr-to-apy",
  ui: () => ({
    direccion: "อัตราที่มีอยู่เป็นแบบใด",
    nominalAEfectiva: "อัตราดอกเบี้ยที่ระบุต่อปี (แปลงเป็นอัตราที่แท้จริง)",
    efectivaANominal: "อัตราดอกเบี้ยที่แท้จริงต่อปี (แปลงเป็นอัตราที่ระบุ)",
    tasa: "อัตราดอกเบี้ยต่อปี (%)",
    tasaAyuda: "กรอกตามที่ระบุในข้อเสนอหรือสัญญา",
    capitalizacion: "ความถี่ในการทบต้น",
    capitalizacionAyuda: "จำนวนครั้งที่นำดอกเบี้ยไปรวมกับยอดเงิน สินเชื่อและบัตรเครดิตส่วนใหญ่ทบต้นรายเดือน",
    mensual: "รายเดือน (ปีละ 12 ครั้ง)",
    trimestral: "รายไตรมาส (ปีละ 4 ครั้ง)",
    semestral: "รายครึ่งปี (ปีละ 2 ครั้ง)",
    diaria: "รายวัน (ปีละ 365 ครั้ง)",
    efectiva: "อัตราดอกเบี้ยที่แท้จริงต่อปี (EIR)",
    nominal: "อัตราดอกเบี้ยที่ระบุต่อปี",
    periodica: "อัตราดอกเบี้ยต่องวด",
    errorNegativa: "อัตราดอกเบี้ยติดลบไม่ได้ กรุณากรอกตัวเลขตั้งแต่ 0 ขึ้นไป",
    observacionDiferencia: (puntos) => `อัตราที่แท้จริงสูงกว่าอัตราที่ระบุ ${puntos} จุด เพราะดอกเบี้ยก็ได้ดอกเบี้ยด้วย`,
  }),
};
