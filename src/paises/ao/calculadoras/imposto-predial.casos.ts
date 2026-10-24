import { definirCasos } from "@/motor/calculo";
import impostoPredial from "./imposto-predial";

const AGT = "https://portaldocontribuinte.minfin.gov.ao/impostos-e-taxas/imposto-predial-urbano";

export default definirCasos(impostoPredial, [
  {
    nombre: "Casa de 4 milhões",
    origen: { tipo: "recalculado", url: AGT, detalle: "Linha 1 do quadro: 4 000 000 × 0,1 % = 4 000." },
    fecha: "2026-10-24",
    entrada: { tipo: "urbano", valor: 4000000, desocupado: false },
    esperado: { total: 4000 },
  },
  {
    nombre: "Entre 5 e 6 milhões: valor fixo",
    origen: { tipo: "recalculado", url: AGT, detalle: "Linha 2 do quadro: 5 000 Kz fixos." },
    fecha: "2026-10-24",
    entrada: { tipo: "urbano", valor: 5500000, desocupado: false },
    esperado: { total: 5000 },
  },
  {
    nombre: "Apartamento de 20 milhões",
    origen: { tipo: "recalculado", url: AGT, detalle: "Linha 3: 0,5 % sobre o excesso de 5 000 000. (20 000 000 − 5 000 000) × 0,5 % = 75 000." },
    fecha: "2026-10-24",
    entrada: { tipo: "urbano", valor: 20000000, desocupado: false },
    esperado: { imposto: 75000, total: 75000 },
  },
  {
    nombre: "Desocupado há mais de um ano",
    origen: { tipo: "recalculado", url: AGT, detalle: "Tributação adicional de 50 %: 75 000 + 37 500 = 112 500." },
    fecha: "2026-10-24",
    entrada: { tipo: "urbano", valor: 20000000, desocupado: true },
    esperado: { agravamento: 37500, total: 112500 },
  },
  {
    nombre: "Terreno para construção",
    origen: { tipo: "recalculado", url: AGT, detalle: "10 000 000 × 0,6 % = 60 000." },
    fecha: "2026-10-24",
    entrada: { tipo: "terreno", valor: 10000000, desocupado: false },
    esperado: { total: 60000 },
  },
]);
