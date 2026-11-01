import { definirCasos } from "@/motor/calculo";
import calcularIspc from "./calcular-ispc";

const BR = "https://www.at.gov.mz/api/webdav?path=%2FLEGISLA%C3%87%C3%83O%2FLEGISLA%C3%87%C3%83O%20FISCAL%2FLEI%2FBR_248_I_SERIE_SUPLEMENTO_2025.pdf";

export default definirCasos(calcularIspc, [
  {
    nombre: "Comércio com 800 000 MT por ano",
    origen: { tipo: "recalculado", url: BR, detalle: "Volume anual até 1 000 000: 3 %. Trimestre de 200 000: 6 000." },
    fecha: "2026-10-26",
    entrada: { actividade: "comercio", anual: 800000, trimestre: 200000, anteriores: 0 },
    esperado: { taxa: 3, pagar: 6000 },
  },
  {
    nombre: "Comércio com 2 000 000 MT por ano",
    origen: { tipo: "recalculado", url: BR, detalle: "Volume anual entre 1 e 2,5 milhões: 4 %. Trimestre de 500 000: 20 000." },
    fecha: "2026-10-26",
    entrada: { actividade: "comercio", anual: 2000000, trimestre: 500000, anteriores: 500000 },
    esperado: { taxa: 4, pagar: 20000 },
  },
  {
    nombre: "Serviços de mecânica",
    origen: { tipo: "recalculado", url: BR, detalle: "Taxa de 12 %: 300 000 × 12 % = 36 000." },
    fecha: "2026-10-26",
    entrada: { actividade: "servicos", anual: null, trimestre: 300000, anteriores: 0 },
    esperado: { taxa: 12, pagar: 36000 },
  },
  {
    nombre: "Vendas que passam o limite de 4 milhões",
    origen: { tipo: "recalculado", url: BR, detalle: "Anteriores 3 900 000 + trimestre 300 000 = 4 200 000. Excesso 200 000 × 20 % = 40 000; resto 100 000 × 5 % = 5 000. Total 45 000." },
    fecha: "2026-10-26",
    entrada: { actividade: "comercio", anual: 3000000, trimestre: 300000, anteriores: 3900000 },
    esperado: { excesso: 200000, normal: 100000, pagar: 45000 },
  },
  {
    nombre: "Imposto abaixo de 500 MT não se paga",
    origen: { tipo: "recalculado", url: BR, detalle: "12 000 × 3 % = 360, abaixo de 500 (artigo 10-A): nada a pagar." },
    fecha: "2026-10-26",
    entrada: { actividade: "comercio", anual: 50000, trimestre: 12000, anteriores: 0 },
    esperado: { imposto: 360, pagar: 0 },
  },
]);
