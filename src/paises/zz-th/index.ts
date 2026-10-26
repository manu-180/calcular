import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en tailandés (sin espacios entre palabras, fechas en พ.ศ., sin plural, sin
// pronombre ni ครับ/ค่ะ): ejercita el idioma sin publicar un país (ADR 0002, D13). La locale th-001 no
// choca con el hreflang de Tailandia cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "เซตาแลนด์เป็นประเทศสำหรับทดสอบ ตัวเลขทั้งหมดใช้ทดสอบเครื่องคำนวณเท่านั้นและไม่ใช่ข้อมูลจริง" },
  },
  datos: {
    "zz.minimo": { nombre: "ค่าจ้างขั้นต่ำรายเขต" },
    "zz.bonificacion": { nombre: "เงินเพิ่มของโบนัส" },
  },
});
