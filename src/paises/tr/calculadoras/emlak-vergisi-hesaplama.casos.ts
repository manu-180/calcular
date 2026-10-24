import { definirCasos } from "@/motor/calculo";
import emlakVergisiHesaplama from "./emlak-vergisi-hesaplama";

const REHBER = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fonceki-dokumanlar%2Femlak_ver_rehber_2025.pdf";

export default definirCasos(emlakVergisiHesaplama, [
  {
    nombre: "Büyükşehirde konut, 2.000.000 TL",
    origen: { tipo: "recalculado", url: REHBER, detalle: "Mesken binde 1, büyükşehirde %100 artırımlı binde 2: 4.000 TL, iki taksit 2.000 TL." },
    fecha: "2026-10-24",
    entrada: { deger: 2000000, tur: "mesken", buyuksehir: true, hisse: 100 },
    esperado: { yillik: 4000, taksit: 2000, oranBinde: 2 },
  },
  {
    nombre: "Büyükşehir dışında arsa, yarı hisse",
    origen: { tipo: "recalculado", url: REHBER, detalle: "Arsa binde 3: 1.000.000 × binde 3 = 3.000; %50 hisse 1.500." },
    fecha: "2026-10-24",
    entrada: { deger: 1000000, tur: "arsa", buyuksehir: false, hisse: 50 },
    esperado: { yillik: 1500, oranBinde: 3 },
  },
  {
    nombre: "Büyükşehirde işyeri",
    origen: { tipo: "recalculado", url: REHBER, detalle: "Diğer binalar binde 2, büyükşehirde binde 4: 5.000.000 × binde 4 = 20.000." },
    fecha: "2026-10-24",
    entrada: { deger: 5000000, tur: "diger-bina", buyuksehir: true, hisse: 100 },
    esperado: { yillik: 20000, oranBinde: 4 },
  },
]);
