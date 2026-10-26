import { definirCasos } from "@/motor/calculo";
import kiraStopajiHesaplama from "./kira-stopaji-hesaplama";

const GVK94 = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-kanununun-94uncu-maddesinde-yer-alan-kesinti-oranlari.pdf";

export default definirCasos(kiraStopajiHesaplama, [
  {
    nombre: "Net 40.000 TL kira",
    origen: { tipo: "recalculado", url: GVK94, detalle: "GVK 94/5-a %20: brüt 40.000 / 0,80 = 50.000; stopaj 10.000; 12 ayda 120.000." },
    fecha: "2026-10-24",
    entrada: { tutar: 40000, yon: "net", ay: 12 },
    esperado: { brut: 50000, stopaj: 10000, net: 40000, donemStopaj: 120000, donemBrut: 600000 },
  },
  {
    nombre: "Brüt 30.000 TL kira",
    origen: { tipo: "recalculado", url: GVK94, detalle: "30.000 × %20 = 6.000; net 24.000." },
    fecha: "2026-10-24",
    entrada: { tutar: 30000, yon: "brut", ay: 1 },
    esperado: { stopaj: 6000, net: 24000, oran: 20 },
  },
]);
