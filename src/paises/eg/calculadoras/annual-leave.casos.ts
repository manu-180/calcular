import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

const LEY = "https://www.labour.gov.eg/media/0iedik3q/%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86-%D8%B1%D9%82%D9%85-14-%D9%84%D8%B3%D9%86%D8%A9-2025-%D8%A8%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D9%82%D8%A7%D9%86%D9%88%D9%86-%D8%A7%D9%84%D8%B9%D9%85%D9%84.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "سنتان خدمة",
    origen: { tipo: "oficial", url: LEY, detalle: "المادة 124: واحد وعشرون يومًا اعتبارًا من السنة الثانية." },
    fecha: "2026-10-24",
    entrada: { meses: 24, edad: 30, discapacidad: false, peligroso: false, salario: null, pendientes: null },
    esperado: { total: 21 },
  },
  {
    nombre: "ثمانية أشهر في السنة الأولى",
    origen: { tipo: "recalculado", detalle: "15 يومًا × 8 ÷ 12 = 10 أيام." },
    fecha: "2026-10-24",
    entrada: { meses: 8, edad: 25, discapacidad: false, peligroso: false, salario: null, pendientes: null },
    esperado: { total: 10 },
  },
  {
    nombre: "سن 52 وعمل خطر",
    origen: { tipo: "recalculado", detalle: "ثلاثون يومًا لمن تجاوز الخمسين، وسبعة أيام زيادة للعمل الخطر: 37 يومًا." },
    fecha: "2026-10-24",
    entrada: { meses: 36, edad: 52, discapacidad: false, peligroso: true, salario: null, pendientes: null },
    esperado: { total: 37, extra: 7 },
  },
  {
    nombre: "أربعة أشهر فقط",
    origen: { tipo: "oficial", url: LEY, detalle: "المادة 124: يشترط أن يكون قد أمضى ستة أشهر على الأقل." },
    fecha: "2026-10-24",
    entrada: { meses: 4, edad: 25, discapacidad: false, peligroso: false, salario: null, pendientes: null },
    esperado: { total: 0 },
  },
  {
    nombre: "مقابل رصيد عشرة أيام",
    origen: { tipo: "recalculado", detalle: "أجر 9,000 ÷ 30 = 300 في اليوم × 10 أيام = 3,000." },
    fecha: "2026-10-24",
    entrada: { meses: 60, edad: 40, discapacidad: true, peligroso: false, salario: 9000, pendientes: 10 },
    esperado: { total: 45, valorPendiente: 3000 },
  },
]);
