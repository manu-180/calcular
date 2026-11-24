import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-tax";

const GDT = "https://www.tax.gov.kh/kh/article?key=PaLNfxjn4349583040";

export default definirCasos(calculadora, [
  {
    nombre: "ឧទាហរណ៍ GDT: នៅលីវ 2,500,000 រៀល",
    origen: { tipo: "oficial", url: GDT, detalle: "(2,500,000 x 10%) - 175,000 = 75,000" },
    fecha: "2026-10-01",
    entrada: { salario: 2500000, residencia: "residente", conyuge: false, hijos: 0 },
    esperado: { impuesto: 75000, base: 2500000 },
  },
  {
    nombre: "ឧទាហរណ៍ GDT: សហព័ទ្ធ និងកូន 3 នាក់",
    origen: { tipo: "oficial", url: GDT, detalle: "2,500,000 - 600,000 = 1,900,000; (1,900,000 x 5%) - 75,000 = 20,000" },
    fecha: "2026-10-01",
    entrada: { salario: 2500000, residencia: "residente", conyuge: true, hijos: 3 },
    esperado: { impuesto: 20000, base: 1900000, rebaja: 600000 },
  },
  {
    nombre: "អនិវាសនជន 20%",
    origen: { tipo: "recalculado", detalle: "2,500,000 x 20% = 500,000" },
    fecha: "2026-10-01",
    entrada: { salario: 2500000, residencia: "no-residente", conyuge: null, hijos: null },
    esperado: { impuesto: 500000 },
  },
  {
    nombre: "កម្រិតខ្ពស់បំផុត",
    origen: { tipo: "recalculado", detalle: "(15,000,000 x 20%) - 1,225,000 = 1,775,000" },
    fecha: "2026-10-01",
    entrada: { salario: 15000000, residencia: "residente", conyuge: false, hijos: 0 },
    esperado: { impuesto: 1775000, tasa: 20 },
  },
  {
    nombre: "ក្រោមកម្រិតជាប់ពន្ធ",
    origen: { tipo: "recalculado", detalle: "1,500,000 ស្ថិតក្នុងកម្រិត 0%" },
    fecha: "2026-10-01",
    entrada: { salario: 1500000, residencia: "residente", conyuge: false, hijos: 0 },
    esperado: { impuesto: 0 },
  },
]);
