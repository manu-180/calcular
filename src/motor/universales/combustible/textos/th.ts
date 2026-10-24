import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

// En tailandés el kilómetro se escribe «กม.» y la milla «ไมล์».
const unidad = (u: string) => (u === "km" ? "กม." : u === "mi" ? "ไมล์" : u);

export const textosTh: TextosUi<UiCombustible> = {
  slug: "fuel-cost",
  ui: () => ({
    distancia: (u) => `ระยะทาง (${unidad(u)})`,
    idaYVuelta: "ไปกลับ",
    tipoConsumo: "หน่วยของอัตราสิ้นเปลือง",
    l100: "ลิตรต่อ 100 กม.",
    kml: "กิโลเมตรต่อลิตร (กม./ลิตร)",
    consumo: "อัตราสิ้นเปลือง",
    consumoMpg: "อัตราสิ้นเปลือง (ไมล์ต่อแกลลอน)",
    consumoAyuda: "ดูได้จากคู่มือรถหรือหน้าจอแสดงอัตราสิ้นเปลือง โดยทั่วไปขับทางไกลจะประหยัดน้ำมันกว่าขับในเมือง",
    precio: (u) => (u === "L" ? "ราคาน้ำมันต่อลิตร" : "ราคาน้ำมันต่อแกลลอน"),
    personas: "จำนวนคนที่หารค่าน้ำมัน",
    costo: "ค่าน้ำมัน",
    porPersona: "ต่อคน",
    combustible: (u) => (u === "L" ? "น้ำมันที่ต้องใช้ (ลิตร)" : "น้ำมันที่ต้องใช้ (แกลลอน)"),
    distanciaTotal: (u) => `ระยะทางรวม (${unidad(u)})`,
    costoPorDistancia: (u) => (u === "mi" ? "ค่าน้ำมันต่อไมล์" : u === "km" ? "ค่าน้ำมันต่อกิโลเมตร" : `ค่าน้ำมันต่อ ${u}`),
    errorConsumo: "อัตราสิ้นเปลืองต้องมากกว่า 0",
    errorPersonas: "ต้องมีอย่างน้อยหนึ่งคน",
  }),
};
