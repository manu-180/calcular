import { definirCasos } from "@/motor/calculo";
import simuladorImt from "./simulador-imt";

const CIMT = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cimt/Pages/cimt17.aspx";
const TGIS = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/selo/Pages/ccod-selo-tabgiselo.aspx";

export default definirCasos(simuladorImt, [
  {
    nombre: "Habitação própria e permanente de 200 000 €",
    origen: {
      tipo: "recalculado",
      url: CIMT,
      detalle: "Taxa média a 198 347 € = 1,7274 % → 3426,33; excedente 1653 × 7 % = 115,71. IMT 3542,04. Selo 0,8 % = 1600.",
    },
    fecha: "2026-10-14",
    entrada: { valor: 200000, finalidade: "hpp", credito: null },
    esperado: { imt: 3542.04, seloCompra: 1600, total: 5142.04 },
  },
  {
    nombre: "Habitação própria até ao 1.º escalão: isenta",
    origen: { tipo: "recalculado", url: CIMT, detalle: "Até 106 346 € a taxa é 0." },
    fecha: "2026-10-14",
    entrada: { valor: 106346, finalidade: "hpp", credito: null },
    esperado: { imt: 0 },
  },
  {
    nombre: "Habitação própria de 700 000 €: taxa única de 6 %",
    origen: { tipo: "recalculado", url: CIMT, detalle: "Entre 660 982 € e 1 150 853 €: 6 % sobre tudo = 42 000. Selo 5600." },
    fecha: "2026-10-14",
    entrada: { valor: 700000, finalidade: "hpp", credito: null },
    esperado: { imt: 42000, seloCompra: 5600 },
  },
  {
    nombre: "Acima de 1 150 853 €: 7,5 %",
    origen: { tipo: "recalculado", url: CIMT, detalle: "1 200 000 × 7,5 % = 90 000." },
    fecha: "2026-10-14",
    entrada: { valor: 1200000, finalidade: "hpp", credito: null },
    esperado: { imt: 90000 },
  },
  {
    nombre: "IMT Jovem: 400 000 €",
    origen: { tipo: "recalculado", url: CIMT, detalle: "Artigo 17.º, n.º 1, alínea b): 0 até 330 539 €; 8 % sobre 69 461 = 5556,88." },
    fecha: "2026-10-14",
    entrada: { valor: 400000, finalidade: "jovem", credito: null },
    esperado: { imt: 5556.88, seloCompra: 3200 },
  },
  {
    nombre: "IMT Jovem: 300 000 € isento",
    origen: { tipo: "recalculado", url: CIMT, detalle: "Abaixo de 330 539 €: isento (artigo 9.º, n.º 2)." },
    fecha: "2026-10-14",
    entrada: { valor: 300000, finalidade: "jovem", credito: null },
    esperado: { imt: 0 },
  },
  {
    nombre: "Habitação secundária de 150 000 € com crédito",
    origen: {
      tipo: "recalculado",
      url: TGIS,
      detalle: "106 346 × 1 % + 39 124 × 2 % + 4530 × 5 % = 1063,46 + 782,48 + 226,50 = 2072,44. Selo do crédito 120 000 × 0,6 % = 720.",
    },
    fecha: "2026-10-14",
    entrada: { valor: 150000, finalidade: "secundaria", credito: 120000 },
    esperado: { imt: 2072.44, seloCompra: 1200, seloCredito: 720, total: 3992.44 },
  },
  {
    nombre: "Loja de 100 000 €",
    origen: { tipo: "recalculado", url: CIMT, detalle: "Outros prédios urbanos: 6,5 % = 6500." },
    fecha: "2026-10-14",
    entrada: { valor: 100000, finalidade: "urbano", credito: null },
    esperado: { imt: 6500 },
  },
  {
    nombre: "Terreno rústico de 50 000 €",
    origen: { tipo: "recalculado", url: CIMT, detalle: "Prédios rústicos: 5 % = 2500." },
    fecha: "2026-10-14",
    entrada: { valor: 50000, finalidade: "rustico", credito: null },
    esperado: { imt: 2500 },
  },
]);
