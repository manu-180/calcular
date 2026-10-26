import { definirCasos } from "@/motor/calculo";
import asgariUcretHesaplama from "./asgari-ucret-hesaplama";

const CSGB = "https://www.csgb.gov.tr/poco-pages/asgari-ucret/";

export default definirCasos(asgariUcretHesaplama, [
  {
    nombre: "Tam ay, 2026",
    origen: { tipo: "oficial", url: CSGB, detalle: "Brüt 33.030; SGK 4.624,20; işsizlik 330,30; net 28.075,50; işverene maliyet (2 puan) 40.214,03." },
    fecha: "2026-10-24",
    entrada: { gun: 30, tesvik: "diger" },
    esperado: { brut: 33030, net: 28075.5, sgkIsci: 4624.2, issizlikIsci: 330.3, maliyet: 40214.03, gunluk: 1101, yillikBrut: 396360 },
  },
  {
    nombre: "Tam ay, indirimsiz işveren maliyeti",
    origen: { tipo: "oficial", url: CSGB, detalle: "İndirim uygulanmamış maliyet: 33.030 + 7.184,03 + 660,60 = 40.874,63." },
    fecha: "2026-10-24",
    entrada: { gun: 30, tesvik: "yok" },
    esperado: { maliyet: 40874.63, isverenSgk: 7184.03 },
  },
  {
    nombre: "15 gün çalışma",
    origen: { tipo: "recalculado", url: CSGB, detalle: "Günlük 1.101 × 15 = 16.515; primler %15 = 2.477,25; net 14.037,75." },
    fecha: "2026-10-24",
    entrada: { gun: 15, tesvik: "diger" },
    esperado: { brut: 16515, net: 14037.75 },
  },
]);
