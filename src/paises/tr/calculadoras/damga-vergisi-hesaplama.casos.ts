import { definirCasos } from "@/motor/calculo";
import damgaVergisiHesaplama from "./damga-vergisi-hesaplama";

const TABLO = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=MEVZUAT_TEBLIGLER%2FUNIVERSAL%2F2025%2F488_Tablo1_01102025.pdf";
const TEBLIG = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=MEVZUAT_TEBLIGLER%2FUNIVERSAL%2F2025%2F488_Teblig71.pdf";

export default definirCasos(damgaVergisiHesaplama, [
  {
    nombre: "1.000.000 TL sözleşme: binde 9,48",
    origen: { tipo: "recalculado", url: TABLO, detalle: "1.000.000 × binde 9,48 = 9.480." },
    fecha: "2026-10-24",
    entrada: { tur: "mukavele", tutar: 1000000, ay: null },
    esperado: { damga: 9480, matrah: 1000000, oranBinde: 9.48 },
  },
  {
    nombre: "Aylık 20.000 TL, 12 aylık kira sözleşmesi",
    origen: { tipo: "recalculado", url: TABLO, detalle: "Kira bedeli üzerinden binde 1,89: 240.000 × binde 1,89 = 453,60." },
    fecha: "2026-10-24",
    entrada: { tur: "kira", tutar: 20000, ay: 12 },
    esperado: { damga: 453.6, matrah: 240000 },
  },
  {
    nombre: "Ücret makbuzu: binde 7,59",
    origen: { tipo: "recalculado", url: TABLO, detalle: "50.000 × binde 7,59 = 379,50." },
    fecha: "2026-10-24",
    entrada: { tur: "ucret", tutar: 50000, ay: null },
    esperado: { damga: 379.5 },
  },
  {
    nombre: "Üst sınır: 2026 için 29.115.961,10 TL",
    origen: { tipo: "oficial", url: TEBLIG, detalle: "5.000.000.000 × binde 9,48 = 47.400.000 > üst sınır 29.115.961,10." },
    fecha: "2026-10-24",
    entrada: { tur: "mukavele", tutar: 5000000000, ay: null },
    esperado: { damga: 29115961.1 },
  },
]);
