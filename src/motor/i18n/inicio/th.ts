import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.th;

// Tailandés (ADR 0002, D13): cortés y neutro, sin pronombre ni ครับ/ค่ะ, sin punto final.
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `กำลังใช้งานจาก${pais}`,
    resumen: (calculadoras) => `${calculadoras} พร้อมค่าทางการที่มีผลบังคับ`,
    ultimoDato: "ข้อมูลล่าสุดที่โหลด",
    ir: (pais) => `ไปที่${g.nombre(pais)}`,
    otro: "เลือกประเทศอื่น",
    argentina: "เครื่องคำนวณพร้อมข้อมูลทางการของอาร์เจนตินาอยู่ที่ calcular.ar",
    argentinaIr: "ไปที่ calcular.ar",
    neutroTitulo: (paises) => `${paises} ประเทศ แต่ละประเทศมีกฎหมายและสกุลเงินของตัวเอง`,
    neutroTexto: "เราตรวจสอบแหล่งข้อมูลทางการทุกวัน",
    neutroIr: "ดูประเทศ",
  },
  selector: {
    buscar: "ค้นหาประเทศ",
    sinResultados: (q) => `ไม่พบประเทศที่ตรงกับ “${q}”`,
    ubicacion: "ตำแหน่งปัจจุบัน",
    mismaCalculadora: "เครื่องคำนวณเดียวกัน",
    paises: "ประเทศ",
  },
  aviso: { mismaCalculadora: (pais) => `คำนวณด้วยข้อมูล${g.de(pais)}` },
  vivo: {
    titulo: "ข้อมูลทางการ อัปเดตอัตโนมัติ",
    vigilado: "ระบบอัตโนมัติตรวจสอบแหล่งข้อมูลทางการทุกวัน การเปลี่ยนแปลงกฎเกณฑ์จะมีผลหลังจากที่เราตรวจสอบแล้ว",
    sinVigilar: "ทุกค่ามีแหล่งที่มาทางการและวันที่ที่เราตรวจสอบ",
    verificado: "ตรวจสอบกฎเกณฑ์ครั้งล่าสุด",
    automatico: "ตัวเลขอัตโนมัติล่าสุด",
    fuentes: "แหล่งข้อมูลทางการ",
    nFuentes: (n) => `เอกสารทางการ ${n} ฉบับ`,
    verFuentes: "ดูแหล่งที่มา",
    verNovedades: "ดูอัปเดต",
    hoy: "วันนี้",
    ayer: "เมื่อวาน",
    elDia: (fecha) => `เมื่อ ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie} ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `ตรวจสอบข้อมูลกับแหล่งทางการเมื่อ ${fecha}`,
    serie: (serie, cuando, organismo) => `${serie}: อัปเดต${cuando} ด้วยตัวเลขล่าสุดจาก${organismo}`,
    diario: "เราตรวจสอบแหล่งข้อมูลทางการโดยอัตโนมัติทุกวัน",
    actualizado: "อัปเดตแล้ว",
  },
  novedades: {
    pildora: "อัปเดตข้อมูล",
    titulo: (pais) => `ข้อมูลทางการ${g.de(pais)}ที่เปลี่ยนไป`,
    acento: "ในวันที่เปลี่ยน",
    bajada: "ทุกตัวเลขใหม่ที่เข้าสู่เครื่องคำนวณจะบันทึกไว้ที่นี่ ทั้งสิ่งที่เปลี่ยน วันที่มีผล และแหล่งที่มา",
    ultimoCambio: "การเปลี่ยนแปลงล่าสุด",
    revision: "การตรวจสอบแหล่งที่มา",
    diaria: "ทุกวัน",
    porNorma: "ทุกครั้งที่มีประกาศใหม่",
    siguiendo: "แหล่งข้อมูลที่ติดตาม",
    masOrganismos: (n) => `และอีก ${n} แห่ง`,
    proximos: "ประกาศแล้ว มีผลเร็ว ๆ นี้",
    proximosTexto: "ค่าทางการที่โหลดไว้แล้วและจะมีผลในอีกไม่กี่วัน",
    registro: "บันทึกการเปลี่ยนแปลง",
    rss: "ติดตามผ่าน RSS",
    vacio: "ยังไม่มีการเปลี่ยนแปลงที่บันทึกไว้สำหรับประเทศนี้",
    etiqueta: { editorial: "กฎเกณฑ์", dato: "ตัวเลขใหม่", proximo: "เร็ว ๆ นี้", serie: "อัตโนมัติ", revision: "ตรวจสอบ" },
    rige: (fecha) => `มีผลตั้งแต่ ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `มีผลตั้งแต่ ${desde} ถึง ${hasta}`,
    antes: (valor, fecha) => `ก่อนหน้า: ${valor} (${fecha})`,
    revisados: (n) => `ตรวจสอบตัวเลข ${n} รายการกับแหล่งทางการแล้ว`,
    revisadosTexto: (organismos) => `ยืนยันค่าที่มีผลบังคับกับ${organismos}แล้ว`,
    verDatos: (n) => (n === 1 ? "ดูตัวเลข" : `ดูตัวเลขทั้ง ${n} รายการ`),
    calculadoras: "ใช้ใน",
    rango: (min, max, zonas) => `ตั้งแต่ ${min} ถึง ${max} ตามพื้นที่ (${zonas} พื้นที่)`,
    tabla: (filas) => `ตาราง ${filas} ขั้น`,
    valores: (n) => `${n} ค่า`,
    pasosTitulo: "ข้อมูลอัปเดตอยู่เสมอได้อย่างไร",
    pasos: [
      { titulo: "หน่วยงานประกาศ", texto: "กฎระเบียบ ดัชนี หรืออัตราแลกเปลี่ยนเผยแพร่ในแหล่งทางการ" },
      { titulo: "ตรวจสอบก่อนใช้", texto: "ดัชนีและอัตราแลกเปลี่ยนเข้ามาโดยอัตโนมัติพร้อมการตรวจช่วงค่า ส่วนกฎเกณฑ์จะโหลดโดยอ้างอิงเอกสารทางการ" },
      { titulo: "เครื่องคำนวณอัปเดต", texto: "เครื่องคำนวณเปลี่ยนไปใช้ตัวเลขใหม่ และบันทึกการเปลี่ยนแปลงไว้ที่นี่พร้อมแหล่งที่มา" },
    ],
    feedTitulo: (pais) => `อัปเดตข้อมูล${g.de(pais)}บน CalcularYa`,
    feedSubtitulo: (pais) => `การเปลี่ยนแปลงข้อมูลทางการที่เครื่องคำนวณ${g.para(pais)}ใช้ พร้อมวันที่มีผลและแหล่งที่มา`,
  },
};

export const th: Diccionario<TextosInicio> = { base };
