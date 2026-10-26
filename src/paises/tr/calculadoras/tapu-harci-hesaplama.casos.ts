import { definirCasos } from "@/motor/calculo";
import tapuHarciHesaplama from "./tapu-harci-hesaplama";

const TKGM = "https://www.tkgm.gov.tr/sss";

export default definirCasos(tapuHarciHesaplama, [
  {
    nombre: "3.000.000 TL satış",
    origen: { tipo: "recalculado", url: TKGM, detalle: "Binde 20: alıcı 60.000, satıcı 60.000, toplam 120.000." },
    fecha: "2026-10-24",
    entrada: { bedel: 3000000, emlakDegeri: null },
    esperado: { alici: 60000, satici: 60000, toplam: 120000, matrah: 3000000, oran: 2 },
  },
  {
    nombre: "Beyan emlak vergisi değerinin altında",
    origen: { tipo: "recalculado", url: "https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=MEVZUAT_MADDE%2FUNIVERSAL%2F2025%2F7566.pdf", detalle: "7566 sayılı Kanun md. 8: emlak vergisi değerinden az olmamak üzere beyan edilen bedel. Matrah 2.500.000; her taraf 50.000." },
    fecha: "2026-10-24",
    entrada: { bedel: 2000000, emlakDegeri: 2500000 },
    esperado: { matrah: 2500000, alici: 50000, toplam: 100000 },
  },
]);
