import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-pay";

export default definirCasos(calculadora, [
  {
    nombre: "月給30万円、時間外20時間",
    origen: { tipo: "recalculado", detalle: "300,000÷160＝1,875円。1,875×1.25×20＝46,875円。" },
    fecha: "2026-10-17",
    entrada: { sueldo: 300000, horasMes: 160, extra: 20, feriado: 0, noche: 0 },
    esperado: { hora: 1875, pagoExtra: 46875, total: 46875, sobre60: 0 },
  },
  {
    nombre: "時間外70時間、休日8時間、深夜10時間",
    origen: {
      tipo: "recalculado",
      detalle: "単価1,875円。60時間×1.25＝140,625、10時間×1.50＝28,125で時間外168,750。休日 1,875×1.35×8＝20,250。深夜割増 1,875×0.25×10＝4,687.5。合計193,687.5→193,688。",
    },
    fecha: "2026-10-17",
    entrada: { sueldo: 300000, horasMes: 160, extra: 70, feriado: 8, noche: 10 },
    esperado: { pagoExtra: 168750, pagoFeriado: 20250, pagoNoche: 4688, total: 193688, sobre60: 10 },
  },
  {
    nombre: "月給0円",
    origen: { tipo: "recalculado", detalle: "0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { sueldo: 0, horasMes: 160, extra: 10, feriado: 0, noche: 0 },
    esperaError: true,
  },
]);
