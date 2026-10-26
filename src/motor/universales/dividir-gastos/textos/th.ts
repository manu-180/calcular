import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosTh: TextosUi<UiDividirGastos> = {
  slug: "split-bill",
  ui: () => ({
    persona: (n) => `คนที่ ${n}`,
    personaAyuda: "กรอกเงินที่แต่ละคนจ่ายไป หากมีคนที่ยังไม่ได้จ่ายแต่ต้องร่วมหาร ให้กรอก 0 ช่องที่เหลือเว้นว่างไว้",
    total: "ค่าใช้จ่ายทั้งหมด",
    personas: "จำนวนคน",
    cuota: "ส่วนที่แต่ละคนต้องจ่าย",
    transferencias: "จำนวนครั้งที่ต้องโอนคืน",
    tabla: "ใครต้องโอนให้ใคร",
    colDe: "ผู้โอน",
    colPara: "ผู้รับ",
    colMonto: "จำนวนเงิน",
    errorPocas: "ต้องมีอย่างน้อยสองคนจึงจะหารค่าใช้จ่ายได้",
    aMano: "ไม่มีใครต้องโอนคืน ทุกคนจ่ายเท่ากันแล้ว",
  }),
};
