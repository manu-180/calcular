import { definirCasos } from "@/motor/calculo";
import kdvHesaplama from "./kdv-hesaplama";

const KDV = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fkdv-oranlari.pdf";

export default definirCasos(kdvHesaplama, [
  {
    nombre: "1.000 TL'ye %20 KDV ekle",
    origen: { tipo: "recalculado", url: KDV, detalle: "1.000 × %20 = 200; KDV dahil 1.200." },
    fecha: "2026-10-24",
    entrada: { tutar: 1000, yon: "ekle", oran: "genel" },
    esperado: { kdv: 200, haric: 1000, dahil: 1200, oran: 20 },
  },
  {
    nombre: "1.200 TL'den %20 KDV ayır",
    origen: { tipo: "recalculado", url: KDV, detalle: "1.200 / 1,20 = 1.000; KDV 200." },
    fecha: "2026-10-24",
    entrada: { tutar: 1200, yon: "ayir", oran: "genel" },
    esperado: { kdv: 200, haric: 1000 },
  },
  {
    nombre: "%10 oran, 550 TL dahil",
    origen: { tipo: "recalculado", url: KDV, detalle: "550 / 1,10 = 500; KDV 50." },
    fecha: "2026-10-24",
    entrada: { tutar: 550, yon: "ayir", oran: "indirimli" },
    esperado: { kdv: 50, haric: 500, oran: 10 },
  },
  {
    nombre: "%1 oran, 2.500 TL hariç",
    origen: { tipo: "recalculado", url: KDV, detalle: "2.500 × %1 = 25; dahil 2.525." },
    fecha: "2026-10-24",
    entrada: { tutar: 2500, yon: "ekle", oran: "dusuk" },
    esperado: { kdv: 25, dahil: 2525, oran: 1 },
  },
  {
    nombre: "Kuruş yuvarlama: 99,99 TL dahil",
    origen: { tipo: "recalculado", url: KDV, detalle: "99,99 / 1,20 = 83,325 → 83,33; KDV 16,66." },
    fecha: "2026-10-24",
    entrada: { tutar: 99.99, yon: "ayir", oran: "genel" },
    esperado: { haric: 83.33, kdv: 16.66, dahil: 99.99 },
  },
]);
