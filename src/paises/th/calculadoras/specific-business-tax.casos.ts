import { definirCasos } from "@/motor/calculo";
import calculadora from "./specific-business-tax";

export default definirCasos(calculadora, [
  {
    nombre: "ขายภายใน 5 ปี ไม่มีชื่อในทะเบียนบ้าน",
    origen: { tipo: "recalculado", detalle: "ฐาน 3,000,000 (สูงกว่าราคาประเมิน) ภาษีธุรกิจเฉพาะ 3% = 90,000 ภาษีท้องถิ่น 10% = 9,000 รวม 99,000" },
    fecha: "2026-10-26",
    entrada: { precio: 3000000, tasacion: 2500000, cincoAnios: true, padron: false },
    esperado: { sbt: 90000, local: 9000, sello: 0, total: 99000 },
  },
  {
    nombre: "ถือครองเกิน 5 ปี เสียอากรแสตมป์",
    origen: { tipo: "recalculado", detalle: "ฐาน 3,000,000 อากร 1 บาทต่อ 200 บาท = 15,000" },
    fecha: "2026-10-26",
    entrada: { precio: 3000000, tasacion: 2500000, cincoAnios: false, padron: false },
    esperado: { sbt: 0, sello: 15000, total: 15000 },
  },
  {
    nombre: "ขายภายใน 5 ปี แต่มีชื่อในทะเบียนบ้านครบ 1 ปี",
    origen: { tipo: "recalculado", detalle: "ได้รับยกเว้นภาษีธุรกิจเฉพาะ เสียอากรจากราคาประเมิน 2,000,100 ที่สูงกว่า 2,000,100÷200 = 10,000.5 ปัดเป็น 10,001" },
    fecha: "2026-10-26",
    entrada: { precio: 1800000, tasacion: 2000100, cincoAnios: true, padron: true },
    esperado: { sbt: 0, sello: 10001, base: 2000100 },
  },
]);
