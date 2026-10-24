import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const NIRDESHIKA = "https://nbr.gov.bd/uploads/news-scroller/Aykor_Nirdashikha_2026-2027_BG_Press_Modify_Copy.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Nirdeshika 2026-27, ejemplo ক (Mahbuba Akter, empleada privada)",
    origen: {
      tipo: "oficial",
      url: NIRDESHIKA,
      detalle: "Páginas 90 a 92: ingreso total 11,62,000; mujer (umbral 4,50,000); impuesto 92,400; inversión 3,10,000; rebaja la menor de 34,860, 31,000 y 7,50,000 = 31,000; queda 61,400; menos 11,000 + 36,000 de retención = 14,400.",
    },
    fecha: "2026-10-24",
    entrada: { ingreso: 1162000, categoria: "women-senior", hijos: 0, inversion: 310000, retenido: 47000, nuevo: false, momento: "oct-dec" },
    esperado: { bruto: 92400, rebaja: 31000, impuesto: 61400, conRetenido: 14400, ajuste: 0, aPagar: 14400, marginal: 20 },
  },
  {
    nombre: "Nirdeshika 2026-27, ejemplo ১৮ (Parisha Ahmed, empleada pública)",
    origen: {
      tipo: "oficial",
      url: NIRDESHIKA,
      detalle: "Páginas 61 y 62: ingreso 9,80,000; mujer; impuesto 64,500; inversión 3,17,000; rebaja 29,400 (3 % del ingreso); queda 35,100; menos 5,000 + 1,400 de retención = 28,700.",
    },
    fecha: "2026-10-24",
    entrada: { ingreso: 980000, categoria: "women-senior", hijos: 0, inversion: 317000, retenido: 6400, nuevo: false, momento: "oct-dec" },
    esperado: { bruto: 64500, rebaja: 29400, impuesto: 35100, aPagar: 28700 },
  },
  {
    nombre: "Hombre con 9 lakh, sin inversión, presentado en septiembre",
    origen: { tipo: "recalculado", detalle: "9,00,000: 3,00,000 × 10 % + 2,00,000 × 15 % = 60,000. Presentado del 1/7 al 30/9: incentivo de 5 % = 3,000 (tope 25,000). A pagar 57,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 900000, categoria: "general", hijos: 0, inversion: 0, retenido: 0, nuevo: false, momento: "jul-sep" },
    esperado: { impuesto: 60000, ajuste: -3000, aPagar: 57000, umbral: 400000 },
  },
  {
    nombre: "Impuesto menor que el mínimo",
    origen: { tipo: "recalculado", detalle: "4,20,000 con umbral 4,00,000: 20,000 × 10 % = 2,000, menos que el mínimo de 5,000. Presentado en febrero: 2 % de 5,000 = 100, mínimo 3,000 de recargo." },
    fecha: "2026-10-24",
    entrada: { ingreso: 420000, categoria: "general", hijos: 0, inversion: 0, retenido: 0, nuevo: false, momento: "jan-mar" },
    esperado: { bruto: 2000, impuesto: 5000, ajuste: 3000, aPagar: 8000 },
  },
  {
    nombre: "Contribuyente nuevo con hijo con discapacidad",
    origen: { tipo: "recalculado", detalle: "Umbral 4,00,000 + 50,000 = 4,50,000. Ingreso 4,60,000: 10,000 × 10 % = 1,000, igual al mínimo de 1,000 de un contribuyente nuevo." },
    fecha: "2026-10-24",
    entrada: { ingreso: 460000, categoria: "general", hijos: 1, inversion: 0, retenido: 0, nuevo: true, momento: "oct-dec" },
    esperado: { umbral: 450000, bruto: 1000, impuesto: 1000 },
  },
  {
    nombre: "Ingreso bajo el umbral",
    origen: { tipo: "recalculado", detalle: "3,90,000 con umbral 4,00,000: sin impuesto ni mínimo." },
    fecha: "2026-10-24",
    entrada: { ingreso: 390000, categoria: "general", hijos: 0, inversion: 0, retenido: 0, nuevo: false, momento: "apr-jun" },
    esperado: { impuesto: 0, aPagar: 0 },
  },
  {
    nombre: "Ingreso alto en el último tramo",
    origen: { tipo: "recalculado", detalle: "50,00,000: 30,000 + 60,000 + 1,00,000 + 5,00,000 + 14,00,000 × 30 % = 11,10,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 5000000, categoria: "general", hijos: 0, inversion: 0, retenido: 0, nuevo: false, momento: "oct-dec" },
    esperado: { impuesto: 1110000, marginal: 30 },
  },
]);
