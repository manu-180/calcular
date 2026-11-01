import { definirCasos } from "@/motor/calculo";
import serbestMeslekMakbuzuHesaplama from "./serbest-meslek-makbuzu-hesaplama";

const GVK94 = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-kanununun-94uncu-maddesinde-yer-alan-kesinti-oranlari.pdf";

export default definirCasos(serbestMeslekMakbuzuHesaplama, [
  {
    nombre: "Brüt 10.000 TL, stopaj ve KDV",
    origen: { tipo: "recalculado", url: GVK94, detalle: "Stopaj %20 = 2.000; net 8.000; KDV %20 = 2.000; tahsilat 10.000; makbuz toplamı 12.000." },
    fecha: "2026-10-24",
    entrada: { tutar: 10000, yon: "brut", stopajVar: true, kdvVar: true },
    esperado: { brut: 10000, stopaj: 2000, net: 8000, kdv: 2000, tahsil: 10000, odeyenToplam: 12000 },
  },
  {
    nombre: "Net 8.000 TL'den brüte",
    origen: { tipo: "recalculado", url: GVK94, detalle: "8.000 / 0,80 = 10.000 brüt." },
    fecha: "2026-10-24",
    entrada: { tutar: 8000, yon: "net", stopajVar: true, kdvVar: true },
    esperado: { brut: 10000, stopaj: 2000, kdv: 2000 },
  },
  {
    nombre: "Stopajsız, şahsa kesilen makbuz",
    origen: { tipo: "recalculado", url: GVK94, detalle: "Stopaj yok: net = brüt 10.000; KDV 2.000; tahsilat 12.000." },
    fecha: "2026-10-24",
    entrada: { tutar: 10000, yon: "brut", stopajVar: false, kdvVar: true },
    esperado: { stopaj: 0, net: 10000, tahsil: 12000 },
  },
]);
