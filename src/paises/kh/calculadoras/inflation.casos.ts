import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation";

const URL = "https://nis.gov.kh/wp-content/uploads/2026/10/CPI-12-group-Sep-2026.xls";

export default definirCasos(calculadora, [
  {
    nombre: "កញ្ញា 2025 ដល់ កញ្ញា 2026",
    origen: { tipo: "oficial", url: URL, detalle: "221.436 / 210.26 = 1.0532; តារាង NIS បង្ហាញ 5.3%" },
    fecha: "2026-10-30",
    entrada: { monto: 100000, desde: "2025-09-01", hasta: "2026-09-15" },
    esperado: { actual: 105315, inflacion: 5.3153 },
    tolerancia: 0.5,
  },
  {
    nombre: "សីហា 2025 ដល់ សីហា 2026",
    origen: { tipo: "oficial", url: "https://nis.gov.kh/wp-content/uploads/2026/09/CPI-12-group-Aug-2026-3.xls", detalle: "219.007 / 209.003 = 1.0479; តារាង NIS បង្ហាញ 4.8%" },
    fecha: "2026-10-30",
    entrada: { monto: 1000000, desde: "2025-08-01", hasta: "2026-08-01" },
    esperado: { actual: 1047865 },
    tolerancia: 2,
  },
]);
