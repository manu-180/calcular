import { definirCasos } from "@/motor/calculo";
import gelirVergisiHesaplama from "./gelir-vergisi-hesaplama";

const TARIFE = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-tarifeleri%2Fgelir-vergisi-tarifesi-2026.pdf";

export default definirCasos(gelirVergisiHesaplama, [
  {
    nombre: "190.000 TL: 28.500 TL",
    origen: { tipo: "oficial", url: TARIFE, detalle: "400.000 TL'nin 190.000 TL'si için 28.500 TL." },
    fecha: "2026-10-24",
    entrada: { matrah: 190000, tur: "ucret" },
    esperado: { gelirVergisi: 28500, marjinal: 15 },
  },
  {
    nombre: "400.000 TL: 70.500 TL",
    origen: { tipo: "oficial", url: TARIFE, detalle: "1.000.000 TL'nin 400.000 TL'si için 70.500 TL." },
    fecha: "2026-10-24",
    entrada: { matrah: 400000, tur: "diger" },
    esperado: { gelirVergisi: 70500, marjinal: 20 },
  },
  {
    nombre: "Ücret 1.500.000 TL: 367.500 TL",
    origen: { tipo: "oficial", url: TARIFE, detalle: "Ücret gelirlerinde 5.300.000 TL'nin 1.500.000 TL'si için 367.500 TL." },
    fecha: "2026-10-24",
    entrada: { matrah: 1500000, tur: "ucret" },
    esperado: { gelirVergisi: 367500, marjinal: 27, ortalama: 24.5 },
  },
  {
    nombre: "Ücret dışı 1.000.000 TL: 232.500 TL",
    origen: { tipo: "oficial", url: TARIFE, detalle: "5.300.000 TL'nin 1.000.000 TL'si için 232.500 TL." },
    fecha: "2026-10-24",
    entrada: { matrah: 1000000, tur: "diger" },
    esperado: { gelirVergisi: 232500 },
  },
  {
    nombre: "5.300.000 TL, ücret ve ücret dışı",
    origen: { tipo: "oficial", url: TARIFE, detalle: "Ücret: 1.697.500 TL; ücret dışı: 1.737.500 TL." },
    fecha: "2026-10-24",
    entrada: { matrah: 5300000, tur: "ucret" },
    esperado: { gelirVergisi: 1697500, marjinal: 35 },
  },
  {
    nombre: "6.000.000 TL ücret dışı: %40 dilimi",
    origen: { tipo: "recalculado", url: TARIFE, detalle: "1.737.500 + 700.000 × %40 = 2.017.500." },
    fecha: "2026-10-24",
    entrada: { matrah: 6000000, tur: "diger" },
    esperado: { gelirVergisi: 2017500, marjinal: 40 },
  },
]);
