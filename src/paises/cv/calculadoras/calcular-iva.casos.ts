import { definirCasos } from "@/motor/calculo";
import calcularIva from "./calcular-iva";

const CIVA = "https://boe.incv.cv/Bulletins/Download/1957";
const OE2026 = "https://boe.incv.cv/Bulletins/DownloadAct?id=89137";

export default definirCasos(calcularIva, [
  {
    nombre: "Acrescentar a taxa normal a 10 000$00",
    origen: { tipo: "recalculado", url: CIVA, detalle: "Artigo 17.º: 15 %. 10 000 × 15 % = 1 500. Total 11 500." },
    fecha: "2026-10-29",
    entrada: { valor: 10000, operacao: "sem-iva", taxa: "normal" },
    esperado: { base: 10000, iva: 1500, total: 11500, taxa: 15 },
  },
  {
    nombre: "Retirar a taxa normal de 11 500$00",
    origen: { tipo: "recalculado", url: CIVA, detalle: "11 500 / 1,15 = 10 000. IVA 1 500." },
    fecha: "2026-10-29",
    entrada: { valor: 11500, operacao: "com-iva", taxa: "normal" },
    esperado: { base: 10000, iva: 1500, total: 11500 },
  },
  {
    nombre: "Eletricidade a 8 %",
    origen: { tipo: "recalculado", url: OE2026, detalle: "Artigo 84.º: 8 %. 5 000 × 8 % = 400. Total 5 400." },
    fecha: "2026-10-29",
    entrada: { valor: 5000, operacao: "sem-iva", taxa: "eletricidade-agua" },
    esperado: { iva: 400, total: 5400, taxa: 8 },
  },
  {
    nombre: "Retirar 8 % de uma fatura de água de 5 400$00",
    origen: { tipo: "recalculado", url: OE2026, detalle: "5 400 / 1,08 = 5 000. IVA 400." },
    fecha: "2026-10-29",
    entrada: { valor: 5400, operacao: "com-iva", taxa: "eletricidade-agua" },
    esperado: { base: 5000, iva: 400 },
  },
]);
