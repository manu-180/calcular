import { definirCasos } from "@/motor/calculo";
import calculadora from "./tsalingiin-tootsooluur";

export default definirCasos(calculadora, [
  { nombre: "2 сая төгрөг", origen: { tipo: "recalculado", detalle: "НДШ 9.5% = 190,000; ЭМД 2% = 40,000. Сард 1,770,000, жилд 21,240,000. Татвар 2,124,000 − хөнгөлөлт 168,000 = 1,956,000; сард 163,000. Цэвэр 1,607,000." }, fecha: "2026-11-01", entrada: { bruto: 2000000 }, esperado: { tsever: 1607000, ndsh: 190000, emd: 40000, khkhoat: 163000, khongololt: 14000 } },
  { nombre: "Доод хэмжээ", origen: { tipo: "recalculado", detalle: "792,000 − НДШ 75,240 − ЭМД 15,840 = 700,920; жилд 8,411,040. Татвар 841,104 − 216,000 = 625,104; сард 52,092. Цэвэр 648,828." }, fecha: "2026-11-01", entrada: { bruto: 792000 }, esperado: { tsever: 648828, khkhoat: 52092 } },
  { nombre: "15 сая, дээд хэмжээтэй, 15% шатлалд", origen: { tipo: "recalculado", detalle: "Суурь 7,920,000; НДШ 752,400; ЭМД 300,000. Сард 13,947,600, жилд 167,371,200. Татвар 12,000,000 + 47,371,200 × 15% = 19,105,680; хөнгөлөлт 0; сард 1,592,140. Цэвэр 12,355,460." }, fecha: "2026-11-01", entrada: { bruto: 15000000 }, esperado: { tsever: 12355460, ndsh: 752400, khkhoat: 1592140 } },
  { nombre: "Тэг цалин", origen: { tipo: "recalculado", detalle: "Цалин оруулаагүй бол алдаа." }, fecha: "2026-11-01", entrada: { bruto: 0 }, esperaError: true },
]);
