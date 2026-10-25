import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-th.bono",
  slug: "half-year-bonus",
  campos: {
    sueldo: { etiqueta: "เงินเดือนก่อนหักต่อเดือน" },
    meses: { etiqueta: "จำนวนเดือนที่ทำงานในครึ่งปีนี้" },
    region: { etiqueta: "เขตที่ทำงาน" },
    regimen: { etiqueta: "ขนาดของบริษัท", opciones: { general: "บริษัทขนาดกลางหรือขนาดใหญ่", pequena: "บริษัทขนาดเล็ก" } },
  },
  filas: {
    base: { etiqueta: "เงินเดือนที่ใช้คำนวณ" },
    bono: { etiqueta: "โบนัส" },
    bonificacion: { etiqueta: "เงินเพิ่ม" },
    total: { etiqueta: "ยอดที่ได้รับทั้งหมด" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "จำนวนเดือนต้องอยู่ระหว่าง 1 ถึง 6",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "เงินเดือนต่ำกว่าค่าจ้างขั้นต่ำของเขตที่ทำงาน จึงคำนวณโบนัสจากค่าจ้างขั้นต่ำ",
  },
});
