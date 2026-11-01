import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { "m²": "ตร.ม.", "ft²": "ตร.ฟุต", cm: "ซม.", in: "นิ้ว" };
const u = (x: string) => UNIDAD[x] ?? x;

export const textosTh: TextosUi<UiCeramicos> = {
  slug: "tile-calculator",
  ui: () => ({
    superficie: (x) => `พื้นที่ที่จะปูกระเบื้อง (${u(x)})`,
    largo: (x) => `ความยาวกระเบื้อง (${u(x)})`,
    ancho: (x) => `ความกว้างกระเบื้อง (${u(x)})`,
    desperdicio: "เผื่อเศษเสีย (%)",
    desperdicioAyuda: "สำหรับการตัดและกระเบื้องแตก ปูตรงใช้ 10% และปูแนวทแยงใช้ 15%",
    porCaja: "จำนวนแผ่นต่อกล่อง",
    porCajaAyuda: "ไม่บังคับ กรอกเพื่อดูว่าต้องซื้อกี่กล่อง",
    piezas: "จำนวนกระเบื้องที่ต้องใช้ (แผ่น)",
    cajas: "จำนวนกล่องที่ต้องซื้อ",
    conDesperdicio: (x) => `พื้นที่รวมเผื่อเศษเสีย (${u(x)})`,
    cubre: (x) => `พื้นที่ที่กระเบื้องทุกกล่องปูได้ (${u(x)})`,
    errorSuperficie: "พื้นที่ต้องมากกว่า 0",
    errorPieza: "ขนาดกระเบื้องต้องมากกว่า 0",
  }),
};
