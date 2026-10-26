import { definirCasos } from "@/motor/calculo";
import fazlaMesaiHesaplama from "./fazla-mesai-hesaplama";

const IK = "https://www.csgb.gov.tr/Media/crldhi51/4857-say%C4%B1l%C4%B1-i%C5%9F-kanunu.pdf";

export default definirCasos(fazlaMesaiHesaplama, [
  {
    nombre: "Asgari ücret, 10 saat fazla çalışma",
    origen: { tipo: "recalculado", url: IK, detalle: "33.030 / 30 / 7,5 = 146,80; %50 zamlı 220,20; 10 saat 2.202. Serbest zaman 15 saat (md. 41)." },
    fecha: "2026-10-24",
    entrada: { modo: "aylik", aylik: 33030, saatlik: null, tur: "fazla-calisma", saat: 10 },
    esperado: { saatlik: 146.8, zamliSaatlik: 220.2, toplam: 2202, serbestZaman: 15, zam: 50 },
  },
  {
    nombre: "Saatlik 200 TL, fazla sürelerle çalışma 4 saat",
    origen: { tipo: "recalculado", url: IK, detalle: "%25 zam: 250 TL; 4 saat 1.000 TL; serbest zaman 5 saat." },
    fecha: "2026-10-24",
    entrada: { modo: "saatlik", aylik: null, saatlik: 200, tur: "fazla-sure", saat: 4 },
    esperado: { zamliSaatlik: 250, toplam: 1000, serbestZaman: 5 },
  },
  {
    nombre: "Saat sıfır: hata",
    origen: { tipo: "recalculado", url: IK, detalle: "Fazla çalışma saati girilmeli." },
    fecha: "2026-10-24",
    entrada: { modo: "aylik", aylik: 50000, saatlik: null, tur: "fazla-calisma", saat: 0 },
    esperaError: true,
  },
]);
