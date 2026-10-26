import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "eg.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

function nombreMes(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

export default definirCalculadora({
  id: "eg.inflation-calculator",
  mercado: "eg",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: { "eg.cpi": "serie" },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "المبلغ", min: 0, porDefecto: 10000 },
    { id: "desde", tipo: "fecha", etiqueta: "شهر المبلغ الأصلي", porDefecto: "2024-09-01", ayuda: "اليوم لا يهم، نأخذ الشهر فقط. البيانات تبدأ من أغسطس 2024." },
  ],
  calcular(e, v, { redondear }) {
    const ultimo = v["eg.cpi"];
    const porFecha = new Map<string, number>(IPC.filter(([f]) => f <= ultimo.fecha));
    const inicio = `${e.desde.slice(0, 7)}-01`;
    const base = porFecha.get(inicio);
    if (base === undefined) throw new ErrorEntrada(`اختر شهرًا بين أغسطس 2024 و${nombreMes(ultimo.fecha)}.`, "desde");
    const factor = ultimo.valor / base;
    return {
      actualizado: redondear(e.importe * factor),
      diferencia: redondear(e.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      indiceInicial: base,
      indiceFinal: ultimo.valor,
      periodo: `من ${nombreMes(inicio)} إلى ${nombreMes(ultimo.fecha)}`,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "المبلغ بأسعار اليوم", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "الزيادة بسبب التضخم", formato: "moneda" },
    { clave: "acumulada", etiqueta: "التضخم المتراكم في الفترة", formato: "porcentaje", decimales: 1 },
    { clave: "indiceInicial", etiqueta: "الرقم القياسي في الشهر الأول", formato: "numero", decimales: 1 },
    { clave: "indiceFinal", etiqueta: "آخر رقم قياسي منشور", formato: "numero", decimales: 1 },
    { clave: "periodo", etiqueta: "الفترة", formato: "texto" },
  ],
});
