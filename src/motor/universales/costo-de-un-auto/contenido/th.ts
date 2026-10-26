import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoTh: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "ไมล์" : "กิโลเมตร";
  return {
    h1: "คำนวณค่าใช้จ่ายในการมีรถ",
    title: tituloQueEntre(`คำนวณค่าใช้จ่ายในการมีรถใน${ctx.nombrePais}`, "คำนวณค่าใช้จ่ายในการมีรถต่อเดือน", "คำนวณค่าใช้จ่ายรถ"),
    description: `คำนวณต้นทุนจริงของรถต่อเดือน ต่อปี และต่อ${unidad} ทั้งค่าน้ำมัน ค่าประกัน ค่าบำรุงรักษา ค่าที่จอด และมูลค่ารถที่ลดลง`,
    intro: [
      "หลายคนรู้ว่าจ่ายค่าน้ำมันเดือนละเท่าไร แต่น้อยคนที่รวมค่าประกัน ค่าบำรุงรักษา ค่าที่จอด และที่สำคัญคือมูลค่ารถที่ลดลงทุกปี",
      "กรอกค่าใช้จ่ายแล้วระบบจะแสดงต้นทุนจริงของรถ ช่วยประกอบการตัดสินใจว่าจะซื้อ เปลี่ยนรถ หรือเดินทางด้วยวิธีอื่น",
    ],
    comoSeCalcula: [
      imperial
        ? "ค่าน้ำมันต่อเดือน = ไมล์ต่อเดือน ÷ ไมล์ต่อแกลลอน × ราคาน้ำมันต่อแกลลอน"
        : "ค่าน้ำมันต่อเดือน = กิโลเมตรต่อเดือน × ลิตรต่อ 100 กม. ÷ 100 × ราคาน้ำมันต่อลิตร",
      "มูลค่าที่ลดลงต่อเดือน = มูลค่ารถ × อัตราที่ลดลงต่อปี ÷ 12",
      "ต้นทุนจริง = ค่าน้ำมัน + ค่าประกัน + ค่าบำรุงรักษา + ค่าที่จอด + ค่าใช้จ่ายอื่น + มูลค่าที่ลดลง",
      `ต้นทุนต่อ${unidad} = ต้นทุนจริงต่อเดือน ÷ ระยะทางที่ขับในเดือนนั้น`,
    ],
    ejemplo: [
      `รถมูลค่า ${m(g.precio)} ที่ขับเดือนละ ${formatearNumero(ctx, g.distancia)} ${imperial ? "ไมล์" : "กม."} มีต้นทุน ${m(mensual)} ต่อเดือน เมื่อนับรวมมูลค่าที่ลดลง`,
      `คิดเป็น ${m(mensual * 12)} ต่อปี และ ${formatearMonto(ctx, mensual / g.distancia)} ต่อ${unidad}`,
    ],
    faq: [
      {
        pregunta: "ค่าเสื่อมราคารถคืออะไร",
        respuesta: "คือมูลค่าที่รถลดลงตามเวลาและการใช้งาน ไม่ได้จ่ายเป็นรายเดือน แต่จะเห็นชัดตอนขายรถ และมักเป็นต้นทุนก้อนใหญ่ที่สุดของรถใหม่",
      },
      {
        pregunta: "ทำไมไม่รวมค่างวดรถ",
        respuesta: "ค่างวดส่วนหนึ่งคือการจ่ายค่าตัวรถ ซึ่งนับไว้แล้วในมูลค่าที่ลดลง หากรวมทั้งสองอย่างจะนับค่ารถซ้ำ ส่วนดอกเบี้ยของสินเชื่อรถเป็นต้นทุนเพิ่มจากนี้",
      },
      {
        pregunta: "ลดค่าใช้จ่ายในการมีรถได้อย่างไร",
        respuesta: "เปรียบเทียบเบี้ยประกันทุกปี ดูแลลมยางและเข้าเช็กระยะตามกำหนด และไม่เปลี่ยนรถบ่อย เพราะช่วงปีแรก ๆ เป็นช่วงที่รถเสื่อมราคามากที่สุด",
      },
    ],
    glosario: [
      { termino: "ค่าเสื่อมราคา", definicion: "มูลค่าที่รถลดลงตามเวลาและการใช้งาน" },
      { termino: `ต้นทุนต่อ${unidad}`, definicion: `ค่าใช้จ่ายเฉลี่ยของการขับรถแต่ละ${unidad} โดยรวมค่าใช้จ่ายทุกอย่างแล้ว` },
    ],
  };
};
