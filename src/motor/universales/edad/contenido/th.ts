import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionTh } from "../../dias-entre-fechas/textos/th";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTh: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "คำนวณอายุ",
    title: tituloQueEntre(`คำนวณอายุ ปี เดือน วัน | ${ctx.nombrePais}`, "คำนวณอายุ ปี เดือน วัน", "คำนวณอายุ"),
    description: "คำนวณอายุที่แน่นอนเป็นปี เดือน และวัน ดูว่ามีชีวิตมาแล้วกี่วัน และเหลืออีกกี่วันจะถึงวันเกิดครั้งถัดไป",
    intro: [
      "กรอกวันเกิด แล้วจะเห็นอายุที่แน่นอน ณ วันนี้ พร้อมจำนวนเดือน สัปดาห์ และวัน",
      "เปลี่ยนวันที่ช่องที่สองเพื่อดูอายุ ณ วันใดวันหนึ่ง หรืออายุที่จะครบในอนาคต",
    ],
    comoSeCalcula: [
      "นับจำนวนเดือนเต็มตั้งแต่วันเกิดจนถึงวันที่เลือก ทุก 12 เดือนนับเป็นหนึ่งปี",
      "วันที่เหลือหลังเดือนเต็มเดือนสุดท้ายคือจำนวนวันของอายุ",
      "ปีอธิกสุรทินนับเป็น 366 วัน",
    ],
    ejemplo: [
      `ผู้ที่เกิดวันที่ ${fechaLarga(ctx.locale, nac)} มีอายุ ${duracionTh(Math.floor(meses / 12), meses % 12, dias)} ณ วันที่ ${fechaLarga(ctx.locale, ref)}`,
      `คิดเป็น ${formatearNumero(ctx, total)} วัน`,
    ],
    faq: [
      {
        pregunta: "คำนวณอายุที่แน่นอนอย่างไร",
        respuesta: "นับจำนวนปีเต็มก่อน แล้วนับเดือนเต็มนับจากวันเกิดครั้งล่าสุด จากนั้นนับวันที่เหลือ",
      },
      {
        pregunta: "คนที่เกิดวันที่ 29 กุมภาพันธ์นับอายุอย่างไร",
        respuesta: "ในปีที่ไม่ใช่ปีอธิกสุรทิน เครื่องคำนวณนี้ใช้วันที่ 28 กุมภาพันธ์เป็นวันเกิด กฎหมายบางแห่งใช้วันที่ 1 มีนาคมแทน",
      },
      {
        pregunta: "มีชีวิตมาแล้วกี่วัน",
        respuesta: "ดูได้ที่แถว “คิดเป็นวัน” ซึ่งนับทุกวันตั้งแต่วันเกิดจนถึงวันที่เลือก โดยไม่นับวันสุดท้าย",
      },
    ],
    glosario: [
      { termino: "อายุ", definicion: "จำนวนปีเต็มนับตั้งแต่วันเกิด" },
      { termino: "ปีอธิกสุรทิน", definicion: "ปีที่มี 366 วันและมีวันที่ 29 กุมภาพันธ์ มีทุกสี่ปี ยกเว้นบางปีที่ขึ้นต้นศตวรรษ" },
    ],
  };
};
