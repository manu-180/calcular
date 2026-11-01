import { definirCasos } from "@/motor/calculo";
import calculadora from "./ty-gia-usd-vnd";

export default definirCasos(calculadora, [
  {
    nombre: "100 đô la Mỹ",
    origen: { tipo: "recalculado", url: "https://sbv.gov.vn/t%E1%BB%B7-gi%C3%A1", detalle: "100 × 25.637 = 2.563.700." },
    fecha: "2026-11-01",
    entrada: { soTien: 100, chieu: "usd" },
    esperado: { dong: 2563700, tyGia: 25637 },
  },
  {
    nombre: "25.637.000 đồng",
    origen: { tipo: "recalculado", detalle: "25.637.000 / 25.637 = 1.000." },
    fecha: "2026-11-01",
    entrada: { soTien: 25637000, chieu: "vnd" },
    esperado: { usd: 1000 },
  },
]);
