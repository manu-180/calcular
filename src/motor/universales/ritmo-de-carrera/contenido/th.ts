import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoTh: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ไมล์" : "กิโลเมตร";
  const corto = imperial ? "ไมล์" : "กม.";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "คำนวณเพซวิ่ง",
    title: tituloQueEntre(`คำนวณเพซวิ่ง เวลา และระยะทาง | ${ctx.nombrePais}`, "คำนวณเพซวิ่ง เวลา และระยะทาง", "คำนวณเพซวิ่ง"),
    description: `คำนวณเพซต่อ${u} เวลาที่เข้าเส้นชัย หรือระยะทาง สำหรับการวิ่ง 5 กม. 10 กม. ฮาล์ฟมาราธอน และมาราธอน`,
    intro: [
      "เมื่อมีตัวเลขสองในสามอย่าง (ระยะทาง เวลา และเพซ) ก็หาตัวที่สามได้ ใช้วางแผนงานวิ่งหรือตรวจสอบการซ้อมได้",
      "มีระยะ 5 กม. 10 กม. ฮาล์ฟมาราธอน และมาราธอนให้เลือกได้ทันที",
    ],
    comoSeCalcula: [
      `เพซ = เวลา ÷ ระยะทาง เป็นนาทีและวินาทีต่อ${u}`,
      "เวลา = เพซ × ระยะทาง",
      "ระยะทาง = เวลา ÷ เพซ ส่วนความเร็วเฉลี่ยคือระยะทางหารด้วยจำนวนชั่วโมง",
    ],
    ejemplo: imperial
      ? [
          `วิ่ง 3 ไมล์ใน 27 นาที คือเพซ 9:00 ต่อไมล์ หรือความเร็ว ${formatearNumero(ctx, 20 / 3, 2)} ไมล์ต่อชั่วโมง`,
          `ฮาล์ฟมาราธอน (${formatearNumero(ctx, media, 2)} ไมล์) ที่เพซ ${ritmoTexto(ritmoMedia)} ต่อไมล์ จะเข้าเส้นชัยในเวลา ${reloj(ritmoMedia * media)}`,
        ]
      : [
          "วิ่ง 10 กม. ใน 50 นาที คือเพซ 5:00 ต่อกิโลเมตร หรือความเร็ว 12 กม./ชม.",
          `ฮาล์ฟมาราธอน (${formatearNumero(ctx, media, 1)} ${corto}) ที่เพซ ${ritmoTexto(ritmoMedia)} ต่อกิโลเมตร จะเข้าเส้นชัยในเวลา ${reloj(ritmoMedia * media)}`,
        ],
    faq: [
      {
        pregunta: `คำนวณเพซต่อ${u}อย่างไร`,
        respuesta: imperial
          ? `แปลงเวลาเป็นนาทีแล้วหารด้วยจำนวนไมล์ วิ่ง 3 ไมล์ใน 28 นาที 30 วินาที เท่ากับ ${formatearNumero(ctx, 9.5, 1)} นาทีต่อไมล์ หรือ 9:30`
          : `แปลงเวลาเป็นนาทีแล้วหารด้วยจำนวนกิโลเมตร วิ่ง 10 กม. ใน 55 นาที เท่ากับ ${formatearNumero(ctx, 5.5, 1)} นาทีต่อกิโลเมตร หรือ 5:30`,
      },
      {
        pregunta: "มือใหม่ควรวิ่งเพซเท่าไร",
        respuesta: "เพซที่ยังพูดคุยได้ขณะวิ่ง เมื่อร่างกายฟิตขึ้น เพซจะเร็วขึ้นเอง",
      },
      {
        pregunta: "มาราธอนยาวกี่กิโลเมตร",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} กม. (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} ไมล์) ส่วนฮาล์ฟมาราธอนยาวครึ่งหนึ่งของระยะนี้`,
      },
    ],
    glosario: [
      { termino: "เพซ", definicion: "เวลาที่ใช้วิ่งหนึ่งกิโลเมตรหรือหนึ่งไมล์" },
      { termino: "ความเร็วเฉลี่ย", definicion: "ระยะทางที่วิ่งได้ในหนึ่งชั่วโมง" },
    ],
  };
};
