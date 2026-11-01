import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosTh: TextosUi<UiInteresCompuesto> = {
  slug: "compound-interest",
  ui: () => ({
    capital: "เงินต้นเริ่มต้น",
    aporte: "เงินที่ออมเพิ่มต่อเดือน (ไม่บังคับ)",
    aporteAyuda: "เงินที่จะเพิ่มทุกเดือน โดยนับเข้าในวันสิ้นเดือน",
    tasa: "อัตราดอกเบี้ยต่อปี (%)",
    anios: "จำนวนปี",
    capitalizacion: "ความถี่ในการทบต้น",
    anual: "รายปี",
    semestral: "รายครึ่งปี",
    trimestral: "รายไตรมาส",
    mensual: "รายเดือน",
    diaria: "รายวัน",
    saldo: "ยอดเงินสุดท้าย",
    aportado: "เงินที่ออมรวม",
    intereses: "ดอกเบี้ยที่ได้รับ",
    tabla: "การเติบโตรายปี",
    colAnio: "ปีที่",
    colAportado: "เงินที่ออม",
    colIntereses: "ดอกเบี้ย",
    colSaldo: "ยอดเงินสิ้นปี",
    errorSinDinero: "กรุณากรอกเงินต้นเริ่มต้นหรือเงินที่ออมเพิ่มต่อเดือน",
    observacionIntereses: (porcentaje) => `${porcentaje}% ของยอดเงินสุดท้ายเป็นดอกเบี้ย`,
  }),
};
