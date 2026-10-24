import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-raise";

export default definirCasos(calculadora, [
  {
    nombre: "أجر تأميني 12,000 جنيه",
    origen: { tipo: "recalculado", detalle: "3% × 12,000 = 360، أكبر من 250. المرتب 14,000 + 360 = 14,360." },
    fecha: "2026-10-24",
    entrada: { asegurable: 12000, salario: 14000 },
    esperado: { alza: 360, nuevoSalario: 14360 },
  },
  {
    nombre: "أجر تأميني 7,000 جنيه",
    origen: { tipo: "oficial", url: "https://mped.gov.eg/singlenews?id=6009", detalle: "3% × 7,000 = 210، أقل من الحد الأدنى 250 جنيهًا، فتكون العلاوة 250." },
    fecha: "2026-10-24",
    entrada: { asegurable: 7000, salario: null },
    esperado: { alza: 250, porTasa: 210 },
  },
]);
