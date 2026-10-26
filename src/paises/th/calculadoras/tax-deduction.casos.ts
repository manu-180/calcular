import { definirCasos } from "@/motor/calculo";
import calculadora from "./tax-deduction";

export default definirCasos(calculadora, [
  {
    nombre: "เงินได้ 1.2 ล้านบาท ซื้อ RMF 100,000 บาท",
    origen: {
      tipo: "recalculado",
      detalle:
        "ก่อน: 1,200,000−100,000−60,000−9,000 = 1,031,000 ภาษี 115,000+31,000×25% = 122,750 หลัง: 931,000 ภาษี 65,000+181,000×20% = 101,200 ประหยัด 21,550",
    },
    fecha: "2026-10-26",
    entrada: { ingreso: 1200000, sso: 9000, base: 0, vida: 0, salud: 0, pension: 0, rmf: 100000, vivienda: 0 },
    esperado: { impuestoAntes: 122750, impuestoDespues: 101200, ahorro: 21550, rmf: 100000 },
  },
  {
    nombre: "ประกันชีวิตและสุขภาพเกินเพดานรวม",
    origen: {
      tipo: "recalculado",
      detalle: "ประกันชีวิต 90,000 สุขภาพ 30,000 (เพดาน 25,000) รวม 115,000 เกินเพดานรวม 100,000 จึงลดหย่อนได้ 100,000",
    },
    fecha: "2026-10-26",
    entrada: { ingreso: 800000, sso: 9000, base: 0, vida: 90000, salud: 30000, pension: 0, rmf: 0, vivienda: 0 },
    esperado: { vidaYSalud: 100000, deducible: 100000 },
  },
  {
    nombre: "RMF เกินร้อยละ 30 ของเงินได้",
    origen: { tipo: "recalculado", detalle: "เงินได้ 500,000 RMF ได้ไม่เกิน 30% = 150,000" },
    fecha: "2026-10-26",
    entrada: { ingreso: 500000, sso: 9000, base: 0, vida: 0, salud: 0, pension: 0, rmf: 200000, vivienda: 0 },
    esperado: { rmf: 150000 },
  },
  {
    nombre: "ประกันบำนาญและ RMF เกินเพดานรวม 500,000",
    origen: {
      tipo: "recalculado",
      detalle: "เงินได้ 3,000,000 บำนาญได้ 200,000 (15% = 450,000 แต่เพดาน 200,000) RMF 400,000 รวม 600,000 เกิน 500,000 ตัด RMF เหลือ 300,000",
    },
    fecha: "2026-10-26",
    entrada: { ingreso: 3000000, sso: 9000, base: 0, vida: 0, salud: 0, pension: 250000, rmf: 400000, vivienda: 0 },
    esperado: { pension: 200000, rmf: 300000, deducible: 500000 },
  },
]);
