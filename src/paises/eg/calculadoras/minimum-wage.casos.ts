import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "القطاع الخاص",
    origen: { tipo: "oficial", url: "https://mped.gov.eg/singlenews?id=6009", detalle: "المجلس القومي للأجور: 7000 جنيه للقطاع الخاص اعتبارًا من 1 مارس 2025." },
    fecha: "2026-10-24",
    entrada: { sector: "privado", horas: null, salario: 6500 },
    esperado: { minimo: 7000, anual: 84000, diferencia: -500 },
  },
  {
    nombre: "العاملون بالدولة بعد يوليو 2026",
    origen: { tipo: "recalculado", detalle: "الحد الأدنى للدخل للعاملين بالدولة 8000 جنيه منذ مرتبات يوليو 2026." },
    fecha: "2026-10-24",
    entrada: { sector: "publico", horas: null, salario: null },
    esperado: { minimo: 8000 },
  },
  {
    nombre: "العمل لبعض الوقت: 100 ساعة",
    origen: { tipo: "recalculado", detalle: "28 جنيهًا صافيًا في الساعة × 100 ساعة = 2,800." },
    fecha: "2026-10-24",
    entrada: { sector: "parcial", horas: 100, salario: 3000 },
    esperado: { minimo: 2800, porHora: 28, diferencia: 200 },
  },
]);
