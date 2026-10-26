import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { m: "ม.", "m²": "ตร.ม.", ft: "ฟุต", "ft²": "ตร.ฟุต" };
const u = (x: string) => UNIDAD[x] ?? x;

export const textosTh: TextosUi<UiMetrosCuadrados> = {
  slug: "square-footage",
  ui: () => ({
    forma: (n) => `พื้นที่ส่วนที่ ${n}: รูปทรง`,
    formaAyuda: "หากห้องเป็นรูปตัว L หรือไม่เป็นสี่เหลี่ยม ให้แบ่งเป็นส่วน ๆ แล้วนำมารวมกัน",
    ninguna: "ไม่ใช้",
    rectangulo: "สี่เหลี่ยมผืนผ้าหรือสี่เหลี่ยมจัตุรัส",
    triangulo: "สามเหลี่ยม",
    circulo: "วงกลม",
    medidaA: (n, x) => `พื้นที่ส่วนที่ ${n}: ความยาว ฐาน หรือเส้นผ่านศูนย์กลาง (${u(x)})`,
    medidaAAyuda: "สี่เหลี่ยม: ความยาวและความกว้าง สามเหลี่ยม: ฐานและความสูง วงกลม: เส้นผ่านศูนย์กลางอย่างเดียว",
    medidaB: (n, x) => `พื้นที่ส่วนที่ ${n}: ความกว้างหรือความสูง (${u(x)})`,
    total: (x) => `พื้นที่รวม (${u(x)})`,
    equivale: (x) => `เทียบเท่าเป็น ${u(x)}`,
    parcial: (n, x) => `พื้นที่ส่วนที่ ${n} (${u(x)})`,
    errorMedida: "ยังไม่ได้กรอกขนาดนี้ หรือขนาดเป็น 0",
  }),
};
