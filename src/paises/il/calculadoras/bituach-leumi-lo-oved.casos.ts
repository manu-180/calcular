import { definirCasos } from "@/motor/calculo";
import calculadora from "./bituach-leumi-lo-oved";

const URL = "https://www.btl.gov.il/Insurance/Rates/Pages/%D7%9E%D7%99%20%D7%A9%D7%90%D7%99%D7%A0%D7%9D%20%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9D%20%D7%95%D7%91%D7%A2%D7%9C%D7%99%20%D7%94%D7%9B%D7%A0%D7%A1%D7%94%20%D7%A9%D7%9C%D7%90%20%D7%9E%D7%A2%D7%91%D7%95%D7%93%D7%94.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "Sin ingresos: pago mínimo",
    origen: { tipo: "oficial", url: URL, detalle: "143 de ביטוח לאומי y 123 de ביטוח בריאות: 266 por mes." },
    fecha: "2026-10-26",
    entrada: { hachnasa: 0 },
    esperado: { sach: 266, leumi: 143, briut: 123 },
  },
  {
    nombre: "Alquiler de 12.000 por mes",
    origen: {
      tipo: "oficial",
      url: URL,
      detalle: "Ejemplo del BTL: 12.000 menos 3.442 exentos = 8.558; 7.703 x 12,09% = 931,29 y 855 x 12,17% = 104,05; total 1.035 (1.035,34).",
    },
    fecha: "2026-10-26",
    entrada: { hachnasa: 12000 },
    esperado: { chayav: 8558, sach: 1035.34, leumi: 592.9 },
  },
  {
    nombre: "Ingreso bajo: queda en el mínimo",
    origen: { tipo: "recalculado", detalle: "4.000 - 3.442 = 558; 558 x 12,09% = 67,46 < 266: paga 266." },
    fecha: "2026-10-26",
    entrada: { hachnasa: 4000 },
    esperado: { sach: 266, chayav: 558 },
  },
  {
    nombre: "Ingreso sobre el máximo",
    origen: { tipo: "recalculado", detalle: "Base tope 51.910: 7.703 x 12,09% = 931,29; 44.207 x 12,17% = 5.379,99; total 6.311,28." },
    fecha: "2026-10-26",
    entrada: { hachnasa: 70000 },
    esperado: { chayav: 51910, sach: 6311.28 },
  },
]);
