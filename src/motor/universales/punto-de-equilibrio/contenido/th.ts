import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoTh: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "คำนวณจุดคุ้มทุน",
    title: tituloQueEntre(`คำนวณจุดคุ้มทุนของธุรกิจใน${ctx.nombrePais}`, `คำนวณจุดคุ้มทุนใน${ctx.nombrePais}`, "คำนวณจุดคุ้มทุนของธุรกิจ"),
    description: "คำนวณว่าต้องขายกี่หน่วยและต้องมียอดขายเท่าไรต่อเดือนจึงจะคุ้มทุน และต้องขายเพิ่มเท่าไรเพื่อให้ได้กำไรตามเป้าหมาย",
    intro: [
      "จุดคุ้มทุนคือระดับยอดขายที่ธุรกิจไม่ได้กำไรและไม่ขาดทุน ขายต่ำกว่านี้จะขาดทุน ขายเกินกว่านี้จึงเริ่มมีกำไร",
      "กรอกต้นทุนคงที่ ราคาขาย และต้นทุนของแต่ละหน่วย ระบบจะแสดงยอดที่ต้องขายเพื่อคุ้มทุนและเพื่อให้ถึงเป้าหมาย",
    ],
    comoSeCalcula: [
      "กำไรส่วนเกินต่อหน่วย = ราคาขาย − ต้นทุนผันแปรต่อหน่วย",
      "จำนวนหน่วยที่คุ้มทุน = ต้นทุนคงที่ ÷ กำไรส่วนเกินต่อหน่วย แล้วปัดขึ้น",
      "ยอดขายที่คุ้มทุน = ต้นทุนคงที่ ÷ (กำไรส่วนเกินต่อหน่วย ÷ ราคาขาย)",
      "หากมีกำไรเป้าหมาย ให้บวกกำไรนั้นเข้ากับต้นทุนคงที่แล้วคำนวณแบบเดียวกัน",
    ],
    ejemplo: [
      `ต้นทุนคงที่ ${m(fijos)} ราคาขาย ${m(precio)} และต้นทุนผันแปร ${m(variable)} การขายแต่ละหน่วยเหลือเงิน ${m(precio - variable)}`,
      `ต้องขาย ${formatearNumero(ctx, base.unidades)} หน่วย (${m(base.facturacion)}) จึงจะคุ้มทุน และ ${formatearNumero(ctx, meta.unidades)} หน่วยเพื่อให้ได้กำไร ${m(objetivo)} ต่อเดือน`,
    ],
    faq: [
      {
        pregunta: "ต้นทุนคงที่กับต้นทุนผันแปรคืออะไร",
        respuesta: "ต้นทุนคงที่เท่าเดิมแม้ขายไม่ได้เลย เช่น ค่าเช่า เงินเดือนประจำ ค่าน้ำค่าไฟ ส่วนต้นทุนผันแปรเพิ่มขึ้นตามการขายแต่ละครั้ง เช่น สินค้า วัตถุดิบ ค่าคอมมิชชัน และค่าจัดส่ง",
      },
      {
        pregunta: "ลดจุดคุ้มทุนได้อย่างไร",
        respuesta: "มีสามทาง คือขึ้นราคาขาย ลดต้นทุนผันแปรต่อหน่วย หรือลดต้นทุนคงที่ โดยทั่วไปการปรับราคาขายให้ผลมากที่สุด",
      },
      {
        pregunta: "ใช้กับธุรกิจบริการได้ไหม",
        respuesta: "ได้ หนึ่งหน่วยอาจเป็นหนึ่งชั่วโมง หนึ่งครั้ง หรือลูกค้าหนึ่งรายต่อเดือน ให้ใช้ต้นทุนในการให้บริการแต่ละหน่วยเป็นต้นทุนผันแปร",
      },
    ],
    glosario: [
      { termino: "จุดคุ้มทุน", definicion: "ระดับยอดขายที่รายได้เท่ากับต้นทุนพอดี" },
      { termino: "กำไรส่วนเกิน", definicion: "เงินที่การขายแต่ละครั้งเหลือไว้จ่ายต้นทุนคงที่" },
    ],
  };
};
