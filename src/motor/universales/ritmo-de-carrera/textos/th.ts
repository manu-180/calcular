import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

const UNIDAD: Readonly<Record<string, string>> = { km: "กม.", mi: "ไมล์", "km/h": "กม./ชม.", mph: "ไมล์/ชม." };
const u = (x: string) => UNIDAD[x] ?? x;

export const textosTh: TextosUi<UiRitmo> = {
  slug: "running-pace",
  ui: () => ({
    calcular: "ต้องการคำนวณอะไร",
    calcRitmo: "เพซ (จากระยะทางและเวลา)",
    calcTiempo: "เวลา (จากระยะทางและเพซ)",
    calcDistancia: "ระยะทาง (จากเวลาและเพซ)",
    distancia: "ระยะทาง",
    distanciaAyuda: "เลือกรายการวิ่ง หรือเลือก “ระยะอื่น” เพื่อกรอกระยะทางเอง",
    otra: "ระยะอื่น",
    cincoK: "5 กม.",
    diezK: "10 กม.",
    media: "ฮาล์ฟมาราธอน",
    maraton: "มาราธอน",
    distanciaOtra: (x) => `ระยะอื่น (${u(x)})`,
    horas: "เวลา: ชั่วโมง",
    minutos: "เวลา: นาที",
    segundos: "เวลา: วินาที",
    ritmoMin: (x) => `เพซ: นาทีต่อ ${u(x)}`,
    ritmoSeg: "เพซ: วินาที",
    ritmo: (x) => `เพซ (นาที/${u(x)})`,
    tiempo: "เวลาที่เข้าเส้นชัย",
    distanciaRes: (x) => `ระยะทาง (${u(x)})`,
    velocidad: (x) => `ความเร็วเฉลี่ย (${u(x)})`,
    errorDistancia: "กรุณากรอกระยะทางที่มากกว่า 0",
    errorTiempo: "กรุณากรอกเวลาเป็นชั่วโมง นาที หรือวินาที",
    errorRitmo: "กรุณากรอกเพซเป็นนาทีและวินาทีต่อหน่วยระยะทาง",
  }),
};
