import { definirCasos } from "@/motor/calculo";
import dovizHesaplama from "./doviz-hesaplama";

const TCMB = "https://www.tcmb.gov.tr/kurlar/202610/23102026.xml";

export default definirCasos(dovizHesaplama, [
  {
    nombre: "100 ABD doları, 23 Ekim 2026 kuru",
    origen: { tipo: "oficial", url: TCMB, detalle: "USD döviz alış 49,5647; 100 × 49,5647 = 4.956,47 TL." },
    fecha: "2026-10-24",
    entrada: { tutar: 100, doviz: "usd", yon: "tl" },
    esperado: { tl: 4956.47, kur: 49.5647, tarih: "2026-10-23" },
  },
  {
    nombre: "10.000 TL'den euroya",
    origen: { tipo: "oficial", url: TCMB, detalle: "EUR döviz alış 55,4997; 10.000 / 55,4997 = 180,18." },
    fecha: "2026-10-24",
    entrada: { tutar: 10000, doviz: "eur", yon: "doviz" },
    esperado: { dovizTutari: 180.18, kur: 55.4997 },
  },
  {
    nombre: "50 sterlin",
    origen: { tipo: "oficial", url: TCMB, detalle: "GBP döviz alış 66,1874; 50 × 66,1874 = 3.309,37." },
    fecha: "2026-10-24",
    entrada: { tutar: 50, doviz: "gbp", yon: "tl" },
    esperado: { tl: 3309.37 },
  },
]);
