import { definirCasos } from "@/motor/calculo";
import calculadora from "./medical-expense-deduction";

export default definirCasos(calculadora, [
  {
    nombre: "医療費30万円、総所得350万円",
    origen: { tipo: "recalculado", detalle: "300,000−0−100,000＝200,000。所得税 200,000×10%×102.1%＝20,420、住民税 200,000×10%＝20,000。" },
    fecha: "2026-10-17",
    entrada: { gastos: 300000, reintegro: 0, ingresos: 3500000, kazei: 2000000 },
    esperado: { umbral: 100000, deduccion: 200000, tasa: 10, renta: 20420, residente: 20000, total: 40420 },
  },
  {
    nombre: "総所得150万円（5％基準）",
    origen: { tipo: "recalculado", detalle: "総所得金額等200万円未満なので差し引く額は1,500,000×5%＝75,000。120,000−20,000−75,000＝25,000。所得税 25,000×5%×102.1%＝1,276。" },
    fecha: "2026-10-17",
    entrada: { gastos: 120000, reintegro: 20000, ingresos: 1500000, kazei: 500000 },
    esperado: { umbral: 75000, deduccion: 25000, renta: 1276, residente: 2500 },
  },
  {
    nombre: "上限200万円",
    origen: { tipo: "recalculado", detalle: "3,000,000−100,000＝2,900,000は上限を超えるので2,000,000。所得税 2,000,000×33%×102.1%＝673,860。" },
    fecha: "2026-10-17",
    entrada: { gastos: 3000000, reintegro: 0, ingresos: 12000000, kazei: 10000000 },
    esperado: { deduccion: 2000000, tasa: 33, renta: 673860, residente: 200000 },
  },
  {
    nombre: "10万円以下",
    origen: { tipo: "recalculado", detalle: "80,000−100,000はマイナスなので控除は0。" },
    fecha: "2026-10-17",
    entrada: { gastos: 80000, reintegro: 0, ingresos: 3500000, kazei: 2000000 },
    esperado: { deduccion: 0, total: 0 },
  },
]);
