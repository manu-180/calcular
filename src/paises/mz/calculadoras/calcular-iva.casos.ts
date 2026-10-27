import { definirCasos } from "@/motor/calculo";
import calcularIva from "./calcular-iva";

const BR = "https://www.at.gov.mz/api/webdav?path=%2FLEGISLA%C3%87%C3%83O%2FLEGISLA%C3%87%C3%83O%20FISCAL%2FLEI%2FBR_248_I_SERIE_SUPLEMENTO_2025.pdf";

export default definirCasos(calcularIva, [
  {
    nombre: "Somar 16 % a 10 000 MT",
    origen: { tipo: "recalculado", url: BR, detalle: "10 000 × 16 % = 1 600. Com IVA: 11 600." },
    fecha: "2026-10-26",
    entrada: { operacao: "somar", valor: 10000 },
    esperado: { iva: 1600, comIva: 11600 },
  },
  {
    nombre: "Retirar o IVA de 5 800 MT (artigo 34)",
    origen: { tipo: "recalculado", url: BR, detalle: "5 800 / 116 × 100 = 5 000. IVA 800." },
    fecha: "2026-10-26",
    entrada: { operacao: "retirar", valor: 5800 },
    esperado: { semIva: 5000, iva: 800 },
  },
  {
    nombre: "Retirar o IVA com centavos",
    origen: { tipo: "recalculado", url: BR, detalle: "1 000 / 116 × 100 = 862,07. IVA 137,93." },
    fecha: "2026-10-26",
    entrada: { operacao: "retirar", valor: 1000 },
    esperado: { semIva: 862.07, iva: 137.93 },
  },
]);
